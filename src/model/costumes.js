const uuid = require('uuid/v4')
const model = require('./costumes.json')

function getAll () {
  return model
}

function getCostume (id) {
  const errors = []
  const costume = model.find(costume => costume.id === id)

  let response
  if (!costume) {
    errors.push(`Could not find costume with id: ${id}`)
    response = { errors }
  } else {
    response = costume
  }
  return response
}

function getTags (id) {
  const errors = []
  const costume = model.find(costume => costume.id === id)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id: ${id}`)
    response = { errors }
  } else {
    response = costume.tags
  }
  return response
}

function getTag (id, tagid) {
  const errors = []
  const costume = model.find(costume => costume.id === id)
  const costumeTag = costume.tags.find(tag => tag.id === tagid)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id: ${id}`)
    response = { errors }
  } else if (costumeTag.id !== tagid) {
    errors.push(`Could not find a tag with id ${tagid}`)
    response = { errors }
  } else {
    response = costumeTag
  }
  return response
}

function addCostume (name, price, desc, tags) {
  const errors = []

  let response
  if (!name || !price || !tags) {
    errors.push(`Please include the following fields: name, price, tags`)
    response = { errors }
  } else {
    const newId = uuid()
    const tagsArray = []
    for (let elem of tags) {
      const newTagId = uuid()
      tagsArray.push({"id": newTagId, "name": elem.name, "color": elem.color})
    }
    const newCostume = {"id": newId, "name": name, "price": price, "description": desc, "tags": tagsArray}
    model.push(newCostume)
    response = newCostume
  }
  return response
}

function addTag (id, name, color) {
  const errors = []
  const costume = model.find(costume => costume.id === id)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id ${id} and therefore could not add tag`)
    response = { errors }
  } else if (!name) {
    errors.push(`Please include a tag name`)
    response = { errors }
  } else {
    const newId = uuid()
    const newTag = {"id": newId, "name": name, "color": color}
    costume.tags.push(newTag)
    response = newTag
  }
  return response
}

function updateCostume (id, name, price, desc, tags) {
  const errors = []
  const costume = model.find(costume => costume.id === id)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id: ${id}`)
    response = { errors }
  } else {
    const tagsArray = []
    for (let elem of tags) {
      const newTagId = uuid()
      tagsArray.push({"id": newTagId, "name": elem.name, "color": elem.color})
    }
    costume.name = name
    costume.price = price
    costume.description = desc
    costume.tags = tagsArray
    response = costume
  }
  return response
}

function updateTag (id, tagid, name, color) {
  const errors = []
  const costume = model.find(costume => costume.id === id)
  const costumeTag = costume.tags.find(tag => tag.id === tagid)

  if (!costume) {
    errors.push(`Could not update tag, as a costume with id ${id} could not be found`)
  } else if (costumeTag.id !== tagid) {
    errors.push(`Could not find a tag with id ${tagid}`)
    response = { errors }
  } else {
    costumeTag.name = name
    costumeTag.color = color
    response = costumeTag
  }
  return response
}

function deleteCostume (id) {
  const errors = []
  const costume = model.find(costume => costume.id === id)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id: ${id}`)
    response = { errors }
  } else {
    const index = model.indexOf(costume)
    model.splice(index, 1)
    response = `${costume.name} with id ${costume.id} deleted from database.`
  }
  return response
}

function deleteTag (id, tagid) {
  const errors = []
  const costume = model.find(costume => costume.id === id)
  const costumeTag = costume.tags.find(tag => tag.id === tagid)

  let response
  if (!costume) {
    errors.push(`Could not find a costume with id: ${id}`)
    response = { errors }
  } else if (!costumeTag) {
    errors.push(`Could not find a tag with id ${tagid}`)
    response = { errors }
  } else {
    const index = costume.tags.indexOf(costumeTag)
    costume.tags.splice(index, 1)
    response = `Tag with id ${tagid} deleted from costume: ${costume.name}`
  }
  return response
}

module.exports = {
  getAll,
  getCostume,
  getTags,
  getTag,
  addCostume,
  addTag,
  updateCostume,
  updateTag,
  deleteCostume,
  deleteTag
}
