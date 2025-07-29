const purityMultipliers = {
    "Impure": 0.5,
    "Normal": 1.0,
    "Pure": 2.0
};

const facilitiesData = {
    "Smelter": {
        "powerUsage": 4, // MW
        "recipes": {
            "Iron Ingot": {
                "inputs": [{ "item": "Iron Ore", "rate": 30 }],
                "outputs": [{ "item": "Iron Ingot", "rate": 30 }]
            },
            "Copper Ingot": {
                "inputs": [{ "item": "Copper Ore", "rate": 30 }],
                "outputs": [{ "item": "Copper Ingot", "rate": 30 }]
            },
            "Caterium Ingot": {
                "inputs": [{ "item": "Caterium Ore", "rate": 45 }],
                "outputs": [{ "item": "Caterium Ingot", "rate": 15 }]
            },
            "Pure Aluminum Ingot": {
                "inputs": [{ "item": "Aluminum Scrap", "rate": 60 }],
                "outputs": [{ "item": "Aluminum Ingot", "rate": 30 }]
            }
        }
    },
    "Constructor": {
        "powerUsage": 4, // MW
        "recipes": {
            "Alien DNA Capsule": {
                "inputs": [
                    { "item": "Alien Protein", "rate": 10 }
                ],
                "outputs": [
                    { "item": "Alien DNA Capsule", "rate": 10 }
                ]
            },
            "Aluminum Casing": {
                "inputs": [
                    { "item": "Aluminum Ingot", "rate": 90 }
                ],
                "outputs": [
                    { "item": "Aluminum Casing", "rate": 60 }
                ]
            },
            "Biomass (Alien Protein)": {
                "inputs": [
                    { "item": "Alien Protein", "rate": 15 }
                ],
                "outputs": [
                    { "item": "Biomass", "rate": 1500 }
                ]
            },
            "Biomass (Leaves)": {
                "inputs": [
                    { "item": "Leaves", "rate": 120 }
                ],
                "outputs": [
                    { "item": "Biomass", "rate": 60 }
                ]
            },
            "Biomass (Mycelia)": {
                "inputs": [
                    { "item": "Mycelia", "rate": 15 }
                ],
                "outputs": [
                    { "item": "Biomass", "rate": 150 }
                ]
            },
            "Biomass (Wood)": {
                "inputs": [
                    { "item": "Wood", "rate": 60 }
                ],
                "outputs": [
                    { "item": "Biomass", "rate": 300 }
                ]
            },
            "Cable": {
                "inputs": [
                    { "item": "Wire", "rate": 60 }
                ],
                "outputs": [
                    { "item": "Cable", "rate": 30 }
                ]
            },
            "Concrete": {
                "inputs": [
                    { "item": "Limestone", "rate": 45 }
                ],
                "outputs": [
                    { "item": "Concrete", "rate": 15 }
                ]
            },
            "Copper Powder": {
                "inputs": [
                    { "item": "Copper Ingot", "rate": 300 }
                ],
                "outputs": [
                    { "item": "Copper Powder", "rate": 50 }
                ]
            },
            "Copper Sheet": {
                "inputs": [
                    { "item": "Copper Ingot", "rate": 20 }
                ],
                "outputs": [
                    { "item": "Copper Sheet", "rate": 10 }
                ]
            },
            "Empty Canister": {
                "inputs": [
                    { "item": "Plastic", "rate": 30 }
                ],
                "outputs": [
                    { "item": "Empty Canister", "rate": 60 }
                ]
            },
            "Empty Fluid Tank": {
                "inputs": [
                    { "item": "Aluminum Ingot", "rate": 60 }
                ],
                "outputs": [
                    { "item": "Empty Fluid Tank", "rate": 60 }
                ]
            },
            "Ficsite Trigon": {
                "inputs": [
                    { "item": "Ficsite Ingot", "rate": 10 }
                ],
                "outputs": [
                    { "item": "Ficsite Trigon", "rate": 30 }
                ]
            },
            "Hatcher Protein": {
                "inputs": [
                    { "item": "Hatcher Remains", "rate": 20 }
                ],
                "outputs": [
                    { "item": "Alien Protein", "rate": 20 }
                ]
            },
            "Hog Protein": {
                "inputs": [
                    { "item": "Hog Remains", "rate": 20 }
                ],
                "outputs": [
                    { "item": "Alien Protein", "rate": 20 }
                ]
            },
            "Iron Plate": {
                "inputs": [
                    { "item": "Iron Ingot", "rate": 30 }
                ],
                "outputs": [
                    { "item": "Iron Plate", "rate": 20 }
                ]
            },
            "Iron Rebar": {
                "inputs": [
                    { "item": "Iron Rod", "rate": 15 }
                ],
                "outputs": [
                    { "item": "Iron Rebar", "rate": 15 }
                ]
            },
            "Iron Rod": {
                "inputs": [
                    { "item": "Iron Ingot", "rate": 15 }
                ],
                "outputs": [
                    { "item": "Iron Rod", "rate": 15 }
                ]
            },
            "Power Shard (1)": {
                "inputs": [
                    { "item": "Blue Power Slug", "rate": 7.5 }
                ],
                "outputs": [
                    { "item": "Power Shard", "rate": 7.5 }
                ]
            },
            "Power Shard (2)": {
                "inputs": [
                    { "item": "Yellow Power Slug", "rate": 5 }
                ],
                "outputs": [
                    { "item": "Power Shard", "rate": 10 }
                ]
            },
            "Power Shard (5)": {
                "inputs": [
                    { "item": "Purple Power Slug", "rate": 2.5 }
                ],
                "outputs": [
                    { "item": "Power Shard", "rate": 12.5 }
                ]
            },
            "Quartz Crystal": {
                "inputs": [
                    { "item": "Raw Quartz", "rate": 37.5 }
                ],
                "outputs": [
                    { "item": "Quartz Crystal", "rate": 22.5 }
                ]
            },
            "Quickwire": {
                "inputs": [
                    { "item": "Caterium Ingot", "rate": 12 }
                ],
                "outputs": [
                    { "item": "Quickwire", "rate": 60 }
                ]
            },
            "Reanimated SAM": {
                "inputs": [
                    { "item": "SAM", "rate": 120 }
                ],
                "outputs": [
                    { "item": "Reanimated SAM", "rate": 30 }
                ]
            },
            "Screws": {
                "inputs": [
                    { "item": "Iron Rod", "rate": 10 }
                ],
                "outputs": [
                    { "item": "Screws", "rate": 40 }
                ]
            },
            "Silica": {
                "inputs": [
                    { "item": "Raw Quartz", "rate": 22.5 }
                ],
                "outputs": [
                    { "item": "Silica", "rate": 37.5 }
                ]
            },
            "Solid Biofuel": {
                "inputs": [
                    { "item": "Biomass", "rate": 120 }
                ],
                "outputs": [
                    { "item": "Solid Biofuel", "rate": 60 }
                ]
            },
            "Spitter Protein": {
                "inputs": [
                    { "item": "Spitter Remains", "rate": 20 }
                ],
                "outputs": [
                    { "item": "Alien Protein", "rate": 20 }
                ]
            },
            "Steel Beam": {
                "inputs": [
                    { "item": "Steel Ingot", "rate": 60 }
                ],
                "outputs": [
                    { "item": "Steel Beam", "rate": 15 }
                ]
            },
            "Steel Pipe": {
                "inputs": [
                    { "item": "Steel Ingot", "rate": 30 }
                ],
                "outputs": [
                    { "item": "Steel Pipe", "rate": 20 }
                ]
            },
            "Stinger Protein": {
                "inputs": [
                    { "item": "Stinger Remains", "rate": 20 }
                ],
                "outputs": [
                    { "item": "Alien Protein", "rate": 20 }
                ]
            },
            "Wire": {
                "inputs": [
                    { "item": "Copper Ingot", "rate": 15 }
                ],
                "outputs": [
                    { "item": "Wire", "rate": 30 }
                ]
            }
        }
    },
    "Miner Mk.1": {
        "powerUsage": 5, // MW
        "recipes": {
            "Iron Ore": {
                "inputs": [],
                "outputs": [{ "item": "Iron Ore", "rate": 60 }]
            },
            "Copper Ore": {
                "inputs": [],
                "outputs": [{ "item": "Copper Ore", "rate": 60 }]
            },
            "Caterium Ore": {
                "inputs": [],
                "outputs": [{ "item": "Caterium Ore", "rate": 60 }]
            }
        }
    },
    "Miner Mk.2": {
        "powerUsage": 15, // MW
        "recipes": {
            "Iron Ore": {
                "inputs": [],
                "outputs": [{ "item": "Iron Ore", "rate": 120 }]
            },
            "Copper Ore": {
                "inputs": [],
                "outputs": [{ "item": "Copper Ore", "rate": 120 }]
            },
            "Caterium Ore": {
                "inputs": [],
                "outputs": [{ "item": "Caterium Ore", "rate": 120 }]
            }
        }
    },
    "Miner Mk.3": {
        "powerUsage": 45, // MW
        "recipes": {
            "Iron Ore": {
                "inputs": [],
                "outputs": [{ "item": "Iron Ore", "rate": 240 }]
            },
            "Copper Ore": {
                "inputs": [],
                "outputs": [{ "item": "Copper Ore", "rate": 240 }]
            },
            "Caterium Ore": {
                "inputs": [],
                "outputs": [{ "item": "Caterium Ore", "rate": 240 }]
            }
        }
    },
    "Assembler": {
        "powerUsage": 15, // MW
        "recipes": {} // Recipes will be added based on user input
    }
};
