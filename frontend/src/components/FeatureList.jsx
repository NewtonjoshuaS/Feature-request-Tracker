import FeatureItem from './FeatureItem';

function FeatureList({ features, onEdit, onDelete, onStatusChange, deletingFeatureId }) {
  if (!features.length) {
    return (
      <section className="card empty-state">
        <h2>No feature requests found</h2>
        <p>Add a new request or change the status filter.</p>
      </section>
    );
  }

  return (
    <section className="feature-list">
      {features.map((feature) => (
        <FeatureItem
          key={feature.id}
          feature={feature}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          isDeleting={deletingFeatureId === feature.id}
        />
      ))}
    </section>
  );
}

export default FeatureList;
