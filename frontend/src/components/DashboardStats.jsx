import React from 'react';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardStats = ({ stats }) => {
  return (
    <section className="dashboard-stats-saas animated">
      <div className="section-header-saas">
        <div className="header-text-saas">
          <h1>SaaS Dashboard</h1>
          <p>Real-time analytics and complaint lifecycle tracking</p>
        </div>
        <Link to="/create-complaint" className="btn btn-primary saas-btn-pulse">
          <PlusCircle size={18} /> New Ticket
        </Link>
      </div>

      <div className="stats-grid-saas">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-saas">
            <div className="stat-card-top">
              <div className="stat-info-saas">
                <span className="stat-label-saas">{stat.label}</span>
                <h2 className="stat-value-saas">{stat.value}</h2>
              </div>
              <div className="stat-icon-saas" style={{ color: stat.color, background: `${stat.color}10` }}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className="stat-trend" style={{ color: 'var(--success)' }}>
                <TrendingUp size={14} /> +12%
              </span>
              <span className="trend-label">since last week</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
                .dashboard-stats-saas { margin-bottom: 2rem; }
                .section-header-saas {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2.5rem;
                }
                .header-text-saas h1 { font-size: 1.875rem; font-weight: 800; color: var(--text-main); line-height: 1.2; }
                .header-text-saas p { color: var(--text-muted); font-size: 0.9375rem; margin-top: 0.375rem; }

                .stats-grid-saas {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .stat-card-saas {
                    background: white;
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-base);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    transition: var(--transition);
                }
                .stat-card-saas:hover {
                    border-color: var(--primary);
                    box-shadow: var(--shadow-md);
                    transform: translateY(-2px);
                }

                .stat-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .stat-label-saas {
                    font-size: 0.8125rem;
                    font-weight: 700;
                    color: var(--text-light);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .stat-value-saas {
                    font-size: 1.875rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-top: 0.25rem;
                }

                .stat-icon-saas {
                    width: 3.25rem;
                    height: 3.25rem;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-card-bottom {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .stat-trend {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: var(--success-bg);
                    padding: 0.125rem 0.375rem;
                    border-radius: var(--radius-sm);
                }
                .trend-label { color: var(--text-light); }

                .saas-btn-pulse:hover {
                    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
                    animation: pulse-saas 2s infinite;
                }

                @keyframes pulse-saas {
                    0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
                }
            `}</style>
    </section>
  );
};

export default DashboardStats;
