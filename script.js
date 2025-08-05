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
            if (outputSelect.options.length > 1) { // Check if there are actual recipes in addition to the default option
                outputSelect.value = outputSelect.options[1].value; // Select the first actual recipe
            }
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
    function createFacilityElement(initialFacility = null, initialRecipe = null) {
        const facilityDiv = document.createElement('div');
        facilityDiv.classList.add('facility');
        facilityDiv.innerHTML = `
            <div class="facility-top-bar">
                <div class="collapse-btn"><img src="icons/CollapseArrowup.png" alt="Collapse"></div>
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
                <input type="number" class="quantity-input" value="1" min="1">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="materials-display">
                <h4>Inputs:</h4>
                <ul class="input-list"></ul>
                <h4>Outputs:</h4>
                <ul class="output-list"></ul>
            </div>
            <div class="power-display">
                <span>Power: <span class="power-value">0</span> MW</span>
            </div>
        `;

        const facilitySelect = facilityDiv.querySelector('.facility-select');
        const outputSelect = facilityDiv.querySelector('.output-select');
        const quantityInput = facilityDiv.querySelector('.quantity-input');
        const minusBtn = facilityDiv.querySelector('.quantity-btn.minus');
        const plusBtn = facilityDiv.querySelector('.quantity-btn.plus');
        const removeBtn = facilityDiv.querySelector('.remove-facility-btn');
        const purityControl = facilityDiv.querySelector('.purity-control');
        const puritySelect = facilityDiv.querySelector('.purity-select');
        const facilityImageBox = facilityDiv.querySelector('.facility-image-box');
        const productImageBox = facilityDiv.querySelector('.product-image-box');

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
                collapseImg.src = 'icons/CollapseArrowdown.png';
                purityControl.style.display = 'none';
            } else {
                collapseImg.src = 'icons/CollapseArrowup.png';
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
        quantityInput.addEventListener('change', updateAllFactoryLines);
        minusBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateAllFactoryLines();
            }
        });
        plusBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateAllFactoryLines();
        });
        puritySelect.addEventListener('change', updateAllFactoryLines); // New event listener for purity

        removeBtn.addEventListener('click', () => {
            facilityDiv.remove();
            updateAllFactoryLines();
        });

        return facilityDiv;
    }

    // Function to add a facility to a specific column
    function addFacilityToColumn(columnElement, initialFacility = null, initialRecipe = null) {
        const facilityElement = createFacilityElement(initialFacility, initialRecipe);
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
            if (confirm('Are you sure you want to remove this column?')) {
                const column = e.target.closest('.column');
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
                    <h3>Summary:</h3>
                    <ul class="leftover-list"></ul>
                </div>
                <button class="change-color-btn"><img src="icons/change_color_black.png" alt="Change Color"></button>
            </div>
            <div class="columns-container">
                <div class="column" data-column-id="1">
                    <div class="column-handle"></div>
                    <button class="add-facility-btn">+</button>
                    <div class="facilities-container"></div>
                    <button class="remove-column-btn">X</button>
                </div>
                <div class="column" data-column-id="2">
                    <div class="column-handle"></div>
                    <button class="add-facility-btn">+</button>
                    <div class="facilities-container"></div>
                    <button class="remove-column-btn">X</button>
                </div>
                <button class="add-column-btn">Add Column</button>
            </div>
        `;

        factoryLinesContainer.appendChild(factoryLineDiv);

        const removeFactoryLineBtn = factoryLineDiv.querySelector('.remove-factory-line-btn');
        removeFactoryLineBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to remove this factory line?')) {
                factoryLineDiv.remove();
            }
        });

        // Attach event listeners to initial columns
        factoryLineDiv.querySelectorAll('.column').forEach(column => {
            attachColumnEventListeners(column);
            makeColumnDraggable(column); // Make columns draggable
        });

        // Attach event listener for adding new columns to the button within this factory line
        const addColumnBtn = factoryLineDiv.querySelector('.add-column-btn');
        const columnsContainer = factoryLineDiv.querySelector('.columns-container');
        addColumnBtn.addEventListener('click', () => {
            console.log('Add Column button clicked!');
            const newColumn = document.createElement('div');
            newColumn.classList.add('column');
            newColumn.dataset.columnId = columnsContainer.querySelectorAll('.column').length + 1;
            newColumn.innerHTML = '<div class="column-handle"></div><button class="add-facility-btn">+</button><div class="facilities-container"></div><button class="remove-column-btn">X</button>';
            attachColumnEventListeners(newColumn); // Attach listeners to the new column
            columnsContainer.insertBefore(newColumn, addColumnBtn); // Insert before the addColumnBtn
            setTimeout(() => {
                makeColumnDraggable(newColumn); // Make new columns draggable after DOM is ready
            }, 0);
            console.log('New column inserted.', newColumn);
            updateAllFactoryLines();
        });

        return factoryLineDiv;
    }

    let draggedColumn = null;

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

    // Main update function for all factory lines
    function updateAllFactoryLines() {
        let needsRecalculation = false; // Flag to re-run if facilities are added

        document.querySelectorAll('.main-window').forEach(factoryLineDiv => {
            const columns = factoryLineDiv.querySelectorAll('.column');
            const totalDemands = {}; // Stores total demand for each material across the entire factory line

            // First Pass: Collect all demands
            columns.forEach(column => {
                const facilities = column.querySelectorAll('.facility');
                facilities.forEach(facilityDiv => {
                    const facilitySelect = facilityDiv.querySelector('.facility-select');
                    const outputSelect = facilityDiv.querySelector('.output-select');
                    const quantityInput = facilityDiv.querySelector('.quantity-input');

                    const selectedFacilityName = facilitySelect.value;
                    const selectedOutputName = outputSelect.value;
                    const quantity = parseInt(quantityInput.value);
                    const puritySelect = facilityDiv.querySelector('.purity-select');
                    const selectedPurity = puritySelect ? puritySelect.value : 'Normal';
                    const purityMultiplier = purityMultipliers[selectedPurity] || 1.0;

                    const facilityData = facilitiesData[selectedFacilityName];
                    const recipe = facilityData ? facilityData.recipes[selectedOutputName] : null;

                    if (recipe) {
                        recipe.inputs.forEach(input => {
                            totalDemands[input.item] = (totalDemands[input.item] || 0) + (input.rate * quantity);
                        });
                        // For outputs, consider the purity multiplier in the demand calculation if it's a miner
                        if (selectedFacilityName.startsWith('Miner')) {
                            recipe.outputs.forEach(output => {
                                // This part is tricky: if a miner produces something, it's not a demand.
                                // Demands are only for inputs of other buildings.
                                // So, no change needed here for outputs.
                            });
                        }
                    }
                });
            });

            const globalMaterialSupply = {}; // Tracks materials available from previous columns
            const factoryLineLeftovers = {}; // For the factory line summary

            // Second Pass: Calculate supply, consumption, and balance
            columns.forEach((column, columnIndex) => {
                const facilities = column.querySelectorAll('.facility');

                facilities.forEach(facilityDiv => {
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
                    // powerValueSpan.textContent = '0'; // This will be updated dynamically below

                    const facilityNameCollapsed = facilityDiv.querySelector('.facility-name-collapsed');
                    const balanceCollapsed = facilityDiv.querySelector('.balance-collapsed');
                    const facilityImageBoxCollapsed = facilityDiv.querySelector('.facility-image-box-collapsed');
                    const productImageBoxCollapsed = facilityDiv.querySelector('.product-image-box-collapsed');

                    // Set facility image
                    facilityImageBox.style.backgroundImage = `url(${getImagePath(selectedFacilityName)})`;

                    if (recipe) {
                        // Update output dropdown for this facility (in case facility type changed)
                        populateOutputSelect(facilitySelect, outputSelect);
                        outputSelect.value = selectedOutputName; // Re-select current output

                        // Set product image
                        if (recipe.outputs.length > 0) {
                            productImageBox.style.backgroundImage = `url(${getImagePath(recipe.outputs[0].item)})`;
                        } else {
                            productImageBox.style.backgroundImage = 'none';
                        }

                        // --- Process Inputs ---
                        recipe.inputs.forEach(input => {
                            const totalNeeded = input.rate * quantity;
                            const available = globalMaterialSupply[input.item] || 0;
                            const consumed = Math.min(totalNeeded, available);
                            const balance = available - totalNeeded;

                            globalMaterialSupply[input.item] = balance; // Update pool with remaining material

                            const li = document.createElement('li');
                            li.classList.add('input-item');
                            li.innerHTML = `<span class="item-name">${input.item}</span><span class="item-usage">(${input.rate}/min) ${totalNeeded}/min</span>`;
                            inputList.appendChild(li);

                            // Auto-fill logic
                            if (balance < 0) { // If there's a deficit
                                const producer = findProducerRecipe(input.item);
                                if (producer) {
                                    if (columnIndex > 0) { // and not the first column
                                        const prevColumn = columns[columnIndex - 1];
                                        // Check if this producer already exists in the previous column
                                        const producerExists = Array.from(prevColumn.querySelectorAll('.facility')).some(facDiv => {
                                            return facDiv.querySelector('.facility-select').value === producer.facilityName &&
                                                   facDiv.querySelector('.output-select').value === producer.recipeName;
                                        });
                                        if (!producerExists) {
                                            addFacilityToColumn(prevColumn, producer.facilityName, producer.recipeName);
                                            needsRecalculation = true; // Mark for re-run
                                        }
                                    } else { // It's the first column, so create a new one
                                        const columnsContainer = column.closest('.columns-container');
                                        const newColumn = document.createElement('div');
                                        newColumn.classList.add('column');
                                        newColumn.dataset.columnId = columnsContainer.querySelectorAll('.column').length + 1; // This might need adjustment
                                        newColumn.innerHTML = '<div class="column-handle"></div><button class="add-facility-btn">+</button><div class="facilities-container"></div><button class="remove-column-btn">X</button>';
                                        attachColumnEventListeners(newColumn);
                                        columnsContainer.insertBefore(newColumn, column);
                                        setTimeout(() => {
                                            makeColumnDraggable(newColumn);
                                        }, 0);
                                        addFacilityToColumn(newColumn, producer.facilityName, producer.recipeName);
                                        needsRecalculation = true; // Mark for re-run
                                    }
                                }
                            }

                            // For overall factory line summary, inputs are negative
                            factoryLineLeftovers[input.item] = (factoryLineLeftovers[input.item] || 0) - totalNeeded;
                        });

                        // --- Process Outputs ---
                        recipe.outputs.forEach(output => {
                            const totalProduced = output.rate * quantity * purityMultiplier; // Apply purity multiplier here
                            globalMaterialSupply[output.item] = (globalMaterialSupply[output.item] || 0) + totalProduced; // Add to pool

                            // Calculate consumption for this specific output from totalDemands
                            // This is the total demand for this item across the entire line
                            const outputConsumption = totalDemands[output.item] || 0;
                            const outputBalance = totalProduced - outputConsumption;

                            facilityNameCollapsed.textContent = selectedFacilityName;
                            balanceCollapsed.textContent = `${outputBalance}/min`;
                            facilityImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(selectedFacilityName)})`;
                            if (recipe.outputs.length > 0) {
                                productImageBoxCollapsed.style.backgroundImage = `url(${getImagePath(recipe.outputs[0].item)})`;
                            } else {
                                productImageBoxCollapsed.style.backgroundImage = 'none';
                            }

                            const li = document.createElement('li');
                            li.classList.add('output-item');
                            li.innerHTML = `<span class="item-name">${output.item}</span><span class="item-usage">(${output.rate * purityMultiplier}/min) ${totalProduced}/min</span>`;
                            outputList.appendChild(li);

                            const consumptionLi = document.createElement('li');
                            consumptionLi.classList.add('output-item');
                            consumptionLi.innerHTML = `<span class="item-name">Consumption</span><span class="item-usage">${outputConsumption}/min</span>`;
                            outputList.appendChild(consumptionLi);

                            const balanceLi = document.createElement('li');
                            balanceLi.classList.add('output-item');
                            balanceLi.innerHTML = `<span class="item-name">Balance</span><span class="item-usage">${outputBalance}/min</span>`;
                            outputList.appendChild(balanceLi);

                            // For overall factory line summary, outputs are positive
                            factoryLineLeftovers[output.item] = (factoryLineLeftovers[output.item] || 0) + totalProduced;
                        });

                        // --- Power ---
                        powerValueSpan.textContent = `${facilityData.powerUsage} MW / ${facilityData.powerUsage * quantity} MW`;
                    }
                });
            });

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
                    leftoverList.appendChild(li);
                }
            }
        });

        if (needsRecalculation) {
            // Use setTimeout to allow DOM updates before re-running
            setTimeout(updateAllFactoryLines, 0);
        }
    }

    // Add event listener for adding new factory lines
    addFactoryLineBtn.addEventListener('click', () => {
        createFactoryLine();
        updateAllFactoryLines();
    });

    // Initial factory line creation
    createFactoryLine();
    updateAllFactoryLines();
});