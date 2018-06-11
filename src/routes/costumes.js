const express = require('express')
const router = express.Router()
const ctrl = require('../controller/costumes.js')

router.get('/costumes', ctrl.getAll)
router.get('/costumes/:id', ctrl.getCostume)
router.get('/costumes/:id/tags', ctrl.getTags)
router.get('/costumes/:id/tags/:tagid', ctrl.getTag)

router.post('/costumes', ctrl.addCostume)
router.post('/costumes/:id/tags', ctrl.addTag)

router.put('/costumes/:id', ctrl.updateCostume)
router.put('/costumes/:id/tags/:tagid', ctrl.updateTag)

router.delete('/costumes/:id', ctrl.deleteCostume)
router.delete('/costumes/:id/tags/:tagid', ctrl.deleteTag)

module.exports = router
