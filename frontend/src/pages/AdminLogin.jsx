import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';
import { Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await adminLogin(credentials.email, credentials.password);
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error || 'Access Denied');
        }
        setLoading(false);
    };

    return (
        <div className="admin-auth-wrapper animated">
            <div className="admin-auth-brand">
                <div className="admin-shield">
                    <ShieldAlert size={48} />
                </div>
                <h2>Restricted Access</h2>
                <p>System Administration Gateway</p>
            </div>

            <div className="admin-auth-card card-saas">
                <div className="admin-auth-header text-center">
                    <h3>Admin Portal</h3>
                </div>

                {error && <Message type="danger">{error}</Message>}

                <form onSubmit={handleSubmit} className="auth-form-saas">
                    <div className="form-group-saas">
                        <label>Administrator Email</label>
                        <div className="input-with-icon-saas">
                            <Mail size={18} className="input-icon-saas" />
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@domain.com"
                                value={credentials.email}
                                onChange={handleChange}
                                className="saas-input admin-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group-saas">
                        <label>Security Key (Password)</label>
                        <div className="input-with-icon-saas">
                            <Lock size={18} className="input-icon-saas" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={handleChange}
                                className="saas-input admin-input"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary admin-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Authorize Login'} <ArrowRight size={18} />
                    </button>
                </form>
            </div>

            <style>{`
                .admin-auth-wrapper {
                    min-height: calc(100vh - 80px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: #1e1e2f; /* Darker distinct background */
                    color: white;
                }
                .admin-auth-brand {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }
                .admin-shield {
                    color: #ef4444; /* Red danger tint */
                    margin: 0 auto 1rem;
                }
                .admin-auth-brand h2 { font-size: 1.75rem; font-weight: 800; color: white; margin-bottom: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase;}
                .admin-auth-brand p { color: #94a3b8; font-size: 0.9375rem; }

                .admin-auth-card {
                    width: 100%;
                    max-width: 440px;
                    padding: 2.5rem;
                    background: #27283c;
                    border: 1px solid #3f3f5a;
                }
                .admin-auth-header { margin-bottom: 2rem; }
                .admin-auth-header h3 { font-size: 1.5rem; font-weight: 800; color: white; }

                .admin-input { background: #1e1e2f; border-color: #3f3f5a; color: white; }
                .admin-input:focus { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1); }
                .form-group-saas label { color: #cbd5e1; }
                .input-icon-saas { color: #64748b; }
                
                .admin-btn {
                    background: #ef4444;
                    color: white;
                    border: none;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 800;
                    margin-top: 1rem;
                }
                .admin-btn:hover { background: #dc2626; transform: translateY(-2px); }
            `}</style>
        </div>
    );
};

export default AdminLogin;
