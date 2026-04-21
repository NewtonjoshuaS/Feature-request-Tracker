import { useEffect, useState } from 'react';

const initialFormState = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Open'
};

function FeatureForm({ editingFeature, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingFeature) {
      setFormData({
        title: editingFeature.title || '',
        description: editingFeature.description || '',
        priority: editingFeature.priority || 'Medium',
        status: editingFeature.status || 'Open'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingFeature]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setErrorMessage('Title is required.');
      return;
    }

    setErrorMessage('');
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });
  }

  return (
    <section className="card form-card">
      <div className="card-header">
        <h2>{editingFeature ? 'Edit Feature Request' : 'Add Feature Request'}</h2>
        {editingFeature && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="feature-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a feature title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the feature request"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : editingFeature ? 'Update Feature' : 'Create Feature'}
        </button>
      </form>
    </section>
  );
}

export default FeatureForm;
