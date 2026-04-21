const express = require('express');
const featureController = require('../controllers/featureController');
const {
  validateFeaturePayload,
  validateStatusPayload
} = require('../middlewares/validateFeature');
const { validateFeatureId } = require('../middlewares/validateId');

const router = express.Router();

router.get('/', featureController.getAllFeatures);
router.get('/:id', validateFeatureId, featureController.getFeatureById);
router.post('/', validateFeaturePayload, featureController.createFeature);
router.put('/:id', validateFeatureId, validateFeaturePayload, featureController.updateFeature);
router.patch('/:id/status', validateFeatureId, validateStatusPayload, featureController.updateFeatureStatus);
router.delete('/:id', validateFeatureId, featureController.deleteFeature);

module.exports = router;
