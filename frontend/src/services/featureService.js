import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export async function getFeatures(status = 'All') {
  const endpoint = status === 'All' ? '/features' : `/features?status=${encodeURIComponent(status)}`;
  const response = await apiClient.get(endpoint);
  return response.data;
}

export async function createFeature(featureData) {
  const response = await apiClient.post('/features', featureData);
  return response.data;
}

export async function updateFeature(featureId, featureData) {
  const response = await apiClient.put(`/features/${featureId}`, featureData);
  return response.data;
}

export async function deleteFeature(featureId) {
  const response = await apiClient.delete(`/features/${featureId}`);
  return response.data;
}

export async function updateFeatureStatus(featureId, status) {
  const response = await apiClient.patch(`/features/${featureId}/status`, { status });
  return response.data;
}
