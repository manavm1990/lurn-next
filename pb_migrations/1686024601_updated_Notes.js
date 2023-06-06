migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ku0978degktqtw2")

  collection.name = "notes"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9vqjhfmk",
    "name": "content",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qk6ro1uy",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ku0978degktqtw2")

  collection.name = "Notes"

  // remove
  collection.schema.removeField("9vqjhfmk")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
