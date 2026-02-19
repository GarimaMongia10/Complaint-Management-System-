import React from 'react';
import { Plus, Edit3, CheckCircle2, MessageSquare, History } from 'lucide-react';

const ActivityTimeline = () => {
  // Mock activity data with SaaS mapping
  const activities = [
    { id: 1, type: 'create', message: 'Submitted ticket "Database connection timeout"', time: '40m ago', icon: <Plus size={14} />, color: 'var(--primary)' },
    { id: 2, type: 'status', message: 'Status updated on "Billing discrepancy" to In Progress', time: '5h ago', icon: <History size={14} />, color: 'var(--info)' },
    { id: 3, type: 'resolve', message: 'Resolved "API documentation error"', time: '1d ago', icon: <CheckCircle2 size={14} />, color: 'var(--success)' },
    { id: 4, type: 'comment', message: 'Senior Support added a comment on "UI Glitch"', time: '2d ago', icon: <MessageSquare size={14} />, color: 'var(--secondary)' },
  ];

  return (
    <div className="card-saas timeline-saas animated">
      <div className="timeline-header-saas">
        <History size={18} className="history-icon" />
        <h3>Recent Activity</h3>
      </div>

      <div className="timeline-content-saas">
        {activities.map((activity, index) => (
          <div key={activity.id} className="timeline-node-saas">
            <div className="node-sidebar-saas">
              <div className="node-icon-saas" style={{ color: activity.color, background: `${activity.color}15` }}>
                {activity.icon}
              </div>
              {index !== activities.length - 1 && <div className="node-line-saas"></div>}
            </div>
            <div className="node-body-saas">
              <p className="node-msg-saas">{activity.message}</p>
              <span className="node-time-saas">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost btn-sm-saas">View Audit Log</button>

      <style>{`
                .timeline-saas { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
                .timeline-header-saas { display: flex; align-items: center; gap: 0.75rem; }
                .timeline-header-saas h3 { font-size: 1rem; font-weight: 800; color: var(--text-main); }
                .history-icon { color: var(--primary); }

                .timeline-content-saas { display: flex; flex-direction: column; }
                .timeline-node-saas { display: flex; gap: 1rem; }
                
                .node-sidebar-saas { display: flex; flex-direction: column; align-items: center; width: 28px; }
                .node-icon-saas {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    z-index: 2;
                }
                .node-line-saas {
                    width: 2px;
                    background: var(--border-subtle);
                    flex-grow: 1;
                    margin: 0.25rem 0;
                }

                .node-body-saas { padding-bottom: 1.5rem; }
                .node-msg-saas { font-size: 0.8125rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem; line-height: 1.4; }
                .node-time-saas { font-size: 0.75rem; font-weight: 500; color: var(--text-light); }
                
                .btn-sm-saas { width: 100%; font-size: 0.75rem; border: 1px solid var(--border-base); }
            `}</style>
    </div>
  );
};

export default ActivityTimeline;
