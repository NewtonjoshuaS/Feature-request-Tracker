const featureModel = require('../models/featureModel');
const { allowedStatuses } = require('../middlewares/validateFeature');

async function getAllFeatures(req, res) {
  try {
    const status = req.query.status;

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status filter must be one of: ${allowedStatuses.join(', ')}.`
      });
    }

    const features = await featureModel.getAllFeatures(status);
    return res.status(200).json(features);
  } catch (error) {
    console.error('Error fetching features:', error.message);
    return res.status(500).json({ message: 'Failed to fetch feature requests.' });
  }
}

async function getFeatureById(req, res) {
  try {
    const featureId = req.featureId
    const feature = await featureModel.getFeatureById(featureId);

    if (!feature) {
      return res.status(404).json({ message: 'Feature request not found.' });
    }

    return res.status(200).json(feature);
  } catch (error) {
    console.error('Error fetching feature:', error.message);
    return res.status(500).json({ message: 'Failed to fetch feature request.' });
  }
}

async function createFeature(req, res) {
  try {
    const newFeature = await featureModel.createFeature(req.validatedFeature);
    return res.status(201).json({
      message: 'Feature request created successfully.',
      feature: newFeature
    });
  } catch (error) {
    console.error('Error creating feature:', error.message);
    return res.status(500).json({ message: 'Failed to create feature request.' });
  }
}

async function updateFeature(req, res) {
  try {
    const featureId = req.featureId
    const existingFeature = await featureModel.getFeatureById(featureId);

    if (!existingFeature) {
      return res.status(404).json({ message: 'Feature request not found.' });
    }

    const updatedFeature = await featureModel.updateFeature(
      featureId,
      req.validatedFeature
    );

    return res.status(200).json({
      message: 'Feature request updated successfully.',
      feature: updatedFeature
    });
  } catch (error) {
    console.error('Error updating feature:', error.message);
    return res.status(500).json({ message: 'Failed to update feature request.' });
  }
}

async function updateFeatureStatus(req, res) {
  try {
    const featureId = req.featureId
    const existingFeature = await featureModel.getFeatureById(featureId);

    if (!existingFeature) {
      return res.status(404).json({ message: 'Feature request not found.' });
    }

    const updatedFeature = await featureModel.updateFeatureStatus(
      featureId,
      req.validatedStatus.status
    );

    return res.status(200).json({
      message: 'Feature status updated successfully.',
      feature: updatedFeature
    });
  } catch (error) {
    console.error('Error updating feature status:', error.message);
    return res.status(500).json({ message: 'Failed to update feature status.' });
  }
}

async function deleteFeature(req, res) {
  try {
    const featureId = req.featureId
    const existingFeature = await featureModel.getFeatureById(featureId);

    if (!existingFeature) {
      return res.status(404).json({ message: 'Feature request not found.' });
    }

    await featureModel.deleteFeature(featureId);
    return res.status(200).json({ message: 'Feature request deleted successfully.' });
  } catch (error) {
    console.error('Error deleting feature:', error.message);
    return res.status(500).json({ message: 'Failed to delete feature request.' });
  }
}

module.exports = {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  updateFeatureStatus,
  deleteFeature
};
