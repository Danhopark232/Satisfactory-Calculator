// script.js

document.addEventListener('DOMContentLoaded', () => {
    const factoryLinesContainer = document.querySelector('.factory-lines-container');
    const addFactoryLineBtn = document.querySelector('.add-factory-line-btn');

    let factoryLineCounter = 0;

    // Helper function to get image path
    function getImagePath(itemName) {
        // Assuming images are in an 'images' folder at the root
        // and named like 'ItemName.png' or 'Item Name.png'
        const formattedName = itemName.replace(/[ _]/g, '').toLowerCase(); // Remove spaces and underscores for image names and convert to lowercase
        return `images/${formattedName}.png`;
    }

    // Helper function to populate the output select dropdown
    function populateOutputSelect(facilitySelect, outputSelect) {
        const selectedFacilityName = facilitySelect.value;
        const selectedFacility = facilitiesData[selectedFacilityName];

        // Clear previous options
        outputSelect.innerHTML = '';

        const defaultOutputOption = document.createElement('option');
        defaultOutputOption.value = "";
        defaultOutputOption.textContent = "Choose product";
        defaultOutputOption.disabled = true;
        defaultOutputOption.selected = true;
        outputSelect.appendChild(defaultOutputOption);

        if (selectedFacility && selectedFacility.recipes) {
            for (const recipeName in selectedFacility.recipes) {
                const option = document.createElement('option');
                option.value = recipeName;
                option.textContent = recipeName;
                outputSelect.appendChild(option);
            }
            // Set default output if available
            /*if (outputSelect.options.length > 1) { // Check if there are actual recipes in addition to the default option
                outputSelect.value = outputSelect.options[1].value; // Select the first actual recipe
            }*/
        }
    }

    // Helper function to find a recipe that produces a given item
    function findProducerRecipe(item) {
        for (const facilityName in facilitiesData) {
            const facility = facilitiesData[facilityName];
            for (const recipeName in facility.recipes) {
                const recipe = facility.recipes[recipeName];
                if (recipe.outputs.some(output => output.item === item)) {
                    return { facilityName, recipeName };
                }
            }
        }
        return null;
    }

    // Function to create a new facility element
    function createFacilityElement(initialFacility = null, initialRecipe = null, initialQuantity = 1, isReceived = false) {
        const facilityDiv = document.createElement('div');
        facilityDiv.classList.add('facility');
        facilityDiv.setAttribute('draggable', 'true'); // Make facility draggable
        facilityDiv.dataset.facilityId = `facility-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // Unique ID
        if (isReceived) {
            facilityDiv.dataset.received = true;
        }
        facilityDiv.innerHTML = `
            <div class="facility-top-bar">
                <div class="collapse-btn"><img src="icons/collapsearrowup.png" alt="Collapse"></div>
                <button class="remove-facility-btn"><img src="icons/x.png" alt="Remove"></button>
            </div>
            <div class="collapsed-info">
                <div class="info-text">
                    <div class="facility-name-collapsed"></div>
                    <div class="balance-collapsed"></div>
                </div>
                <div class="image-boxes">
                    <div class="facility-image-box-collapsed"></div>
                    <div class="product-image-box-collapsed"></div>
                </div>
            </div>
            <div class="collapsed-quantity-control">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="${initialQuantity}" min="1">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="image-container">
                <div class="facility-image-box"></div>
                <div class="product-image-box"></div>
            </div>
            <div class="facility-header">
                <select class="facility-select"></select>
                <select class="output-select"></select>
            </div>
            <div class="purity-control" style="display: none;">
                <select class="purity-select">
                    <option value="Impure">Impure</option>
                    <option value="Normal">Normal</option>
                    <option value="Pure">Pure</option>
                </select>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="${initialQuantity}" min="1">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="materials-display">
                <h4>Inputs:</h4>
                <ul class="input-list"></ul>
                <h4>Outputs:</h4>
                <ul class="output-list"></ul>
                <div class="send-to-container" style="display: none;">
                    <select class="send-to-dropdown-facility"></select>
                </div>
            </div>
            <div class="power-display">
                <span>Power: <span class="power-value">0</span> MW</span>
            </div>
        `;

        const facilitySelect = facilityDiv.querySelector('.facility-select');
        const outputSelect = facilityDiv.querySelector('.output-select');
        const quantityInput = facilityDiv.querySelector('.quantity-control .quantity-input');
        const minusBtn = facilityDiv.querySelector('.quantity-control .quantity-btn.minus');
        const plusBtn = facilityDiv.querySelector('.quantity-control .quantity-btn.plus');
        const removeBtn = facilityDiv.querySelector('.remove-facility-btn');
        const purityControl = facilityDiv.querySelector('.purity-control');
        const puritySelect = facilityDiv.querySelector('.purity-select');
        const facilityImageBox = facilityDiv.querySelector('.facility-image-box');
        const productImageBox = facilityDiv.querySelector('.product-image-box');

        // Collapsed quantity control elements
        const collapsedQuantityInput = facilityDiv.querySelector('.collapsed-quantity-control .quantity-input');
        const collapsedMinusBtn = facilityDiv.querySelector('.collapsed-quantity-control .quantity-btn.minus');
        const collapsedPlusBtn = facilityDiv.querySelector('.collapsed-quantity-control .quantity-btn.plus');

        if (isReceived) {
            facilityDiv.querySelector('.facility-header').style.display = 'none';
            facilityDiv.querySelector('.quantity-control').style.display = 'none';
            facilityDiv.querySelector('.power-display').style.display = 'none';
            facilityDiv.querySelector('.collapse-btn').style.display = 'none';
            facilityDiv.querySelector('.facility-image-box').style.display = 'none';
            facilityDiv.querySelector('.purity-control').style.display = 'none';
            facilityDiv.querySelector('.collapsed-quantity-control').style.display = 'none';

            const materialsDisplay = facilityDiv.querySelector('.materials-display');
            materialsDisplay.innerHTML = `
                <h4>Outputs:</h4>
                <ul class="output-list">
                    <li><span class="item-name">Received</span><span class="item-usage"></span></li>
                    <li><span class="item-name">Balance</span><span class="item-usage"></span></li>
                    <li><span class="item-name">Consumption</span><span class="item-usage"></span></li>
                </ul>
            `;
        }

        // Drag and Drop Event Listeners for facilities
        facilityDiv.addEventListener('dragstart', (e) => {
            e.stopPropagation(); // Prevent column drag from starting
            draggedFacility = facilityDiv;
            isDraggingFacility = true; // Set flag to true
            setTimeout(() => {
                facilityDiv.classList.add('dragging');
            }, 0);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', facilityDiv.dataset.facilityId); // Use ID for data transfer
        });

        facilityDiv.addEventListener('dragend', () => {
            facilityDiv.classList.remove('dragging');
            draggedFacility = null;
            isDraggingFacility = false; // Reset flag
            updateAllFactoryLines(); // Trigger update after drag ends
        });

        // Populate facility dropdown
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Choose building";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        facilitySelect.appendChild(defaultOption);

        for (const facilityName in facilitiesData) {
            const option = document.createElement('option');
            option.value = facilityName;
            option.textContent = facilityName;
            facilitySelect.appendChild(option);
        }

        // Set initial facility selection and populate output dropdown
        if (initialFacility) {
            facilitySelect.value = initialFacility;
        }
        populateOutputSelect(facilitySelect, outputSelect);
        if (initialRecipe) {
            outputSelect.value = initialRecipe;
        }

        // Show/hide purity control based on facility type
        if (facilitySelect.value.startsWith('Miner')) {
            purityControl.style.display = 'block';
        } else {
            purityControl.style.display = 'none';
        }

        const collapseBtn = facilityDiv.querySelector('.collapse-btn');

        // Event Listeners
        collapseBtn.addEventListener('click', () => {
            facilityDiv.classList.toggle('collapsed');
            const collapseImg = collapseBtn.querySelector('img');
            const isMiner = facilitySelect.value.startsWith('Miner');

            if (facilityDiv.classList.contains('collapsed')) {
                collapseImg.src = 'icons/collapsearrowdown.png';
                purityControl.style.display = 'none';
            } else {
                collapseImg.src = 'icons/collapsearrowup.png';
                if (isMiner) {
                    purityControl.style.display = 'block';
                } else {
                    purityControl.style.display = 'none';
                }
            }
        });
        facilitySelect.addEventListener('change', () => {
            populateOutputSelect(facilitySelect, outputSelect);
            if (facilitySelect.value.startsWith('Miner')) {
                purityControl.style.display = 'block';
            } else {
                purityControl.style.display = 'none';
            }
            updateAllFactoryLines();
        });
        outputSelect.addEventListener('change', updateAllFactoryLines);

        // Main quantity control event listeners
        quantityInput.addEventListener('change', () => {
            collapsedQuantityInput.value = quantityInput.value; // Sync collapsed input
            updateAllFactoryLines();
        });
        minusBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                collapsedQuantityInput.value = quantityInput.value; // Sync collapsed input
                updateAllFactoryLines();
            }
        });
        plusBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            collapsedQuantityInput.value = quantityInput.value; // Sync collapsed input
            updateAllFactoryLines();
        });

        // Collapsed quantity control event listeners
        collapsedQuantityInput.addEventListener('change', () => {
            quantityInput.value = collapsedQuantityInput.value; // Sync main input
            updateAllFactoryLines();
        });
        collapsedMinusBtn.addEventListener('click', () => {
            if (parseInt(collapsedQuantityInput.value) > 1) {
                collapsedQuantityInput.value = parseInt(collapsedQuantityInput.value) - 1;
                quantityInput.value = collapsedQuantityInput.value; // Sync main input
                updateAllFactoryLines();
            }
        });
        collapsedPlusBtn.addEventListener('click', () => {
            collapsedQuantityInput.value = parseInt(collapsedQuantityInput.value) + 1;
            quantityInput.value = collapsedQuantityInput.value; // Sync main input
            updateAllFactoryLines();
        });

        puritySelect.addEventListener('change', updateAllFactoryLines); // New event listener for purity

        removeBtn.addEventListener('click', () => {
            facilityDiv.remove();
            updateAllFactoryLines();
        });

        return facilityDiv;
    }

    function sendProductToFactoryLine(senderLineId, recipientLineId) {
        const senderLine = document.querySelector(`.main-window[data-line-id='${senderLineId}']`);
        const recipientLine = document.querySelector(`.main-window[data-line-id='${recipientLineId}']`);

        if (!senderLine || !recipientLine) return;

        const senderLeftovers = getLeftovers(senderLine);
        const finalProduct = Object.keys(senderLeftovers).reduce((a, b) => senderLeftovers[a] > senderLeftovers[b] ? a : b);

        if (!finalProduct) return;

        const senderColor = senderLine.querySelector('.header-container').style.backgroundColor;
        const productAmount = senderLeftovers[finalProduct];

        const receivedFacility = createFacilityElement(null, null, 1, true);
        receivedFacility.dataset.receivedFrom = senderLineId;
        receivedFacility.dataset.receivedProduct = finalProduct;
        receivedFacility.dataset.receivedAmount = productAmount;
        receivedFacility.style.outline = `3px solid ${senderColor}`;

        const facilityNameCollapsed = receivedFacility.querySelector('.facility-name-collapsed');
        facilityNameCollapsed.textContent = `Received: ${finalProduct}`;
        const balanceCollapsed = receivedFacility.querySelector('.balance-collapsed');
        balanceCollapsed.textContent = `${productAmount}/min`;
        const productImageBox = receivedFacility.querySelector('.product-image-box');
        productImageBox.style.backgroundImage = `url(${getImagePath(finalProduct)})`;
        const productImageBoxCollapsed = receivedFacility.querySelector('.product-image-box-collapsed');
        productImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(finalProduct)})`;

        const firstColumn = recipientLine.querySelector('.column');
        if (firstColumn) {
            firstColumn.querySelector('.facilities-container').appendChild(receivedFacility);
            updateAllFactoryLines();
        }
    }

    function getLeftovers(factoryLineDiv) {
        const factoryLineLeftovers = {};
        const columns = factoryLineDiv.querySelectorAll('.column');
        const totalDemands = {};
        const producedMaterials = new Set();

        columns.forEach(column => {
            const facilities = column.querySelectorAll('.facility');
            facilities.forEach(facilityDiv => {
                if (facilityDiv.dataset.received !== 'true') {
                    const facilitySelect = facilityDiv.querySelector('.facility-select');
                    const outputSelect = facilityDiv.querySelector('.output-select');
                    const quantityInput = facilityDiv.querySelector('.quantity-input');

                    const selectedFacilityName = facilitySelect.value;
                    const selectedOutputName = outputSelect.value;
                    const quantity = parseInt(quantityInput.value);

                    const facilityData = facilitiesData[selectedFacilityName];
                    const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                    if (recipe) {
                        recipe.inputs.forEach(input => {
                            totalDemands[input.item] = (totalDemands[input.item] || 0) + (input.rate * quantity);
                        });
                        recipe.outputs.forEach(output => {
                            producedMaterials.add(output.item);
                        });
                    }
                }
            });
        });

        const totalProduction = {};
        columns.forEach(column => {
            const facilities = column.querySelectorAll('.facility');
            facilities.forEach(facilityDiv => {
                if (facilityDiv.dataset.received !== 'true') {
                    const facilitySelect = facilityDiv.querySelector('.facility-select');
                    const outputSelect = facilityDiv.querySelector('.output-select');
                    const quantityInput = facilityDiv.querySelector('.quantity-control .quantity-input');
                    const puritySelect = facilityDiv.querySelector('.purity-select');
                    const selectedPurity = puritySelect ? puritySelect.value : 'Normal';
                    const purityMultiplier = purityMultipliers[selectedPurity] || 1.0;

                    const selectedFacilityName = facilitySelect.value;
                    const selectedOutputName = outputSelect.value;
                    const quantity = parseInt(quantityInput.value);

                    const facilityData = facilitiesData[selectedFacilityName];
                    const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                    if (recipe) {
                        recipe.outputs.forEach(output => {
                            totalProduction[output.item] = (totalProduction[output.item] || 0) + (output.rate * quantity * purityMultiplier);
                        });
                    }
                }
            });
        });

        for (const item in totalProduction) {
            factoryLineLeftovers[item] = totalProduction[item] - (totalDemands[item] || 0);
        }
        return factoryLineLeftovers;
    }

    // Function to add a facility to a specific column
    function addFacilityToColumn(columnElement, initialFacility = null, initialRecipe = null, requiredQuantity = 1) {
        const facilityElement = createFacilityElement(initialFacility, initialRecipe, requiredQuantity);
        columnElement.querySelector('.facilities-container').appendChild(facilityElement);
        updateAllFactoryLines(); // Trigger update after adding a new facility - will be called by auto-fill
    }

    // Function to attach event listeners to column buttons
    function attachColumnEventListeners(columnElement) {
        columnElement.querySelector('.add-facility-btn').addEventListener('click', (e) => {
            const column = e.target.closest('.column');
            addFacilityToColumn(column);
        });
        columnElement.querySelector('.remove-column-btn').addEventListener('click', (e) => {
            const column = e.target.closest('.column');
            const facilitiesContainer = column.querySelector('.facilities-container');
            if (facilitiesContainer.children.length > 0) {
                if (confirm('Are you sure you want to remove this column?')) {
                    column.remove();
                    updateAllFactoryLines();
                }
            } else {
                column.remove();
                updateAllFactoryLines();
            }
        });
    }

    // Function to create a new factory line
    function createFactoryLine() {
        factoryLineCounter++;
        const factoryLineDiv = document.createElement('div');
        factoryLineDiv.classList.add('main-window');
        factoryLineDiv.dataset.lineId = factoryLineCounter;
        factoryLineDiv.innerHTML = `
            <div class="header-container">
                <button class="remove-factory-line-btn"><img src="icons/x.png" alt="Remove Factory Line"></button>
                <div class="header">
                    <img src="icons/edit_black.png" alt="Edit" class="edit-icon">
                    <input type="text" class="factory-name-input" value="Factory Line ${factoryLineCounter}">
                </div>
                <div class="material-summary">
                    <div class="summary-header">
                        <h3>Summary:</h3>
                    </div>
                    <ul class="leftover-list"></ul>
                </div>
                <button class="toggle-all-facilities-btn"><img src="icons/collapsearrowup.png" alt="Toggle All"></button>
                <button class="change-color-btn"><img src="icons/change_color_black.png" alt="Change Color"></button>
                <div class="color-palette">
                    <div class="color-swatch" data-color="#F43535"></div>
                    <div class="color-swatch" data-color="#4CAF50"></div>
                    <div class="color-swatch" data-color="#2196F3"></div>
                    <div class="color-swatch" data-color="#FFC107"></div>
                    <div class="color-swatch" data-color="#9C27B0"></div>
                    <div class="color-swatch" data-color="#FF9800"></div>
                    <div class="color-swatch" data-color="#009688"></div>
                    <div class="color-swatch" data-color="#3F51B5"></div>
                    <div class="color-swatch" data-color="#E91E63"></div>
                    <div class="color-swatch" data-color="#795548"></div>
                </div>
            </div>
            <div class="columns-container">
                <div class="column" data-column-id="1">
                    <div class="column-handle"></div>
                    <button class="add-facility-btn">+</button>
                    <div class="facilities-container"></div>
                    <button class="remove-column-btn">- column</button>                </div>
                <div class="column" data-column-id="2">
                    <div class="column-handle"></div>
                    <button class="add-facility-btn">+</button>
                    <div class="facilities-container"></div>
                    <button class="remove-column-btn">- column</button>                </div>
                <button class="add-column-btn">+ column</button>
            </div>
        `;

        factoryLinesContainer.appendChild(factoryLineDiv);

        const factoryNameInput = factoryLineDiv.querySelector('.factory-name-input');
        factoryNameInput.addEventListener('change', saveState);

        const removeFactoryLineBtn = factoryLineDiv.querySelector('.remove-factory-line-btn');
        const changeColorBtn = factoryLineDiv.querySelector('.change-color-btn');
        const toggleAllFacilitiesBtn = factoryLineDiv.querySelector('.toggle-all-facilities-btn');
        const colorPalette = factoryLineDiv.querySelector('.color-palette');

        

        // Assign random color
        const colorSwatches = colorPalette.querySelectorAll('.color-swatch');
        const colors = Array.from(colorSwatches).map(swatch => swatch.dataset.color);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const headerContainer = factoryLineDiv.querySelector('.header-container');
        headerContainer.style.backgroundColor = randomColor;

        changeColorBtn.addEventListener('click', () => {
            colorPalette.style.display = colorPalette.style.display === 'flex' ? 'none' : 'flex';
        });

        colorPalette.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                const headerContainer = factoryLineDiv.querySelector('.header-container');
                headerContainer.style.backgroundColor = e.target.dataset.color;
                colorPalette.style.display = 'none';
            }
        });

        removeFactoryLineBtn.addEventListener('click', () => {
            const facilities = factoryLineDiv.querySelectorAll('.facility');
            if (facilities.length > 0) {
                if (confirm('Are you sure you want to remove this factory line?')) {
                    factoryLineDiv.remove();
                    updateAllFactoryLines();
                }
            } else {
                factoryLineDiv.remove();
                updateAllFactoryLines();
            }
        });

        toggleAllFacilitiesBtn.addEventListener('click', () => {
            const allFacilities = factoryLineDiv.querySelectorAll('.facility');
            let allCollapsed = true;

            // Check if all facilities are already collapsed
            allFacilities.forEach(facility => {
                if (!facility.classList.contains('collapsed')) {
                    allCollapsed = false;
                }
            });

            allFacilities.forEach(facility => {
                const collapseBtn = facility.querySelector('.collapse-btn');
                const collapseImg = collapseBtn.querySelector('img');
                const facilitySelect = facility.querySelector('.facility-select');
                const purityControl = facility.querySelector('.purity-control');
                const isMiner = facilitySelect.value.startsWith('Miner');

                if (allCollapsed) {
                    // Expand all
                    facility.classList.remove('collapsed');
                    collapseImg.src = 'icons/collapsearrowup.png';
                    if (isMiner) {
                        purityControl.style.display = 'block';
                    }
                } else {
                    // Collapse all
                    facility.classList.add('collapsed');
                    collapseImg.src = 'icons/collapsearrowdown.png';
                    purityControl.style.display = 'none';
                }
            });

            // Update the toggle button icon
            const toggleImg = toggleAllFacilitiesBtn.querySelector('img');
            if (allCollapsed) {
                toggleImg.src = 'icons/collapsearrowup.png'; // All expanded, show up arrow
            } else {
                toggleImg.src = 'icons/collapsearrowdown.png'; // All collapsed, show down arrow
            }

            // Adjust main window height
            setTimeout(() => {
                adjustAllColumnContainerHeights();
            }, 200); // Delay to allow for CSS transitions
        });

        // Attach event listeners to initial columns
        factoryLineDiv.querySelectorAll('.column').forEach(column => {
            attachColumnEventListeners(column);
            makeColumnDraggable(column); // Make columns draggable
            makeFacilitiesContainerDroppable(column.querySelector('.facilities-container')); // Make facilities container droppable
        });

        // Attach event listener for adding new columns to the button within this factory line
        const addColumnBtn = factoryLineDiv.querySelector('.add-column-btn');
        const columnsContainer = factoryLineDiv.querySelector('.columns-container');
        addColumnBtn.addEventListener('click', () => {
            const newColumn = document.createElement('div');
            newColumn.classList.add('column');
            newColumn.dataset.columnId = columnsContainer.querySelectorAll('.column').length + 1;
            newColumn.innerHTML = '<div class="column-handle"></div><button class="add-facility-btn">+</button><div class="facilities-container"></div><button class="remove-column-btn">- column</button>';
            attachColumnEventListeners(newColumn); // Attach listeners to the new column
            columnsContainer.insertBefore(newColumn, addColumnBtn); // Insert before the addColumnBtn
            makeColumnDraggable(newColumn); // Make new columns draggable
            makeFacilitiesContainerDroppable(newColumn.querySelector('.facilities-container')); // Make new facilities container droppable
            updateAllFactoryLines();
        });

        return factoryLineDiv;
    }

    let draggedColumn = null;
    let draggedFacility = null; // Global variable to store the currently dragged facility
    let isDraggingFacility = false; // Flag to control updates during drag

    function getDragAfterFacility(container, y) {
        const draggableFacilities = [...container.querySelectorAll('.facility:not(.dragging)')];

        return draggableFacilities.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }

    function makeColumnDraggable(column) {
        console.log('makeColumnDraggable called for column:', column);
        const handle = column.querySelector('.column-handle');
        console.log('Handle found:', handle);
        if (!handle) {
            console.error('Column handle not found for column:', column);
            return; // Exit if handle is null
        }
        handle.setAttribute('draggable', 'true');

        handle.addEventListener('dragstart', (e) => {
            draggedColumn = column;
            setTimeout(() => {
                column.classList.add('dragging');
            }, 0);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', column.innerHTML); // Required for Firefox
        });

        handle.addEventListener('dragend', () => {
            draggedColumn.classList.remove('dragging');
            draggedColumn = null;
        });

        const columnsContainer = column.closest('.columns-container');
        columnsContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            const afterElement = getDragAfterElement(columnsContainer, e.clientX);
            const currentColumn = e.target.closest('.column');

            if (currentColumn && currentColumn !== draggedColumn) {
                columnsContainer.querySelectorAll('.column').forEach(col => col.classList.remove('drag-over'));
                currentColumn.classList.add('drag-over');
            }
        });

        columnsContainer.addEventListener('dragleave', (e) => {
            e.target.classList.remove('drag-over');
        });

        columnsContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            columnsContainer.querySelectorAll('.column').forEach(col => col.classList.remove('drag-over'));
            if (draggedColumn) {
                const afterElement = getDragAfterElement(columnsContainer, e.clientX);
                if (afterElement == null) {
                    columnsContainer.insertBefore(draggedColumn, columnsContainer.querySelector('.add-column-btn'));
                } else {
                    columnsContainer.insertBefore(draggedColumn, afterElement);
                }
                updateAllFactoryLines(); // Re-calculate after reordering
            }
        });
    }

    function makeFacilitiesContainerDroppable(container) {
        container.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            const draggingFacility = document.querySelector('.facility.dragging');
            if (draggingFacility && draggingFacility.closest('.facilities-container') !== container) {
                container.classList.add('drag-over');
            }
        });

        container.addEventListener('dragleave', (e) => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.classList.remove('drag-over');
            if (draggedFacility) {
                const afterElement = getDragAfterFacility(container, e.clientY);
                if (afterElement == null) {
                    container.appendChild(draggedFacility);
                } else {
                    container.insertBefore(draggedFacility, afterElement);
                }
                updateAllFactoryLines(); // Re-calculate after reordering
            }
        });
    }

    function getDragAfterElement(container, x) {
        const draggableColumns = [...container.querySelectorAll('.column:not(.dragging)')];

        return draggableColumns.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }

    function saveState() {
        const factoryLines = [];
        document.querySelectorAll('.main-window').forEach(factoryLineDiv => {
            const factoryLine = {
                name: factoryLineDiv.querySelector('.factory-name-input').value,
                color: factoryLineDiv.querySelector('.header-container').style.backgroundColor,
                columns: []
            };
            factoryLineDiv.querySelectorAll('.column').forEach(columnDiv => {
                const column = {
                    facilities: []
                };
                columnDiv.querySelectorAll('.facility').forEach(facilityDiv => {
                    const facility = {
                        name: facilityDiv.querySelector('.facility-select').value,
                        recipe: facilityDiv.querySelector('.output-select').value,
                        quantity: facilityDiv.querySelector('.quantity-control .quantity-input').value,
                        purity: facilityDiv.querySelector('.purity-select').value,
                        isReceived: facilityDiv.dataset.received === 'true',
                        receivedFrom: facilityDiv.dataset.receivedFrom,
                        receivedProduct: facilityDiv.dataset.receivedProduct,
                        receivedAmount: facilityDiv.dataset.receivedAmount
                    };
                    column.facilities.push(facility);
                });
                factoryLine.columns.push(column);
            });
            factoryLines.push(factoryLine);
        });
        localStorage.setItem('satisfactoryCalculatorState', JSON.stringify(factoryLines));
    }

    function loadState() {
        const savedState = localStorage.getItem('satisfactoryCalculatorState');
        if (savedState) {
            const factoryLinesData = JSON.parse(savedState);
            factoryLinesContainer.innerHTML = '';
            factoryLinesData.forEach(factoryLineData => {
                const factoryLineDiv = createFactoryLine();
                factoryLineDiv.querySelector('.factory-name-input').value = factoryLineData.name;
                factoryLineDiv.querySelector('.header-container').style.backgroundColor = factoryLineData.color;
                const columnsContainer = factoryLineDiv.querySelector('.columns-container');
                
                // Remove existing columns, but keep the button
                columnsContainer.querySelectorAll('.column').forEach(column => column.remove());

                factoryLineData.columns.forEach(columnData => {
                    const newColumn = document.createElement('div');
                    newColumn.classList.add('column');
                    newColumn.dataset.columnId = columnsContainer.querySelectorAll('.column').length + 1;
                    newColumn.innerHTML = '<div class="column-handle"></div><button class="add-facility-btn">+</button><div class="facilities-container"></div><button class="remove-column-btn">- column</button>';
                    attachColumnEventListeners(newColumn);
                    columnsContainer.insertBefore(newColumn, columnsContainer.querySelector('.add-column-btn'));
                    makeColumnDraggable(newColumn);
                    makeFacilitiesContainerDroppable(newColumn.querySelector('.facilities-container'));
                    columnData.facilities.forEach(facilityData => {
                        if (facilityData.isReceived) {
                            const receivedFacility = createFacilityElement(null, null, 1, true);
                            receivedFacility.dataset.receivedFrom = facilityData.receivedFrom;
                            receivedFacility.dataset.receivedProduct = facilityData.receivedProduct;
                            receivedFacility.dataset.receivedAmount = facilityData.receivedAmount;
                            const senderLine = document.querySelector(`.main-window[data-line-id='${facilityData.receivedFrom}']`);
                            if(senderLine){
                                const senderColor = senderLine.querySelector('.header-container').style.backgroundColor;
                                receivedFacility.style.outline = `3px solid ${senderColor}`;
                            }

                            const facilityNameCollapsed = receivedFacility.querySelector('.facility-name-collapsed');
                            facilityNameCollapsed.textContent = `Received: ${facilityData.receivedProduct}`;
                            const balanceCollapsed = receivedFacility.querySelector('.balance-collapsed');
                            balanceCollapsed.textContent = `${facilityData.receivedAmount}/min`;
                            const productImageBox = receivedFacility.querySelector('.product-image-box');
                            productImageBox.style.backgroundImage = `url(${getImagePath(facilityData.receivedProduct)})`;
                            const productImageBoxCollapsed = receivedFacility.querySelector('.product-image-box-collapsed');
                            productImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(facilityData.receivedProduct)})`;
                            newColumn.querySelector('.facilities-container').appendChild(receivedFacility);
                        } else {
                            addFacilityToColumn(newColumn, facilityData.name, facilityData.recipe, facilityData.quantity);
                            const newFacility = newColumn.querySelector('.facility:last-child');
                            if (newFacility) {
                                newFacility.querySelector('.purity-select').value = facilityData.purity;
                            }
                        }
                    });
                });
            });
        }
    }

    function adjustAllColumnContainerHeights() {
        document.querySelectorAll('.main-window').forEach(factoryLineDiv => {
            const columnsContainer = factoryLineDiv.querySelector('.columns-container');
            const columns = columnsContainer.querySelectorAll('.column');
            let maxHeight = 0;
            columns.forEach(column => {
                if (column.offsetHeight > maxHeight) {
                    maxHeight = column.offsetHeight;
                }
            });
            columnsContainer.style.height = `${maxHeight + 10}px`;
        });
    }

    // Main update function for all factory lines
    function updateAllFactoryLines() {
        if (isDraggingFacility) return; // Prevent updates during facility drag

        const allFactoryLines = Array.from(document.querySelectorAll('.main-window'));

        let needsRecalculation = true;
        while (needsRecalculation) {
            needsRecalculation = false;
            document.querySelectorAll('.main-window').forEach(factoryLineDiv => {
                if (recalculateFactoryLine(factoryLineDiv)) {
                    needsRecalculation = true;
                }
            });
        }
        saveState(); // Save state after every update
        adjustAllColumnContainerHeights();
    }

    function populateFacilitySendToDropdown(dropdown, facilityDiv) {
        const currentLineId = facilityDiv.closest('.main-window').dataset.lineId;
        const allFactoryLines = Array.from(document.querySelectorAll('.main-window'));

        dropdown.innerHTML = '<option value="">Select a factory line</option>'; // Clear and add default

        allFactoryLines.forEach(otherLine => {
            if (otherLine.dataset.lineId !== currentLineId) {
                const otherLineName = otherLine.querySelector('.factory-name-input').value;
                const otherLineId = otherLine.dataset.lineId;
                const option = document.createElement('option');
                option.value = otherLineId;
                option.textContent = otherLineName;
                dropdown.appendChild(option);
            }
        });
    }

    function sendProductFromFacilityToFactoryLine(senderLineId, recipientLineId, product, amount) {
        const recipientLine = document.querySelector(`.main-window[data-line-id='${recipientLineId}']`);
        if (!recipientLine) return;

        const senderLine = document.querySelector(`.main-window[data-line-id='${senderLineId}']`);
        const senderColor = senderLine.querySelector('.header-container').style.backgroundColor;

        const receivedFacility = createFacilityElement(null, null, 1, true);
        receivedFacility.dataset.receivedFrom = senderLineId;
        receivedFacility.dataset.receivedProduct = product;
        receivedFacility.dataset.receivedAmount = amount;
        receivedFacility.style.outline = `3px solid ${senderColor}`;

        const facilityNameCollapsed = receivedFacility.querySelector('.facility-name-collapsed');
        facilityNameCollapsed.textContent = `Received: ${product}`;
        const balanceCollapsed = receivedFacility.querySelector('.balance-collapsed');
        balanceCollapsed.textContent = `${amount}/min`;
        const productImageBox = receivedFacility.querySelector('.product-image-box');
        productImageBox.style.backgroundImage = `url(${getImagePath(product)})`;
        const productImageBoxCollapsed = receivedFacility.querySelector('.product-image-box-collapsed');
        productImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(product)})`;

        const firstColumn = recipientLine.querySelector('.column');
        if (firstColumn) {
            firstColumn.querySelector('.facilities-container').appendChild(receivedFacility);
            updateAllFactoryLines();
        }
    }

    function recalculateFactoryLine(factoryLineDiv) {
        const columns = factoryLineDiv.querySelectorAll('.column');
        const totalDemands = {}; // Stores total demand for each material across the entire factory line
        const producedMaterials = new Set(); // Keep track of materials being produced
        const receivedMaterials = {}; // Stores received materials

        // First Pass: Collect all demands and produced materials
        columns.forEach(column => {
            const facilities = column.querySelectorAll('.facility');
            facilities.forEach(facilityDiv => {
                if (facilityDiv.dataset.received === 'true') {
                    const product = facilityDiv.dataset.receivedProduct;
                    const amount = parseFloat(facilityDiv.dataset.receivedAmount);
                    receivedMaterials[product] = (receivedMaterials[product] || 0) + amount;
                } else {
                    const facilitySelect = facilityDiv.querySelector('.facility-select');
                    const outputSelect = facilityDiv.querySelector('.output-select');
                    const quantityInput = facilityDiv.querySelector('.quantity-input');

                    const selectedFacilityName = facilitySelect.value;
                    const selectedOutputName = outputSelect.value;
                    const quantity = parseInt(quantityInput.value);

                    const facilityData = facilitiesData[selectedFacilityName];
                    const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                    if (recipe) {
                        recipe.inputs.forEach(input => {
                            totalDemands[input.item] = (totalDemands[input.item] || 0) + (input.rate * quantity);
                        });
                        recipe.outputs.forEach(output => {
                            producedMaterials.add(output.item);
                        });
                    }
                }
            });
        });

        const totalProduction = {};
        columns.forEach(column => {
            const facilities = column.querySelectorAll('.facility');
            facilities.forEach(facilityDiv => {
                if (facilityDiv.dataset.received !== 'true') {
                    const facilitySelect = facilityDiv.querySelector('.facility-select');
                    const outputSelect = facilityDiv.querySelector('.output-select');
                    const quantityInput = facilityDiv.querySelector('.quantity-control .quantity-input');
                    const puritySelect = facilityDiv.querySelector('.purity-select');
                    const selectedPurity = puritySelect ? puritySelect.value : 'Normal';
                    const purityMultiplier = purityMultipliers[selectedPurity] || 1.0;

                    const selectedFacilityName = facilitySelect.value;
                    const selectedOutputName = outputSelect.value;
                    const quantity = parseInt(quantityInput.value);

                    const facilityData = facilitiesData[selectedFacilityName];
                    const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                    if (recipe) {
                        recipe.outputs.forEach(output => {
                            totalProduction[output.item] = (totalProduction[output.item] || 0) + (output.rate * quantity * purityMultiplier);
                        });
                    }
                }
            });
        });

        const globalMaterialSupply = { ...receivedMaterials }; // Tracks materials available from previous columns
        const factoryLineLeftovers = { ...receivedMaterials }; // For the factory line summary

        // Second Pass: Calculate supply, consumption, and balance
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const column = columns[columnIndex];
            const facilities = column.querySelectorAll('.facility');

            for (const facilityDiv of facilities) {
                if (facilityDiv.dataset.received === 'true') {
                    const outputList = facilityDiv.querySelector('.output-list');
                    const product = facilityDiv.dataset.receivedProduct;
                    const amount = parseFloat(facilityDiv.dataset.receivedAmount);
                    const consumption = totalDemands[product] || 0;
                    const balance = amount - consumption;
                    outputList.innerHTML = `
                        <li><span class="item-name">Received</span><span class="item-usage">${amount}/min</span></li>
                        <li><span class="item-name">Balance</span><span class="item-usage">${balance}/min</span></li>
                        <li><span class="item-name">Consumption</span><span class="item-usage">${consumption}/min</span></li>
                    `;
                    continue;
                }

                const facilitySelect = facilityDiv.querySelector('.facility-select');
                const outputSelect = facilityDiv.querySelector('.output-select');
                const quantityInput = facilityDiv.querySelector('.quantity-input');
                const puritySelect = facilityDiv.querySelector('.purity-select');
                const facilityImageBox = facilityDiv.querySelector('.facility-image-box');
                const productImageBox = facilityDiv.querySelector('.product-image-box');

                const selectedFacilityName = facilitySelect.value;
                const selectedOutputName = outputSelect.value;
                const quantity = parseInt(quantityInput.value);
                const selectedPurity = puritySelect ? puritySelect.value : 'Normal'; // Default to Normal
                const purityMultiplier = purityMultipliers[selectedPurity] || 1.0;

                const facilityData = facilitiesData[selectedFacilityName];
                const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                const inputList = facilityDiv.querySelector('.input-list');
                const outputList = facilityDiv.querySelector('.output-list');
                const powerValueSpan = facilityDiv.querySelector('.power-value');

                inputList.innerHTML = ''; // Clear previous inputs
                outputList.innerHTML = ''; // Clear previous outputs

                const facilityNameCollapsed = facilityDiv.querySelector('.facility-name-collapsed');
                const balanceCollapsed = facilityDiv.querySelector('.balance-collapsed');
                const facilityImageBoxCollapsed = facilityDiv.querySelector('.facility-image-box-collapsed');
                const productImageBoxCollapsed = facilityDiv.querySelector('.product-image-box-collapsed');

                facilityImageBox.style.backgroundImage = `url(${getImagePath(selectedFacilityName)})`;

                if (recipe) {
                    populateOutputSelect(facilitySelect, outputSelect);
                    outputSelect.value = selectedOutputName;

                    if (recipe.outputs.length > 0) {
                        productImageBox.style.backgroundImage = `url(${getImagePath(recipe.outputs[0].item)})`;
                    } else {
                        productImageBox.style.backgroundImage = 'none';
                    }

                    for (const input of recipe.inputs) {
                        const totalNeeded = input.rate * quantity;
                        const available = globalMaterialSupply[input.item] || 0;
                        const consumed = Math.min(totalNeeded, available);
                        const balance = available - totalNeeded;

                        globalMaterialSupply[input.item] = balance;

                        const li = document.createElement('li');
                        li.classList.add('input-item');
                        li.innerHTML = `<span class="item-name">${input.item}</span><span class="item-usage">(${input.rate}/min) ${totalNeeded}/min</span>`;
                        inputList.appendChild(li);

                        if (balance < 0 && !producedMaterials.has(input.item)) {
                            const producer = findProducerRecipe(input.item);
                            if (producer) {
                                let producerExists = false;
                                for (let i = 0; i < columnIndex; i++) {
                                    const prevColumn = columns[i];
                                    if (Array.from(prevColumn.querySelectorAll('.facility')).some(facDiv =>
                                        facDiv.querySelector('.facility-select').value === producer.facilityName &&
                                        facDiv.querySelector('.output-select').value === producer.recipeName
                                    )) {
                                        producerExists = true;
                                        break;
                                    }
                                }

                                if (!producerExists) {
                                    // Only auto-add if not currently dragging a facility
                                    if (!isDraggingFacility) {
                                        // Calculate required quantity
                                        let calculatedQuantity = 1; // Default to 1
                                        const producerFacilityData = facilitiesData[producer.facilityName];
                                        const producerRecipe = producerFacilityData.recipes[producer.recipeName];
                                        const producerOutput = producerRecipe.outputs.find(output => output.item === input.item);

                                        if (producerOutput) {
                                                    const producerOutputRate = producerOutput.rate;
                                                    if (producerOutputRate > 0) {
                                                        // Use the overall deficit of the input.item
                                                        const overallDeficit = totalDemands[input.item] - (globalMaterialSupply[input.item] || 0);
                                                        if (overallDeficit > 0) { // Only calculate if there's an actual deficit
                                                            calculatedQuantity = Math.ceil(overallDeficit / producerOutputRate);
                                                        }
                                                    }
                                                }

                                        // Exclude Miners from auto-quantity adjustment
                                        if (producer.facilityName.startsWith('Miner')) {
                                            calculatedQuantity = 1;
                                        }

                                        if (columnIndex > 0) {
                                            const prevColumn = columns[columnIndex - 1];
                                            addFacilityToColumn(prevColumn, producer.facilityName, producer.recipeName, calculatedQuantity);
                                            return true;
                                        } else {
                                            const columnsContainer = column.closest('.columns-container');
                                            const newColumn = document.createElement('div');
                                            newColumn.classList.add('column');
                                            newColumn.dataset.columnId = columnsContainer.querySelectorAll('.column').length + 1;
                                            newColumn.innerHTML = '<div class="column-handle"></div><button class="add-facility-btn">+</button><div class="facilities-container"></div><button class="remove-column-btn">- column</button>';
                                            attachColumnEventListeners(newColumn);
                                            columnsContainer.insertBefore(newColumn, column);
                                            makeColumnDraggable(newColumn);
                                            addFacilityToColumn(newColumn, producer.facilityName, producer.recipeName, calculatedQuantity);
                                            return true;
                                        }
                                    }
                                }
                            }
                        }

                        factoryLineLeftovers[input.item] = (factoryLineLeftovers[input.item] || 0) - totalNeeded;
                    }

                    recipe.outputs.forEach(output => {
                        const totalProduced = output.rate * quantity * purityMultiplier;
                        globalMaterialSupply[output.item] = (globalMaterialSupply[output.item] || 0) + totalProduced;

                        const outputConsumption = totalDemands[output.item] || 0;
                        const syncedBalance = (totalProduction[output.item] || 0) - outputConsumption;

                        // Change background color based on outputBalance
                        if (syncedBalance < 0) {
                            facilityImageBox.style.backgroundColor = '#F43535';
                            productImageBox.style.backgroundColor = '#F43535';
                            facilityImageBoxCollapsed.style.backgroundColor = '#F43535';
                            productImageBoxCollapsed.style.backgroundColor = '#F43535';
                        } else {
                            facilityImageBox.style.backgroundColor = '#eee';
                            productImageBox.style.backgroundColor = '#eee';
                            facilityImageBoxCollapsed.style.backgroundColor = '#eee';
                            productImageBoxCollapsed.style.backgroundColor = '#eee';
                        }

                        facilityNameCollapsed.textContent = selectedFacilityName;
                        balanceCollapsed.textContent = `${syncedBalance}/min`;
                        facilityImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(selectedFacilityName)})`;
                        if (recipe.outputs.length > 0) {
                            productImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(recipe.outputs[0].item)})`;
                        } else {
                            productImageBoxCollapsed.style.backgroundImage = 'none';
                        }

                        const li = document.createElement('li');
                        li.classList.add('output-item');
                        li.innerHTML = `<span class="item-name">${output.item}</span><span class="item-usage">(${output.rate * purityMultiplier}/min) ${totalProduced}/min</span>`;

                        const sendButton = document.createElement('button');
                        sendButton.textContent = 'Send';
                        sendButton.classList.add('send-btn');
                        li.appendChild(sendButton);

                        const sendToContainer = facilityDiv.querySelector('.send-to-container');
                        const sendToDropdown = sendToContainer.querySelector('.send-to-dropdown-facility');

                        sendButton.addEventListener('click', () => {
                            sendToContainer.style.display = sendToContainer.style.display === 'none' ? 'block' : 'none';
                            populateFacilitySendToDropdown(sendToDropdown, facilityDiv);
                        });

                        sendToDropdown.addEventListener('change', (e) => {
                            const recipientLineId = e.target.value;
                            if (recipientLineId) {
                                const senderLineId = facilityDiv.closest('.main-window').dataset.lineId;
                                sendProductFromFacilityToFactoryLine(senderLineId, recipientLineId, output.item, totalProduced);
                                e.target.value = '';
                                sendToContainer.style.display = 'none';
                            }
                        });

                        outputList.appendChild(li);

                        const consumptionLi = document.createElement('li');
                        consumptionLi.classList.add('output-item');
                        consumptionLi.innerHTML = `<span class="item-name">Consumption</span><span class="item-usage">${outputConsumption}/min</span>`;
                        outputList.appendChild(consumptionLi);

                        const balanceLi = document.createElement('li');
                        balanceLi.classList.add('output-item');
                        balanceLi.innerHTML = `<span class="item-name">Balance</span><span class="item-usage">${syncedBalance}/min</span>`;
                        outputList.appendChild(balanceLi);

                        factoryLineLeftovers[output.item] = (factoryLineLeftovers[output.item] || 0) + totalProduced;
                    });

                    powerValueSpan.textContent = `${facilityData.powerUsage} MW / ${facilityData.powerUsage * quantity} MW`;
                }
            }
        }

        const leftoverList = factoryLineDiv.querySelector('.leftover-list');
        leftoverList.innerHTML = '';
        for (const item in factoryLineLeftovers) {
            if (factoryLineLeftovers[item] > 0) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = getImagePath(item);
                const balanceSpan = document.createElement('span');
                balanceSpan.textContent = factoryLineLeftovers[item];
                li.appendChild(img);
                li.appendChild(balanceSpan);
                if (receivedMaterials[item]) {
                    li.classList.add('received-item');
                    const receivedFacility = factoryLineDiv.querySelector(`.facility[data-received-product='${item}']`);
                    if (receivedFacility) {
                        const senderLine = document.querySelector(`.main-window[data-line-id='${receivedFacility.dataset.receivedFrom}']`);
                        if (senderLine) {
                            li.querySelector('img').style.backgroundColor = senderLine.querySelector('.header-container').style.backgroundColor;
                        }
                    }
                }
                leftoverList.appendChild(li);
            }
        }
        return false;
    }

    // Add event listener for adding new factory lines
    addFactoryLineBtn.addEventListener('click', () => {
        createFactoryLine();
        updateAllFactoryLines();
    });

    // Initial factory line creation
    loadState();
    if (factoryLinesContainer.children.length === 0) {
        createFactoryLine();
    }
    updateAllFactoryLines();
});