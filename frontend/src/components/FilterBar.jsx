const statusOptions = ['All', 'Open', 'In Progress', 'Completed'];

function FilterBar({ selectedStatus, onStatusChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="statusFilter">Filter by status</label>
      <select
        id="statusFilter"
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {statusOptions.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
