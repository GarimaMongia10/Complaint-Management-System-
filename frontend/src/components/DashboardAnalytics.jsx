import React from 'react';
import { Target, BarChart, Circle } from 'lucide-react';

const DashboardAnalytics = ({ complaints }) => {
    const getCount = (status) => complaints.filter(c => c.status === status).length;
    const total = complaints.length || 1;

    const stats = [
        { label: 'Pending', count: getCount('Pending'), color: 'var(--warning)', percentage: (getCount('Pending') / total) * 100 },
        { label: 'In Progress', count: getCount('In Progress'), color: 'var(--info)', percentage: (getCount('In Progress') / total) * 100 },
        { label: 'Resolved', count: getCount('Resolved'), color: 'var(--success)', percentage: (getCount('Resolved') / total) * 100 },
        { label: 'Closed', count: getCount('Closed'), color: 'var(--secondary)', percentage: (getCount('Closed') / total) * 100 },
    ];

    return (
        <section className="analytics-saas animated">
            <div className="section-title-saas">
                <BarChart size={20} className="icon-accent-saas" />
                <h2>Resolution Analytics</h2>
            </div>

            <div className="analytics-grid-saas">
                <div className="chart-main-saas">
                    {stats.map((stat, index) => (
                        <div key={index} className="progress-row-saas">
                            <div className="row-meta-saas">
                                <span className="row-label">{stat.label}</span>
                                <span className="row-count">{stat.count} reports</span>
                            </div>
                            <div className="track-saas">
                                <div
                                    className="fill-saas"
                                    style={{ width: `${stat.percentage}%`, background: stat.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="efficiency-card-saas">
                    <div className="gauge-saas">
                        <Target size={32} className="gauge-icon" />
                        <div className="gauge-text">
                            <span className="gauge-val">84%</span>
                            <span className="gauge-label">Efficiency</span>
                        </div>
                    </div>
                    <div className="mini-stats-saas">
                        <div className="mini-item">
                            <Circle size={8} fill="var(--success)" color="var(--success)" />
                            <span>On Track</span>
                        </div>
                        <div className="mini-item">
                            <Circle size={8} fill="var(--warning)" color="var(--warning)" />
                            <span>Delayed</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .analytics-saas {
                    margin-top: 3.5rem;
                    background: white;
                    padding: 2rem;
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--border-base);
                    box-shadow: var(--shadow-sm);
                }
                .section-title-saas {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }
                .section-title-saas h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
                .icon-accent-saas { color: var(--primary); }

                .analytics-grid-saas {
                    display: grid;
                    grid-template-columns: 1fr 220px;
                    gap: 3rem;
                    align-items: center;
                }

                .progress-row-saas { margin-bottom: 1.5rem; }
                .row-meta-saas {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }
                .row-label { font-size: 0.8125rem; font-weight: 700; color: var(--text-main); }
                .row-count { font-size: 0.75rem; font-weight: 600; color: var(--text-light); }

                .track-saas { height: 8px; background: var(--bg-app); border-radius: 4px; overflow: hidden; }
                .fill-saas { height: 100%; border-radius: 4px; transition: width 1s cubic-bezier(0.16, 1, 0.3, 1); }

                .efficiency-card-saas {
                    background: var(--bg-app);
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .gauge-saas {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                .gauge-icon { color: var(--primary); opacity: 0.8; }
                .gauge-val { font-size: 1.75rem; font-weight: 800; color: var(--text-main); line-height: 1; }
                .gauge-label { font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; }

                .mini-stats-saas {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding-top: 1.25rem;
                    border-top: 1px solid var(--border-base);
                }
                .mini-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-muted);
                }

                @media (max-width: 768px) {
                    .analytics-grid-saas { grid-template-columns: 1fr; gap: 2rem; }
                    .efficiency-card-saas { order: -1; }
                }
            `}</style>
        </section>
    );
};

export default DashboardAnalytics;
