import { useEffect, useState } from 'react';
import FeatureForm from '../components/FeatureForm';
import FeatureList from '../components/FeatureList';
import FilterBar from '../components/FilterBar';
import {
  createFeature,
  deleteFeature,
  getFeatures,
  updateFeature,
  updateFeatureStatus
} from '../services/featureService';

function HomePage() {
  const [features, setFeatures] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [editingFeature, setEditingFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingFeatureId, setDeletingFeatureId] = useState(null);
  const [serverMessage, setServerMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFeatureRequests(selectedStatus);
  }, [selectedStatus]);

  async function fetchFeatureRequests(status) {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await getFeatures(status);
      setFeatures(data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to load feature requests.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      setServerMessage('');

      if (editingFeature) {
        const response = await updateFeature(editingFeature.id, formData);
        setServerMessage(response.message);
        setEditingFeature(null);
      } else {
        const response = await createFeature(formData);
        setServerMessage(response.message);
      }

      await fetchFeatureRequests(selectedStatus);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to save feature request.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(featureId) {
    const isConfirmed = window.confirm('Are you sure you want to delete this feature request?');

    if (!isConfirmed) {
      return;
    }

    try {
      setDeletingFeatureId(featureId);
      setErrorMessage('');
      const response = await deleteFeature(featureId);
      setServerMessage(response.message);

      if (editingFeature?.id === featureId) {
        setEditingFeature(null);
      }

      await fetchFeatureRequests(selectedStatus);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to delete feature request.'
      );
    } finally {
      setDeletingFeatureId(null);
    }
  }

  async function handleStatusChange(featureId, status) {
    try {
      setErrorMessage('');
      const response = await updateFeatureStatus(featureId, status);
      setServerMessage(response.message);
      await fetchFeatureRequests(selectedStatus);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to update feature status.'
      );
    }
  }

  function handleEdit(feature) {
    setEditingFeature(feature);
    setServerMessage('');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingFeature(null);
    setServerMessage('');
    setErrorMessage('');
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Tanzanite Skills Academy Technical Assessment</p>
          <h1>Feature Request Tracker</h1>
          <p className="page-subtitle">
            Track product ideas, prioritize requests, and manage progress from one clean dashboard.
          </p>
        </div>
      </header>

      {serverMessage && <div className="alert success-alert">{serverMessage}</div>}
      {errorMessage && <div className="alert error-alert">{errorMessage}</div>}

      <div className="layout-grid">
        <div>
          <FeatureForm
            editingFeature={editingFeature}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div>
          <div className="list-header">
            <h2>Feature Requests</h2>
            <FilterBar
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>

          {loading ? (
            <section className="card empty-state">
              <p>Loading feature requests...</p>
            </section>
          ) : (
            <FeatureList
              features={features}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              deletingFeatureId={deletingFeatureId}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
