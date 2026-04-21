const { pool } = require('../config/db');

async function getAllFeatures(status) {
  let query = 'SELECT * FROM feature_requests';
  const queryParams = [];

  if (status) {
    query += ' WHERE status = ?';
    queryParams.push(status);
  }

  query += ' ORDER BY created_at DESC';

  const [rows] = await pool.query(query, queryParams);
  return rows;
}

async function getFeatureById(featureId) {
  const [rows] = await pool.query(
    'SELECT * FROM feature_requests WHERE id = ?',
    [featureId]
  );

  return rows[0] || null;
}

async function createFeature(featureData) {
  const { title, description, priority, status } = featureData;

  const [result] = await pool.query(
    `INSERT INTO feature_requests (title, description, priority, status)
     VALUES (?, ?, ?, ?)`,
    [title, description, priority, status]
  );

  return getFeatureById(result.insertId);
}

async function updateFeature(featureId, featureData) {
  const { title, description, priority, status } = featureData;

  await pool.query(
    `UPDATE feature_requests
     SET title = ?, description = ?, priority = ?, status = ?
     WHERE id = ?`,
    [title, description, priority, status, featureId]
  );

  return getFeatureById(featureId);
}

async function updateFeatureStatus(featureId, status) {
  await pool.query(
    'UPDATE feature_requests SET status = ? WHERE id = ?',
    [status, featureId]
  );

  return getFeatureById(featureId);
}

async function deleteFeature(featureId) {
  const [result] = await pool.query(
    'DELETE FROM feature_requests WHERE id = ?',
    [featureId]
  );

  return result.affectedRows > 0;
}

module.exports = {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  updateFeatureStatus,
  deleteFeature
};
