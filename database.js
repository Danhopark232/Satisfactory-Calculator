const purityMultipliers = {
    "Impure": 0.5,
    "Normal": 1.0,
    "Pure": 2.0
};

const facilitiesData = {
    "Assembler": {
        "powerUsage": 15.0,
        "recipes": {
            "AI Limiter": {
                "inputs": [
                    {
                        "item": "Copper Sheet",
                        "rate": 25.0
                    },
                    {
                        "item": "Quickwire",
                        "rate": 100.0
                    }
                ],
                "outputs": [
                    {
                        "item": "AI Limiter",
                        "rate": 5.0
                    }
                ]
            },
            "Alclad Aluminum Sheet": {
                "inputs": [
                    {
                        "item": "Aluminum Ingot",
                        "rate": 30.0
                    },
                    {
                        "item": "Copper Ingot",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alclad Aluminum Sheet",
                        "rate": 30.0
                    }
                ]
            },
            "Assembly Director System": {
                "inputs": [
                    {
                        "item": "Adaptive Control Unit",
                        "rate": 1.5
                    },
                    {
                        "item": "Supercomputer",
                        "rate": 0.75
                    }
                ],
                "outputs": [
                    {
                        "item": "Assembly Director System",
                        "rate": 0.75
                    }
                ]
            },
            "Automated Wiring": {
                "inputs": [
                    {
                        "item": "Stator",
                        "rate": 2.5
                    },
                    {
                        "item": "Cable",
                        "rate": 50.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Automated Wiring",
                        "rate": 2.5
                    }
                ]
            },
            "Black Powder": {
                "inputs": [
                    {
                        "item": "Coal",
                        "rate": 15.0
                    },
                    {
                        "item": "Sulfur",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Black Powder",
                        "rate": 30.0
                    }
                ]
            },
            "Circuit Board": {
                "inputs": [
                    {
                        "item": "Copper Sheet",
                        "rate": 15.0
                    },
                    {
                        "item": "Plastic",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Circuit Board",
                        "rate": 7.5
                    }
                ]
            },
            "Cluster Nobelisk": {
                "inputs": [
                    {
                        "item": "Nobelisk",
                        "rate": 7.5
                    },
                    {
                        "item": "Smokeless Powder",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Cluster Nobelisk",
                        "rate": 2.5
                    }
                ]
            },
            "Electromagnetic Control Rod": {
                "inputs": [
                    {
                        "item": "Stator",
                        "rate": 6.0
                    },
                    {
                        "item": "AI Limiter",
                        "rate": 4.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Electromagnetic Control Rod",
                        "rate": 4.0
                    }
                ]
            },
            "Encased Industrial Beam": {
                "inputs": [
                    {
                        "item": "Steel Beam",
                        "rate": 18.0
                    },
                    {
                        "item": "Concrete",
                        "rate": 36.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Encased Industrial Beam",
                        "rate": 6.0
                    }
                ]
            },
            "Encased Plutonium Cell": {
                "inputs": [
                    {
                        "item": "Plutonium Pellet",
                        "rate": 10.0
                    },
                    {
                        "item": "Concrete",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Encased Plutonium Cell",
                        "rate": 5.0
                    }
                ]
            },
            "Fabric": {
                "inputs": [
                    {
                        "item": "Mycelia",
                        "rate": 15.0
                    },
                    {
                        "item": "Biomass",
                        "rate": 75.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Fabric",
                        "rate": 15.0
                    }
                ]
            },
            "Fancy Fireworks": {
                "inputs": [
                    {
                        "item": "FICSMAS Tree Branch",
                        "rate": 10.0
                    },
                    {
                        "item": "FICSMAS Bow",
                        "rate": 7.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Fancy Fireworks",
                        "rate": 2.5
                    }
                ]
            },
            "Gas Nobelisk": {
                "inputs": [
                    {
                        "item": "Nobelisk",
                        "rate": 5.0
                    },
                    {
                        "item": "Biomass",
                        "rate": 50.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Gas Nobelisk",
                        "rate": 5.0
                    }
                ]
            },
            "Heat Sink": {
                "inputs": [
                    {
                        "item": "Alclad Aluminum Sheet",
                        "rate": 37.5
                    },
                    {
                        "item": "Copper Sheet",
                        "rate": 22.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Heat Sink",
                        "rate": 7.5
                    }
                ]
            },
            "Homing Rifle Ammo": {
                "inputs": [
                    {
                        "item": "Rifle Ammo",
                        "rate": 50.0
                    },
                    {
                        "item": "High-Speed Connector",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Homing Rifle Ammo",
                        "rate": 25.0
                    }
                ]
            },
            "Magnetic Field Generator": {
                "inputs": [
                    {
                        "item": "Versatile Framework",
                        "rate": 2.5
                    },
                    {
                        "item": "Electromagnetic Control Rod",
                        "rate": 1.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Magnetic Field Generator",
                        "rate": 1.0
                    }
                ]
            },
            "Modular Frame": {
                "inputs": [
                    {
                        "item": "Reinforced Iron Plate",
                        "rate": 3.0
                    },
                    {
                        "item": "Iron Rod",
                        "rate": 12.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Modular Frame",
                        "rate": 2.0
                    }
                ]
            },
            "Motor": {
                "inputs": [
                    {
                        "item": "Rotor",
                        "rate": 10.0
                    },
                    {
                        "item": "Stator",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Motor",
                        "rate": 5.0
                    }
                ]
            },
            "Nobelisk": {
                "inputs": [
                    {
                        "item": "Black Powder",
                        "rate": 20.0
                    },
                    {
                        "item": "Steel Pipe",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Nobelisk",
                        "rate": 10.0
                    }
                ]
            },
            "Pressure Conversion Cube": {
                "inputs": [
                    {
                        "item": "Fused Modular Frame",
                        "rate": 1.0
                    },
                    {
                        "item": "Radio Control Unit",
                        "rate": 2.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Pressure Conversion Cube",
                        "rate": 1.0
                    }
                ]
            },
            "Pulse Nobelisk": {
                "inputs": [
                    {
                        "item": "Nobelisk",
                        "rate": 5.0
                    },
                    {
                        "item": "Crystal Oscillator",
                        "rate": 1.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Pulse Nobelisk",
                        "rate": 5.0
                    }
                ]
            },
            "Reinforced Iron Plate": {
                "inputs": [
                    {
                        "item": "Iron Plate",
                        "rate": 30.0
                    },
                    {
                        "item": "Screws",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Reinforced Iron Plate",
                        "rate": 5.0
                    }
                ]
            },
            "Rifle Ammo": {
                "inputs": [
                    {
                        "item": "Copper Sheet",
                        "rate": 15.0
                    },
                    {
                        "item": "Smokeless Powder",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rifle Ammo",
                        "rate": 75.0
                    }
                ]
            },
            "Rotor": {
                "inputs": [
                    {
                        "item": "Iron Rod",
                        "rate": 20.0
                    },
                    {
                        "item": "Screws",
                        "rate": 100.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rotor",
                        "rate": 4.0
                    }
                ]
            },
            "Shatter Rebar": {
                "inputs": [
                    {
                        "item": "Iron Rebar",
                        "rate": 10.0
                    },
                    {
                        "item": "Quartz Crystal",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Shatter Rebar",
                        "rate": 5.0
                    }
                ]
            },
            "Smart Plating": {
                "inputs": [
                    {
                        "item": "Reinforced Iron Plate",
                        "rate": 2.0
                    },
                    {
                        "item": "Rotor",
                        "rate": 2.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Smart Plating",
                        "rate": 2.0
                    }
                ]
            },
            "Sparkly Fireworks": {
                "inputs": [
                    {
                        "item": "FICSMAS Tree Branch",
                        "rate": 7.5
                    },
                    {
                        "item": "FICSMAS Actual Snow",
                        "rate": 5.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Sparkly Fireworks",
                        "rate": 2.5
                    }
                ]
            },
            "Stator": {
                "inputs": [
                    {
                        "item": "Steel Pipe",
                        "rate": 15.0
                    },
                    {
                        "item": "Wire",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Stator",
                        "rate": 5.0
                    }
                ]
            },
            "Stun Rebar": {
                "inputs": [
                    {
                        "item": "Iron Rebar",
                        "rate": 10.0
                    },
                    {
                        "item": "Quickwire",
                        "rate": 50.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Stun Rebar",
                        "rate": 10.0
                    }
                ]
            },
            "Sweet Fireworks": {
                "inputs": [
                    {
                        "item": "FICSMAS Tree Branch",
                        "rate": 15.0
                    },
                    {
                        "item": "Candy Cane",
                        "rate": 7.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Sweet Fireworks",
                        "rate": 2.5
                    }
                ]
            },
            "Versatile Framework": {
                "inputs": [
                    {
                        "item": "Modular Frame",
                        "rate": 2.5
                    },
                    {
                        "item": "Steel Beam",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Versatile Framework",
                        "rate": 5.0
                    }
                ]
            }
        }
    },
    "Foundry": {
        "powerUsage": 16.0,
        "recipes": {
            "Aluminum Ingot": {
                "inputs": [
                    {
                        "item": "Aluminum Scrap",
                        "rate": 90.0
                    },
                    {
                        "item": "Silica",
                        "rate": 75.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Aluminum Ingot",
                        "rate": 60.0
                    }
                ]
            },
            "Steel Ingot": {
                "inputs": [
                    {
                        "item": "Iron Ore",
                        "rate": 45.0
                    },
                    {
                        "item": "Coal",
                        "rate": 45.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Steel Ingot",
                        "rate": 45.0
                    }
                ]
            }
        }
    },
    "Smelter": {
        "powerUsage": 4.0,
        "recipes": {
            "Caterium Ingot": {
                "inputs": [
                    {
                        "item": "Caterium Ore",
                        "rate": 45.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Caterium Ingot",
                        "rate": 15.0
                    }
                ]
            },
            "Copper Ingot": {
                "inputs": [
                    {
                        "item": "Copper Ore",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Copper Ingot",
                        "rate": 30.0
                    }
                ]
            },
            "Iron Ingot": {
                "inputs": [
                    {
                        "item": "Iron Ore",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Iron Ingot",
                        "rate": 30.0
                    }
                ]
            }
        }
    },
    "Constructor": {
        "powerUsage": 4.0,
        "recipes": {
            "Alien DNA Capsule": {
                "inputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alien DNA Capsule",
                        "rate": 10.0
                    }
                ]
            },
            "Aluminum Casing": {
                "inputs": [
                    {
                        "item": "Aluminum Ingot",
                        "rate": 90.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Aluminum Casing",
                        "rate": 60.0
                    }
                ]
            },
            "Biomass (Alien Protein)": {
                "inputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Biomass",
                        "rate": 1500.0
                    }
                ]
            },
            "Biomass (Leaves)": {
                "inputs": [
                    {
                        "item": "Leaves",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Biomass",
                        "rate": 60.0
                    }
                ]
            },
            "Biomass (Mycelia)": {
                "inputs": [
                    {
                        "item": "Mycelia",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Biomass",
                        "rate": 150.0
                    }
                ]
            },
            "Biomass (Wood)": {
                "inputs": [
                    {
                        "item": "Wood",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Biomass",
                        "rate": 300.0
                    }
                ]
            },
            "Cable": {
                "inputs": [
                    {
                        "item": "Wire",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Cable",
                        "rate": 30.0
                    }
                ]
            },
            "Concrete": {
                "inputs": [
                    {
                        "item": "Limestone",
                        "rate": 45.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Concrete",
                        "rate": 15.0
                    }
                ]
            },
            "Copper Powder": {
                "inputs": [
                    {
                        "item": "Copper Ingot",
                        "rate": 300.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Copper Powder",
                        "rate": 50.0
                    }
                ]
            },
            "Copper Sheet": {
                "inputs": [
                    {
                        "item": "Copper Ingot",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Copper Sheet",
                        "rate": 10.0
                    }
                ]
            },
            "Empty Canister": {
                "inputs": [
                    {
                        "item": "Plastic",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ]
            },
            "Empty Fluid Tank": {
                "inputs": [
                    {
                        "item": "Aluminum Ingot",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 60.0
                    }
                ]
            },
            "Ficsite Trigon": {
                "inputs": [
                    {
                        "item": "Ficsite Ingot",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Ficsite Trigon",
                        "rate": 30.0
                    }
                ]
            },
            "Hatcher Protein": {
                "inputs": [
                    {
                        "item": "Hatcher Remains",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 20.0
                    }
                ]
            },
            "Hog Protein": {
                "inputs": [
                    {
                        "item": "Hog Remains",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 20.0
                    }
                ]
            },
            "Iron Plate": {
                "inputs": [
                    {
                        "item": "Iron Ingot",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Iron Plate",
                        "rate": 20.0
                    }
                ]
            },
            "Iron Rebar": {
                "inputs": [
                    {
                        "item": "Iron Rod",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Iron Rebar",
                        "rate": 15.0
                    }
                ]
            },
            "Iron Rod": {
                "inputs": [
                    {
                        "item": "Iron Ingot",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Iron Rod",
                        "rate": 15.0
                    }
                ]
            },
            "Power Shard (1)": {
                "inputs": [
                    {
                        "item": "Blue Power Slug",
                        "rate": 7.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Power Shard",
                        "rate": 7.5
                    }
                ]
            },
            "Power Shard (2)": {
                "inputs": [
                    {
                        "item": "Yellow Power Slug",
                        "rate": 5.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Power Shard",
                        "rate": 10.0
                    }
                ]
            },
            "Power Shard (5)": {
                "inputs": [
                    {
                        "item": "Purple Power Slug",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Power Shard",
                        "rate": 12.5
                    }
                ]
            },
            "Quartz Crystal": {
                "inputs": [
                    {
                        "item": "Raw Quartz",
                        "rate": 37.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Quartz Crystal",
                        "rate": 22.5
                    }
                ]
            },
            "Quickwire": {
                "inputs": [
                    {
                        "item": "Caterium Ingot",
                        "rate": 12.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Quickwire",
                        "rate": 60.0
                    }
                ]
            },
            "Reanimated SAM": {
                "inputs": [
                    {
                        "item": "SAM",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Reanimated SAM",
                        "rate": 30.0
                    }
                ]
            },
            "Screws": {
                "inputs": [
                    {
                        "item": "Iron Rod",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Screws",
                        "rate": 40.0
                    }
                ]
            },
            "Silica": {
                "inputs": [
                    {
                        "item": "Raw Quartz",
                        "rate": 22.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Silica",
                        "rate": 37.5
                    }
                ]
            },
            "Solid Biofuel": {
                "inputs": [
                    {
                        "item": "Biomass",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Solid Biofuel",
                        "rate": 60.0
                    }
                ]
            },
            "Spitter Protein": {
                "inputs": [
                    {
                        "item": "Spitter Remains",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 20.0
                    }
                ]
            },
            "Steel Beam": {
                "inputs": [
                    {
                        "item": "Steel Ingot",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Steel Beam",
                        "rate": 15.0
                    }
                ]
            },
            "Steel Pipe": {
                "inputs": [
                    {
                        "item": "Steel Ingot",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Steel Pipe",
                        "rate": 20.0
                    }
                ]
            },
            "Stinger Protein": {
                "inputs": [
                    {
                        "item": "Stinger Remains",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alien Protein",
                        "rate": 20.0
                    }
                ]
            },
            "Wire": {
                "inputs": [
                    {
                        "item": "Copper Ingot",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Wire",
                        "rate": 30.0
                    }
                ]
            }
        }
    },
    "Refinery": {
        "powerUsage": 30.0,
        "recipes": {
            "Alumina Solution": {
                "inputs": [
                    {
                        "item": "Bauxite",
                        "rate": 120.0
                    },
                    {
                        "item": "Water",
                        "rate": 180.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alumina Solution",
                        "rate": 120.0
                    },
                    {
                        "item": "Silica",
                        "rate": 50.0
                    }
                ]
            },
            "Aluminum Scrap": {
                "inputs": [
                    {
                        "item": "Alumina Solution",
                        "rate": 240.0
                    },
                    {
                        "item": "Coal",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Aluminum Scrap",
                        "rate": 360.0
                    },
                    {
                        "item": "Water",
                        "rate": 120.0
                    }
                ]
            },
            "Fuel": {
                "inputs": [
                    {
                        "item": "Crude Oil",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Fuel",
                        "rate": 40.0
                    },
                    {
                        "item": "Polymer Resin",
                        "rate": 30.0
                    }
                ]
            },
            "Ionized Fuel": {
                "inputs": [
                    {
                        "item": "Rocket Fuel",
                        "rate": 40.0
                    },
                    {
                        "item": "Power Shard",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Ionized Fuel",
                        "rate": 40.0
                    },
                    {
                        "item": "Compacted Coal",
                        "rate": 5.0
                    }
                ]
            },
            "Liquid Biofuel": {
                "inputs": [
                    {
                        "item": "Solid Biofuel",
                        "rate": 90.0
                    },
                    {
                        "item": "Water",
                        "rate": 45.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Liquid Biofuel",
                        "rate": 60.0
                    }
                ]
            },
            "Petroleum Coke": {
                "inputs": [
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Petroleum Coke",
                        "rate": 120.0
                    }
                ]
            },
            "Plastic": {
                "inputs": [
                    {
                        "item": "Crude Oil",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Plastic",
                        "rate": 20.0
                    },
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 10.0
                    }
                ]
            },
            "Residual Fuel": {
                "inputs": [
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Fuel",
                        "rate": 40.0
                    }
                ]
            },
            "Residual Plastic": {
                "inputs": [
                    {
                        "item": "Polymer Resin",
                        "rate": 60.0
                    },
                    {
                        "item": "Water",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Plastic",
                        "rate": 20.0
                    }
                ]
            },
            "Residual Rubber": {
                "inputs": [
                    {
                        "item": "Polymer Resin",
                        "rate": 40.0
                    },
                    {
                        "item": "Water",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rubber",
                        "rate": 20.0
                    }
                ]
            },
            "Rubber": {
                "inputs": [
                    {
                        "item": "Crude Oil",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rubber",
                        "rate": 20.0
                    },
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 20.0
                    }
                ]
            },
            "Smokeless Powder": {
                "inputs": [
                    {
                        "item": "Black Powder",
                        "rate": 20.0
                    },
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Smokeless Powder",
                        "rate": 20.0
                    }
                ]
            },
            "Sulfuric Acid": {
                "inputs": [
                    {
                        "item": "Sulfur",
                        "rate": 50.0
                    },
                    {
                        "item": "Water",
                        "rate": 50.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Sulfuric Acid",
                        "rate": 50.0
                    }
                ]
            }
        }
    },
    "Blender": {
        "powerUsage": 75.0,
        "recipes": {
            "Battery": {
                "inputs": [
                    {
                        "item": "Sulfuric Acid",
                        "rate": 50.0
                    },
                    {
                        "item": "Alumina Solution",
                        "rate": 40.0
                    },
                    {
                        "item": "Aluminum Casing",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Battery",
                        "rate": 20.0
                    },
                    {
                        "item": "Water",
                        "rate": 30.0
                    }
                ]
            },
            "Biochemical Sculptor": {
                "inputs": [
                    {
                        "item": "Assembly Director System",
                        "rate": 0.5
                    },
                    {
                        "item": "Ficsite Trigon",
                        "rate": 40.0
                    },
                    {
                        "item": "Water",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Biochemical Sculptor",
                        "rate": 2.0
                    }
                ]
            },
            "Cooling System": {
                "inputs": [
                    {
                        "item": "Heat Sink",
                        "rate": 12.0
                    },
                    {
                        "item": "Rubber",
                        "rate": 12.0
                    },
                    {
                        "item": "Water",
                        "rate": 30.0
                    },
                    {
                        "item": "Nitrogen Gas",
                        "rate": 150.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Cooling System",
                        "rate": 6.0
                    }
                ]
            },
            "Encased Uranium Cell": {
                "inputs": [
                    {
                        "item": "Uranium",
                        "rate": 50.0
                    },
                    {
                        "item": "Concrete",
                        "rate": 15.0
                    },
                    {
                        "item": "Sulfuric Acid",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Encased Uranium Cell",
                        "rate": 25.0
                    },
                    {
                        "item": "Sulfuric Acid",
                        "rate": 10.0
                    }
                ]
            },
            "Fused Modular Frame": {
                "inputs": [
                    {
                        "item": "Heavy Modular Frame",
                        "rate": 1.5
                    },
                    {
                        "item": "Aluminum Casing",
                        "rate": 75.0
                    },
                    {
                        "item": "Nitrogen Gas",
                        "rate": 37.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Fused Modular Frame",
                        "rate": 1.5
                    }
                ]
            },
            "Nitric Acid": {
                "inputs": [
                    {
                        "item": "Nitrogen Gas",
                        "rate": 120.0
                    },
                    {
                        "item": "Water",
                        "rate": 30.0
                    },
                    {
                        "item": "Iron Plate",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Nitric Acid",
                        "rate": 30.0
                    }
                ]
            },
            "Non-Fissile Uranium": {
                "inputs": [
                    {
                        "item": "Uranium Waste",
                        "rate": 37.5
                    },
                    {
                        "item": "Silica",
                        "rate": 25.0
                    },
                    {
                        "item": "Nitric Acid",
                        "rate": 15.0
                    },
                    {
                        "item": "Sulfuric Acid",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Non-Fissile Uranium",
                        "rate": 50.0
                    },
                    {
                        "item": "Water",
                        "rate": 15.0
                    }
                ]
            },
            "Rocket Fuel": {
                "inputs": [
                    {
                        "item": "Turbofuel",
                        "rate": 60.0
                    },
                    {
                        "item": "Nitric Acid",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rocket Fuel",
                        "rate": 100.0
                    },
                    {
                        "item": "Compacted Coal",
                        "rate": 10.0
                    }
                ]
            },
            "Turbo Rifle Ammo": {
                "inputs": [
                    {
                        "item": "Rifle Ammo",
                        "rate": 125.0
                    },
                    {
                        "item": "Aluminum Casing",
                        "rate": 15.0
                    },
                    {
                        "item": "Turbofuel",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Turbo Rifle Ammo",
                        "rate": 250.0
                    }
                ]
            }
        }
    },
    "Particle Accelerator": {
        "powerUsage": 0,
        "recipes": {
            "Dark Matter Crystal": {
                "inputs": [
                    {
                        "item": "Diamonds",
                        "rate": 30.0
                    },
                    {
                        "item": "Dark Matter Residue",
                        "rate": 150.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Dark Matter Crystal",
                        "rate": 30.0
                    }
                ],
                "powerUsage": 500.0
            },
            "Diamonds": {
                "inputs": [
                    {
                        "item": "Coal",
                        "rate": 600.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Diamonds",
                        "rate": 30.0
                    }
                ],
                "powerUsage": 500.0
            },
            "Ficsonium": {
                "inputs": [
                    {
                        "item": "Plutonium Waste",
                        "rate": 10.0
                    },
                    {
                        "item": "Singularity Cell",
                        "rate": 10.0
                    },
                    {
                        "item": "Dark Matter Residue",
                        "rate": 200.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Ficsonium",
                        "rate": 10.0
                    }
                ],
                "powerUsage": 500.0
            },
            "Nuclear Pasta": {
                "inputs": [
                    {
                        "item": "Copper Powder",
                        "rate": 100.0
                    },
                    {
                        "item": "Pressure Conversion Cube",
                        "rate": 0.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Nuclear Pasta",
                        "rate": 0.5
                    }
                ],
                "powerUsage": 500.0
            },
            "Plutonium Pellet": {
                "inputs": [
                    {
                        "item": "Non-Fissile Uranium",
                        "rate": 100.0
                    },
                    {
                        "item": "Uranium Waste",
                        "rate": 25.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Plutonium Pellet",
                        "rate": 30.0
                    }
                ],
                "powerUsage": 500.0
            }
        }
    },
    "Manufacturer": {
        "powerUsage": 55.0,
        "recipes": {
            "Adaptive Control Unit": {
                "inputs": [
                    {
                        "item": "Automated Wiring",
                        "rate": 5.0
                    },
                    {
                        "item": "Circuit Board",
                        "rate": 5.0
                    },
                    {
                        "item": "Heavy Modular Frame",
                        "rate": 1.0
                    },
                    {
                        "item": "Computer",
                        "rate": 2.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Adaptive Control Unit",
                        "rate": 1.0
                    }
                ]
            },
            "Ballistic Warp Drive": {
                "inputs": [
                    {
                        "item": "Thermal Propulsion Rocket",
                        "rate": 1.0
                    },
                    {
                        "item": "Singularity Cell",
                        "rate": 5.0
                    },
                    {
                        "item": "Superposition Oscillator",
                        "rate": 2.0
                    },
                    {
                        "item": "Dark Matter Crystal",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Ballistic Warp Drive",
                        "rate": 1.0
                    }
                ]
            },
            "Computer": {
                "inputs": [
                    {
                        "item": "Circuit Board",
                        "rate": 10.0
                    },
                    {
                        "item": "Cable",
                        "rate": 20.0
                    },
                    {
                        "item": "Plastic",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Computer",
                        "rate": 2.5
                    }
                ]
            },
            "Crystal Oscillator": {
                "inputs": [
                    {
                        "item": "Quartz Crystal",
                        "rate": 18.0
                    },
                    {
                        "item": "Cable",
                        "rate": 14.0
                    },
                    {
                        "item": "Reinforced Iron Plate",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Crystal Oscillator",
                        "rate": 1.0
                    }
                ]
            },
            "Explosive Rebar": {
                "inputs": [
                    {
                        "item": "Iron Rebar",
                        "rate": 10.0
                    },
                    {
                        "item": "Smokeless Powder",
                        "rate": 10.0
                    },
                    {
                        "item": "Steel Pipe",
                        "rate": 10.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Explosive Rebar",
                        "rate": 5.0
                    }
                ]
            },
            "Gas Filter": {
                "inputs": [
                    {
                        "item": "Fabric",
                        "rate": 15.0
                    },
                    {
                        "item": "Coal",
                        "rate": 30.0
                    },
                    {
                        "item": "Iron Plate",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Gas Filter",
                        "rate": 7.5
                    }
                ]
            },
            "Heavy Modular Frame": {
                "inputs": [
                    {
                        "item": "Modular Frame",
                        "rate": 10.0
                    },
                    {
                        "item": "Steel Pipe",
                        "rate": 40.0
                    },
                    {
                        "item": "Encased Industrial Beam",
                        "rate": 10.0
                    },
                    {
                        "item": "Screws",
                        "rate": 240.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Heavy Modular Frame",
                        "rate": 2.0
                    }
                ]
            },
            "High-Speed Connector": {
                "inputs": [
                    {
                        "item": "Quickwire",
                        "rate": 210.0
                    },
                    {
                        "item": "Cable",
                        "rate": 37.5
                    },
                    {
                        "item": "Circuit Board",
                        "rate": 3.75
                    }
                ],
                "outputs": [
                    {
                        "item": "High-Speed Connector",
                        "rate": 3.75
                    }
                ]
            },
            "Iodine-Infused Filter": {
                "inputs": [
                    {
                        "item": "Gas Filter",
                        "rate": 3.75
                    },
                    {
                        "item": "Quickwire",
                        "rate": 30.0
                    },
                    {
                        "item": "Aluminum Casing",
                        "rate": 3.75
                    }
                ],
                "outputs": [
                    {
                        "item": "Iodine-Infused Filter",
                        "rate": 3.75
                    }
                ]
            },
            "Modular Engine": {
                "inputs": [
                    {
                        "item": "Motor",
                        "rate": 2.0
                    },
                    {
                        "item": "Rubber",
                        "rate": 15.0
                    },
                    {
                        "item": "Smart Plating",
                        "rate": 2.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Modular Engine",
                        "rate": 1.0
                    }
                ]
            },
            "Nuke Nobelisk": {
                "inputs": [
                    {
                        "item": "Nobelisk",
                        "rate": 2.5
                    },
                    {
                        "item": "Encased Uranium Cell",
                        "rate": 10.0
                    },
                    {
                        "item": "Smokeless Powder",
                        "rate": 5.0
                    },
                    {
                        "item": "AI Limiter",
                        "rate": 3.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Nuke Nobelisk",
                        "rate": 0.5
                    }
                ]
            },
            "Plutonium Fuel Rod": {
                "inputs": [
                    {
                        "item": "Encased Plutonium Cell",
                        "rate": 7.5
                    },
                    {
                        "item": "Steel Beam",
                        "rate": 4.5
                    },
                    {
                        "item": "Electromagnetic Control Rod",
                        "rate": 1.5
                    },
                    {
                        "item": "Heat Sink",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Plutonium Fuel Rod",
                        "rate": 0.25
                    }
                ]
            },
            "Radio Control Unit": {
                "inputs": [
                    {
                        "item": "Aluminum Casing",
                        "rate": 40.0
                    },
                    {
                        "item": "Crystal Oscillator",
                        "rate": 1.25
                    },
                    {
                        "item": "Computer",
                        "rate": 2.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Radio Control Unit",
                        "rate": 2.5
                    }
                ]
            },
            "SAM Fluctuator": {
                "inputs": [
                    {
                        "item": "Reanimated SAM",
                        "rate": 60.0
                    },
                    {
                        "item": "Wire",
                        "rate": 50.0
                    },
                    {
                        "item": "Steel Pipe",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "SAM Fluctuator",
                        "rate": 10.0
                    }
                ]
            },
            "Singularity Cell": {
                "inputs": [
                    {
                        "item": "Nuclear Pasta",
                        "rate": 1.0
                    },
                    {
                        "item": "Dark Matter Crystal",
                        "rate": 20.0
                    },
                    {
                        "item": "Iron Plate",
                        "rate": 100.0
                    },
                    {
                        "item": "Concrete",
                        "rate": 200.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Singularity Cell",
                        "rate": 10.0
                    }
                ]
            },
            "Supercomputer": {
                "inputs": [
                    {
                        "item": "Computer",
                        "rate": 7.5
                    },
                    {
                        "item": "AI Limiter",
                        "rate": 3.75
                    },
                    {
                        "item": "High-Speed Connector",
                        "rate": 5.625
                    },
                    {
                        "item": "Plastic",
                        "rate": 52.5
                    }
                ],
                "outputs": [
                    {
                        "item": "Supercomputer",
                        "rate": 1.875
                    }
                ]
            },
            "Thermal Propulsion Rocket": {
                "inputs": [
                    {
                        "item": "Modular Engine",
                        "rate": 2.5
                    },
                    {
                        "item": "Turbo Motor",
                        "rate": 1.0
                    },
                    {
                        "item": "Cooling System",
                        "rate": 3.0
                    },
                    {
                        "item": "Fused Modular Frame",
                        "rate": 1.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Thermal Propulsion Rocket",
                        "rate": 1.0
                    }
                ]
            },
            "Turbo Motor": {
                "inputs": [
                    {
                        "item": "Cooling System",
                        "rate": 7.5
                    },
                    {
                        "item": "Radio Control Unit",
                        "rate": 3.75
                    },
                    {
                        "item": "Motor",
                        "rate": 7.5
                    },
                    {
                        "item": "Rubber",
                        "rate": 45.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Turbo Motor",
                        "rate": 1.875
                    }
                ]
            },
            "Turbo Rifle Ammo": {
                "inputs": [
                    {
                        "item": "Rifle Ammo",
                        "rate": 125.0
                    },
                    {
                        "item": "Aluminum Casing",
                        "rate": 15.0
                    },
                    {
                        "item": "Packaged Turbofuel",
                        "rate": 15.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Turbo Rifle Ammo",
                        "rate": 250.0
                    }
                ]
            },
            "Uranium Fuel Rod": {
                "inputs": [
                    {
                        "item": "Encased Uranium Cell",
                        "rate": 20.0
                    },
                    {
                        "item": "Encased Industrial Beam",
                        "rate": 1.2
                    },
                    {
                        "item": "Electromagnetic Control Rod",
                        "rate": 2.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Uranium Fuel Rod",
                        "rate": 0.4
                    }
                ]
            }
        }
    },
    "Packager": {
        "powerUsage": 10.0,
        "recipes": {
            "Packaged Alumina Solution": {
                "inputs": [
                    {
                        "item": "Alumina Solution",
                        "rate": 120.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Alumina Solution",
                        "rate": 120.0
                    }
                ]
            },
            "Packaged Fuel": {
                "inputs": [
                    {
                        "item": "Fuel",
                        "rate": 40.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Fuel",
                        "rate": 40.0
                    }
                ]
            },
            "Packaged Heavy Oil Residue": {
                "inputs": [
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 30.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Heavy Oil Residue",
                        "rate": 30.0
                    }
                ]
            },
            "Packaged Ionized Fuel": {
                "inputs": [
                    {
                        "item": "Ionized Fuel",
                        "rate": 80.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Ionized Fuel",
                        "rate": 40.0
                    }
                ]
            },
            "Packaged Liquid Biofuel": {
                "inputs": [
                    {
                        "item": "Liquid Biofuel",
                        "rate": 40.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Liquid Biofuel",
                        "rate": 40.0
                    }
                ]
            },
            "Packaged Nitric Acid": {
                "inputs": [
                    {
                        "item": "Nitric Acid",
                        "rate": 30.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Nitric Acid",
                        "rate": 30.0
                    }
                ]
            },
            "Packaged Nitrogen Gas": {
                "inputs": [
                    {
                        "item": "Nitrogen Gas",
                        "rate": 240.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Nitrogen Gas",
                        "rate": 60.0
                    }
                ]
            },
            "Packaged Oil": {
                "inputs": [
                    {
                        "item": "Crude Oil",
                        "rate": 30.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 30.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Oil",
                        "rate": 30.0
                    }
                ]
            },
            "Packaged Rocket Fuel": {
                "inputs": [
                    {
                        "item": "Rocket Fuel",
                        "rate": 120.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Rocket Fuel",
                        "rate": 60.0
                    }
                ]
            },
            "Packaged Sulfuric Acid": {
                "inputs": [
                    {
                        "item": "Sulfuric Acid",
                        "rate": 40.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Sulfuric Acid",
                        "rate": 40.0
                    }
                ]
            },
            "Packaged Turbofuel": {
                "inputs": [
                    {
                        "item": "Turbofuel",
                        "rate": 20.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Turbofuel",
                        "rate": 20.0
                    }
                ]
            },
            "Packaged Water": {
                "inputs": [
                    {
                        "item": "Water",
                        "rate": 60.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Packaged Water",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Alumina Solution": {
                "inputs": [
                    {
                        "item": "Packaged Alumina Solution",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Alumina Solution",
                        "rate": 120.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 120.0
                    }
                ]
            },
            "Unpackage Fuel": {
                "inputs": [
                    {
                        "item": "Packaged Fuel",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Fuel",
                        "rate": 60.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Heavy Oil Residue": {
                "inputs": [
                    {
                        "item": "Packaged Heavy Oil Residue",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Heavy Oil Residue",
                        "rate": 20.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 20.0
                    }
                ]
            },
            "Unpackage Ionized Fuel": {
                "inputs": [
                    {
                        "item": "Packaged Ionized Fuel",
                        "rate": 40.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Ionized Fuel",
                        "rate": 80.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 40.0
                    }
                ]
            },
            "Unpackage Liquid Biofuel": {
                "inputs": [
                    {
                        "item": "Packaged Liquid Biofuel",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Liquid Biofuel",
                        "rate": 60.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Nitric Acid": {
                "inputs": [
                    {
                        "item": "Packaged Nitric Acid",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Nitric Acid",
                        "rate": 20.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 20.0
                    }
                ]
            },
            "Unpackage Nitrogen Gas": {
                "inputs": [
                    {
                        "item": "Packaged Nitrogen Gas",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Nitrogen Gas",
                        "rate": 240.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Oil": {
                "inputs": [
                    {
                        "item": "Packaged Oil",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Crude Oil",
                        "rate": 60.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Rocket Fuel": {
                "inputs": [
                    {
                        "item": "Packaged Rocket Fuel",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Rocket Fuel",
                        "rate": 120.0
                    },
                    {
                        "item": "Empty Fluid Tank",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Sulfuric Acid": {
                "inputs": [
                    {
                        "item": "Packaged Sulfuric Acid",
                        "rate": 60.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Sulfuric Acid",
                        "rate": 60.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 60.0
                    }
                ]
            },
            "Unpackage Turbofuel": {
                "inputs": [
                    {
                        "item": "Packaged Turbofuel",
                        "rate": 20.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Turbofuel",
                        "rate": 20.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 20.0
                    }
                ]
            },
            "Unpackage Water": {
                "inputs": [
                    {
                        "item": "Packaged Water",
                        "rate": 120.0
                    }
                ],
                "outputs": [
                    {
                        "item": "Water",
                        "rate": 120.0
                    },
                    {
                        "item": "Empty Canister",
                        "rate": 120.0
                    }
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
            },
            "Limestone": {
                "inputs": [],
                "outputs": [{ "item": "Limestone", "rate": 60 }]
            },
            "Coal": {
                "inputs": [],
                "outputs": [{ "item": "Coal", "rate": 60 }]
            },
            "Raw Quartz": {
                "inputs": [],
                "outputs": [{ "item": "Raw Quartz", "rate": 60 }]
            },
            "Sulfur": {
                "inputs": [],
                "outputs": [{ "item": "Sulfur", "rate": 60 }]
            },
            "Bauxite": {
                "inputs": [],
                "outputs": [{ "item": "Bauxite", "rate": 60 }]
            },
            "Uranium": {
                "inputs": [],
                "outputs": [{ "item": "Uranium", "rate": 60 }]
            },
            "SAM Ore": {
                "inputs": [],
                "outputs": [{ "item": "SAM Ore", "rate": 60 }]
            }
        }
    },
    "Miner Mk.2": {
        "powerUsage": 12, // MW
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
            },
            "Limestone": {
                "inputs": [],
                "outputs": [{ "item": "Limestone", "rate": 120 }]
            },
            "Coal": {
                "inputs": [],
                "outputs": [{ "item": "Coal", "rate": 120 }]
            },
            "Raw Quartz": {
                "inputs": [],
                "outputs": [{ "item": "Raw Quartz", "rate": 120 }]
            },
            "Sulfur": {
                "inputs": [],
                "outputs": [{ "item": "Sulfur", "rate": 120 }]
            },
            "Bauxite": {
                "inputs": [],
                "outputs": [{ "item": "Bauxite", "rate": 120 }]
            },
            "Uranium": {
                "inputs": [],
                "outputs": [{ "item": "Uranium", "rate": 120 }]
            },
            "SAM Ore": {
                "inputs": [],
                "outputs": [{ "item": "SAM Ore", "rate": 120 }]
            }
        }
    },
    "Miner Mk.3": {
        "powerUsage": 30, // MW
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
            },
            "Limestone": {
                "inputs": [],
                "outputs": [{ "item": "Limestone", "rate": 240 }]
            },
            "Coal": {
                "inputs": [],
                "outputs": [{ "item": "Coal", "rate": 240 }]
            },
            "Raw Quartz": {
                "inputs": [],
                "outputs": [{ "item": "Raw Quartz", "rate": 240 }]
            },
            "Sulfur": {
                "inputs": [],
                "outputs": [{ "item": "Sulfur", "rate": 240 }]
            },
            "Bauxite": {
                "inputs": [],
                "outputs": [{ "item": "Bauxite", "rate": 240 }]
            },
            "Uranium": {
                "inputs": [],
                "outputs": [{ "item": "Uranium", "rate": 240 }]
            },
            "SAM Ore": {
                "inputs": [],
                "outputs": [{ "item": "SAM Ore", "rate": 240 }]
            }
        }    }
};