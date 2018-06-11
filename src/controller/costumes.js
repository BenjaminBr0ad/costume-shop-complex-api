const model = require('../model/costumes.js')

function getAll (req, res, next) {
  const costumes = model.getAll()
  res.status(200).json({ costumes })
}

function getCostume (req, res, next) {
  const costume = model.getCostume(req.params.id)

  if (costume.errors) {
    return next({
      status: 404,
      message: `Could not find costume with id: ${req.params.id}`,
      error: costume.errors
    })
  }
  res.status(200).json({ costume })
}

function getTags (req, res, next) {
  const tags = model.getTags(req.params.id)

  if (tags.erros) {
    return next({
      status: 404,
      message: `Could not find tags for costume with id: ${req.params.id}`,
      error: tags.errors
    })
  }
  res.status(200).json({ tags })
}

function getTag (req, res, next) {
  const tag = model.getTag(req.params.id, req.params.tagid)

  if(tag.errors) {
    return next({
      status: 404,
      message: `Could not find tag for costume id ${req.params.id} with tag_id ${req.params.tagid}`,
      error: tag.errors
    })
  }
  res.status(200).json({ tag })
}

function addCostume (req, res, next) {
  const newCostume = model.addCostume(req.body.name, req.body.price, req.body.description, req.body.tags)

  if (newCostume.errors) {
    return next({
      status: 400,
      message: `Could not create new costume`,
      error: newCostume.errors
    })
  }
  res.status(201).json({ newCostume })
}

function addTag (req, res, next) {
  const newTag = model.addTag(req.params.id, req.body.name, req.body.color)

  if (newTag.errors) {
    return next({
      status: 400,
      message: `Could not create new costume`,
      error: newTag.errors
    })
  }
  res.status(201).json({ newTag })
}

function updateCostume (req, res, next) {
  const updatedCostume = model.updateCostume(req.params.id, req.body.name, req.body.price, req.body.description, req.body.tags)

  if (updatedCostume.errors) {
    return next({
      status: 400,
      message: `Could not update costume`,
      error: updatedCostume.errors
    })
  }
  res.status(200).json({ updatedCostume })
}

function updateTag (req, res, next) {
  const updatedTag = model.updateTag(req.params.id, req.params.tagid, req.body.name, req.body.color)

  if (updatedTag.errors) {
    return next({
      status: 400,
      message: `Could not update tag`,
      error: updatedTag.errors
    })
  }
  res.status(200).json({ updatedTag })
}

function deleteCostume (req, res, next) {
  const deletedCostume = model.deleteCostume(req.params.id)

  if (deletedCostume.errors) {
    return next({
      status: 404,
      message: `Could not delete costume`,
      error: deletedCostume.errors
    })
  }
  res.status(200).json({ deletedCostume })
}

function deleteTag (req, res, next) {
  const deletedTag = model.deleteTag(req.params.id, req.params.tagid)

  if (deletedTag.errors) {
    return next({
      status: 404,
      message: `Could not delete tag with id: ${req.params.tagid}`,
      error: deletedTag.errors
    })
  }
  res.status(200).json({ deletedTag })
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
