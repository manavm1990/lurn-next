migrate((db) => {
  const collection = new Collection({
    "id": "ku0978degktqtw2",
    "created": "2023-06-05 14:58:48.876Z",
    "updated": "2023-06-05 14:58:48.876Z",
    "name": "Notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qk6ro1uy",
        "name": "Text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ku0978degktqtw2");

  return dao.deleteCollection(collection);
})
