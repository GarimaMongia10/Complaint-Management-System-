import React, { useMemo, useState } from 'react';
import ComplaintList from '../components/ComplaintList';
import { Shield, Filter, BarChart3, Users, Clock, Search, LayoutGrid, CheckCircle2, AlertCircle } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

const AdminDashboard = () => {
    const { complaints, updateComplaintStatus, deleteComplaint } = useComplaints();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const adminStats = useMemo(() => [
        { label: 'Total Inflow', value: complaints.length, icon: <BarChart3 size={24} />, color: 'var(--primary)', trend: '+5%' },
        { label: 'Active Users', value: new Set(complaints.map(c => c.userId || 'anon')).size, icon: <Users size={24} />, color: 'var(--info)', trend: '+2' },
        { label: 'Pending Rev', value: complaints.filter(c => c.status === 'Pending').length, icon: <Clock size={24} />, color: 'var(--warning)', trend: '-12%' },
        { label: 'MTTR (Avg)', value: '4.2h', icon: <CheckCircle2 size={24} />, color: 'var(--success)', trend: '-0.5h' },
    ], [complaints]);

    const filtered = complaints.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeFilter === 'All' || c.status === activeFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="admin-page-saas animated">
            <div className="container">
                <header className="admin-header-saas">
                    <div className="header-badge-saas">
                        <Shield size={14} /> Administrative Access
                    </div>
                    <div className="header-main-row-saas">
                        <div className="title-group-saas">
                            <h1>Central Control</h1>
                            <p>Global oversight of all platform tickets and resolution efficiency.</p>
                        </div>
                        <div className="admin-actions-group">
                            <button className="btn btn-outline"><LayoutGrid size={18} /> Export Data</button>
                        </div>
                    </div>
                </header>

                <div className="admin-stats-row-saas">
                    {adminStats.map((stat, i) => (
                        <div key={i} className="admin-stat-card card-saas">
                            <div className="stat-card-inner">
                                <div className="stat-text">
                                    <span className="stat-label-saas">{stat.label}</span>
                                    <h3 className="stat-val-saas">{stat.value}</h3>
                                </div>
                                <div className="stat-icon-wrap" style={{ color: stat.color, background: `${stat.color}15` }}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="stat-trend-row">
                                <span className={`trend-pill ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                                    {stat.trend}
                                </span>
                                <span className="trend-period">vs last 24h</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="admin-controls-grid-saas">
                    <div className="admin-main-list-saas">
                        <div className="list-toolbar-saas card-saas">
                            <div className="toolbar-search">
                                <Search size={18} className="search-icon-saas" />
                                <input
                                    type="text"
                                    placeholder="Queue search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="toolbar-filters">
                                {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
                                    <button
                                        key={f}
                                        className={`filter-chip-saas ${activeFilter === f ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(f)}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="admin-queue-saas">
                            <ComplaintList
                                complaints={filtered}
                                isAdmin={true}
                                onStatusUpdate={updateComplaintStatus}
                                onDelete={deleteComplaint}
                            />
                        </div>
                    </div>

                    <aside className="admin-sidebar-saas">
                        <div className="card-saas alerts-card-saas">
                            <div className="alert-header">
                                <AlertCircle size={18} className="alert-icon" />
                                <h4>System Health</h4>
                            </div>
                            <div className="alert-content">
                                <div className="health-node">
                                    <span className="node-status status-up"></span>
                                    <div className="node-info">
                                        <p>API Integration</p>
                                        <span>Stable - 99.9%</span>
                                    </div>
                                </div>
                                <div className="health-node">
                                    <span className="node-status status-up"></span>
                                    <div className="node-info">
                                        <p>Email Gateway</p>
                                        <span>Operational</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`
                .admin-page-saas { padding: 4rem 0; min-height: calc(100vh - 80px); background: var(--bg-app); }
                
                .admin-header-saas { margin-bottom: 3rem; }
                .header-badge-saas {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--primary-light);
                    color: var(--primary);
                    padding: 0.375rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.6875rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.25rem;
                }
                .header-main-row-saas { display: flex; justify-content: space-between; align-items: flex-end; }
                .title-group-saas h1 { font-size: 2.25rem; font-weight: 800; color: var(--text-main); line-height: 1; letter-spacing: -0.025em; }
                .title-group-saas p { color: var(--text-muted); font-size: 1rem; margin-top: 0.75rem; }

                .admin-stats-row-saas {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }
                .admin-stat-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
                .stat-card-inner { display: flex; justify-content: space-between; align-items: center; }
                .stat-label-saas { font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; }
                .stat-val-saas { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-top: 0.25rem; }
                .stat-icon-wrap { width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }
                
                .stat-trend-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; }
                .trend-pill { padding: 0.125rem 0.375rem; border-radius: 4px; font-weight: 700; }
                .trend-pill.up { background: var(--success-bg); color: var(--success); }
                .trend-pill.down { background: var(--danger-bg); color: var(--danger); }
                .trend-period { color: var(--text-light); }

                .admin-controls-grid-saas {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 2rem;
                    align-items: flex-start;
                }

                .list-toolbar-saas {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 1.5rem;
                    margin-bottom: 2rem;
                    gap: 2rem;
                }
                .toolbar-search { position: relative; flex: 1; display: flex; align-items: center; }
                .search-icon-saas { position: absolute; left: 1rem; color: var(--text-light); }
                .toolbar-search input {
                    width: 100%;
                    padding: 0.625rem 1rem 0.625rem 2.75rem;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-md);
                    font-size: 0.8125rem;
                    outline: none;
                    background: var(--bg-app);
                }
                .toolbar-search input:focus { background: white; border-color: var(--primary); }

                .toolbar-filters { display: flex; gap: 0.5rem; }
                .filter-chip-saas {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border-radius: var(--radius-sm);
                    color: var(--text-muted);
                    background: var(--bg-app);
                }
                .filter-chip-saas.active { background: var(--primary); color: white; }

                .alerts-card-saas { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
                .alert-header { display: flex; align-items: center; gap: 0.75rem; }
                .alert-header h4 { font-size: 0.9375rem; font-weight: 800; color: var(--text-main); }
                .alert-icon { color: var(--danger); }

                .alert-content { display: flex; flex-direction: column; gap: 1.25rem; }
                .health-node { display: flex; align-items: center; gap: 1rem; }
                .node-status { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
                .status-up { background: var(--success); box-shadow: 0 0 0 4px var(--success-bg); }
                .node-info p { font-size: 0.8125rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.125rem; }
                .node-info span { font-size: 0.75rem; color: var(--text-light); }

                @media (max-width: 1100px) {
                    .admin-controls-grid-saas { grid-template-columns: 1fr; }
                    .list-toolbar-saas { flex-direction: column; align-items: stretch; gap: 1.5rem; }
                }
            `}</style>
        </div >
    );
};

export default AdminDashboard;
