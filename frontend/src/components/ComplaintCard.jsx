import React from 'react';
import { Clock, Tag, MessageSquare, Trash2, Edit3, Shield } from 'lucide-react';

const ComplaintCard = ({ complaint, onEdit, onDelete, isAdmin, onStatusUpdate }) => {
  const { id, title, description, status, category, date } = complaint;

  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'pending': return 'badge-pending';
      case 'in progress': return 'badge-progress';
      case 'resolved': return 'badge-resolved';
      case 'closed': return 'badge-closed';
      default: return 'badge-progress';
    }
  };

  return (
    <div className="card-saas animated">
      <div className="card-top-saas">
        <span className={`badge ${getStatusClass()}`}>{status}</span>
        <span className="card-timestamp">
          <Clock size={12} /> {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div className="card-content-saas">
        <h3 className="card-heading-saas">{title}</h3>
        <p className="card-snippet-saas">{description}</p>

        <div className="card-tags-saas">
          <span className="tag-saas category-item">
            <Tag size={12} /> {category}
          </span>
          <span className="tag-saas comment-item">
            <MessageSquare size={12} /> 2 Comments
          </span>
        </div>
      </div>

      <div className="card-actions-saas">
        {isAdmin ? (
          <div className="admin-footer-saas">
            <div className="admin-status-control">
              <Shield size={14} className="shield-icon" />
              <select
                className="saas-select"
                value={status}
                onChange={(e) => onStatusUpdate(id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <button className="icon-action-danger" onClick={() => onDelete(id)} title="Delete permanently">
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <div className="user-footer-saas">
            <button className="saas-btn-action saas-btn-edit" onClick={() => onEdit(complaint)}>
              <Edit3 size={14} /> Update
            </button>
            <button className="saas-btn-action saas-btn-delete" onClick={() => onDelete(id)}>
              <Trash2 size={14} /> Remove
            </button>
          </div>
        )}
      </div>

      <style>{`
                .card-saas {
                    background: var(--bg-card);
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-lg);
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: var(--transition);
                    box-shadow: var(--shadow-sm);
                }
                .card-saas:hover {
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                }
                
                .card-top-saas {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .card-timestamp {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: var(--text-light);
                }

                .card-heading-saas {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .card-snippet-saas {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .card-tags-saas {
                    display: flex;
                    gap: 0.75rem;
                }
                .tag-saas {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    font-size: 0.6875rem;
                    font-weight: 700;
                    padding: 0.25rem 0.5rem;
                    border-radius: var(--radius-sm);
                }
                .category-item {
                    color: var(--primary);
                    background: var(--primary-light);
                }
                .comment-item {
                    color: var(--secondary);
                    background: var(--border-subtle);
                }

                .card-actions-saas {
                    margin-top: 0.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border-subtle);
                }

                .admin-footer-saas, .user-footer-saas {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.75rem;
                }

                .admin-status-control {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .shield-icon {
                    position: absolute;
                    left: 0.75rem;
                    color: var(--primary);
                    pointer-events: none;
                }
                .saas-select {
                    width: 100%;
                    padding: 0.5rem 0.75rem 0.5rem 2.25rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-md);
                    outline: none;
                    background: white;
                    color: var(--text-main);
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 0.75rem;
                }
                .saas-select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }

                .saas-btn-action {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.375rem;
                    padding: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border-radius: var(--radius-md);
                    transition: var(--transition);
                }
                .saas-btn-edit {
                    background: var(--bg-app);
                    color: var(--text-muted);
                    border: 1px solid var(--border-base);
                }
                .saas-btn-edit:hover { background: var(--primary-light); color: var(--primary); border-color: var(--primary); }
                .saas-btn-delete {
                    background: var(--danger-bg);
                    color: var(--danger);
                }
                .saas-btn-delete:hover { background: var(--danger); color: white; }

                .icon-action-danger {
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-light);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-base);
                }
                .icon-action-danger:hover { color: var(--danger); background: var(--danger-bg); border-color: var(--danger); }
            `}</style>
    </div>
  );
};

export default ComplaintCard;
