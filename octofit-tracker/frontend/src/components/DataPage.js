import React, { useMemo, useState } from 'react';

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value === null || value === undefined || value === '') {
    return 'Not available';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function DataPage({ title, description, items, error, apiUrl, columns, itemLabel }) {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const searchTarget = columns
        .map((column) => {
          const value = column.accessor ? column.accessor(item) : item[column.key];
          return formatValue(value).toLowerCase();
        })
        .join(' ');

      return searchTarget.includes(normalizedQuery);
    });
  }, [columns, items, query]);

  return (
    <section className="octo-page container py-4 py-lg-5">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-xl-4">
          <div className="card octo-panel shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <span className="badge text-bg-primary mb-3">{itemLabel}</span>
              <h1 className="display-6 fw-semibold mb-3">{title}</h1>
              <p className="text-secondary mb-4">{description}</p>

              <form className="row g-3" onSubmit={(event) => event.preventDefault()}>
                <div className="col-12">
                  <label className="form-label fw-semibold" htmlFor={`${title}-search`}>
                    Search {itemLabel.toLowerCase()}
                  </label>
                  <input
                    id={`${title}-search`}
                    type="search"
                    className="form-control"
                    placeholder={`Filter ${itemLabel.toLowerCase()}...`}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => setQuery('')}
                  >
                    Reset search
                  </button>
                </div>
                <div className="col-sm-6">
                  <a
                    className="btn btn-outline-secondary w-100"
                    href={apiUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open API
                  </a>
                </div>
              </form>

              <div className="row g-3 mt-2">
                <div className="col-sm-6">
                  <div className="card octo-stat-card h-100 border-0">
                    <div className="card-body">
                      <p className="text-uppercase small fw-semibold text-secondary mb-2">Loaded</p>
                      <h2 className="h3 mb-0">{items.length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card octo-stat-card h-100 border-0">
                    <div className="card-body">
                      <p className="text-uppercase small fw-semibold text-secondary mb-2">Showing</p>
                      <h2 className="h3 mb-0">{filteredItems.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card octo-panel shadow-sm border-0">
            <div className="card-header bg-white border-0 p-4 pb-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h2 className="h3 mb-1">{title} table</h2>
                <p className="text-secondary mb-0">Consistent Bootstrap table layout across the tracker.</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setSelectedItem(filteredItems[0] || null)}
                disabled={filteredItems.length === 0}
              >
                Preview first row
              </button>
            </div>

            <div className="card-body p-4">
              {error && <div className="alert alert-danger mb-4">{error}</div>}

              {filteredItems.length === 0 ? (
                <div className="alert alert-light border mb-0">
                  No {itemLabel.toLowerCase()} matched the current search.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle octo-table mb-0">
                    <thead className="table-light">
                      <tr>
                        {columns.map((column) => (
                          <th key={column.key} scope="col">
                            {column.label}
                          </th>
                        ))}
                        <th scope="col" className="text-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, index) => (
                        <tr key={item._id || `${title}-${index}`}>
                          {columns.map((column) => {
                            const value = column.accessor ? column.accessor(item, index) : item[column.key];

                            return (
                              <td key={column.key}>
                                {column.render ? column.render(item, index) : formatValue(value)}
                              </td>
                            );
                          })}
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => setSelectedItem(item)}
                            >
                              View details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <p className="text-uppercase small fw-semibold text-secondary mb-1">{itemLabel} details</p>
                    <h3 className="modal-title h4 mb-0">{title} record</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body pt-3">
                  <div className="row g-3">
                    {columns.map((column) => {
                      const value = column.accessor ? column.accessor(selectedItem) : selectedItem[column.key];

                      return (
                        <div className="col-12 col-md-6" key={column.key}>
                          <div className="card h-100 border-0 octo-detail-card">
                            <div className="card-body">
                              <p className="text-uppercase small fw-semibold text-secondary mb-2">{column.label}</p>
                              <div className="mb-0 text-dark detail-value">{formatValue(value)}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <a
                    className="btn btn-link text-decoration-none"
                    href={apiUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Browse endpoint
                  </a>
                  <button type="button" className="btn btn-primary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default DataPage;