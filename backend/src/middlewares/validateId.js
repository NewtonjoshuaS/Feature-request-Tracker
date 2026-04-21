function validateFeatureId(req, res, next) {
  const featureId = Number(req.params.id);

  if (!Number.isInteger(featureId) || featureId <= 0) {
    return res.status(400).json({ message: 'Feature ID must be a positive integer.' });
  }

  req.featureId = featureId;
  next();
}

module.exports = {
  validateFeatureId
};
