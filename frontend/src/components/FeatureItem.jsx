function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString();
}

function FeatureItem({ feature, onEdit, onDelete, onStatusChange, isDeleting }) {
  return (
    <article className="feature-item card">
      <div className="feature-item-header">
        <div>
          <h3>{feature.title}</h3>
          <p className="feature-date">Created: {formatDate(feature.created_at)}</p>
        </div>
        <span className={`priority-badge priority-${feature.priority.toLowerCase()}`}>
          {feature.priority}
        </span>
      </div>

      <p className="feature-description">
        {feature.description || 'No description provided.'}
      </p>

      <div className="feature-item-footer">
        <div className="status-group">
          <label htmlFor={`status-${feature.id}`}>Status</label>
          <select
            id={`status-${feature.id}`}
            value={feature.status}
            onChange={(event) => onStatusChange(feature.id, event.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="feature-actions">
          <button type="button" className="secondary-button" onClick={() => onEdit(feature)}>
            Edit
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onDelete(feature.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default FeatureItem;
