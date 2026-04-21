const { sanitizeString } = require('../utils/sanitize');

const allowedPriorities = ['Low', 'Medium', 'High'];
const allowedStatuses = ['Open', 'In Progress', 'Completed'];

function validateFeaturePayload(req, res, next) {
  const title = sanitizeString(req.body.title || '');
  const description = sanitizeString(req.body.description || '');
  const priority = req.body.priority || 'Medium';
  const status = req.body.status || 'Open';

  if (!title) {
    return res.status(400).json({ message: 'Title is required.' });
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: `Priority must be one of: ${allowedPriorities.join(', ')}.`
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Status must be one of: ${allowedStatuses.join(', ')}.`
    });
  }

  req.validatedFeature = {
    title,
    description,
    priority,
    status
  };

  next();
}

function validateStatusPayload(req, res, next) {
  const status = req.body.status;

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Status must be one of: ${allowedStatuses.join(', ')}.`
    });
  }

  req.validatedStatus = { status };
  next();
}

module.exports = {
  validateFeaturePayload,
  validateStatusPayload,
  allowedPriorities,
  allowedStatuses
};
