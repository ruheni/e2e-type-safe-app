module.exports = {
    "scalars": [
        0,
        2,
        3,
        6,
        7
    ],
    "types": {
        "DateTime": {},
        "Item": {
            "createdAt": [
                0
            ],
            "description": [
                2
            ],
            "id": [
                3
            ],
            "imageUrl": [
                2
            ],
            "title": [
                2
            ],
            "updatedAt": [
                0
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "String": {},
        "ID": {},
        "Mutation": {
            "createItem": [
                1,
                {
                    "description": [
                        2
                    ],
                    "imageUrl": [
                        2
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2
                    ]
                }
            ],
            "deleteItem": [
                1,
                {
                    "id": [
                        3,
                        "ID!"
                    ]
                }
            ],
            "updateItem": [
                1,
                {
                    "description": [
                        2
                    ],
                    "id": [
                        3,
                        "ID!"
                    ],
                    "imageUrl": [
                        2
                    ],
                    "title": [
                        2
                    ],
                    "url": [
                        2
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "getItems": [
                1,
                {
                    "sortBy": [
                        6
                    ]
                }
            ],
            "getOneItem": [
                1,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "SortOrder": {},
        "Boolean": {}
    }
}