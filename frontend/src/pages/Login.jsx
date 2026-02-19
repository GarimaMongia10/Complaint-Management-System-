import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';
import { Mail, Lock, Layout, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(credentials.email, credentials.password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div className="auth-wrapper-saas animated">
            <div className="auth-brand-saas">
                <div className="auth-logo-saas">
                    <Layout size={32} />
                </div>
                <h2>Welcome to ComplaintPortal</h2>
                <p>The modern standard for issue resolution and tracking.</p>
            </div>

            <div className="auth-card-saas card-saas">
                <div className="auth-header-saas text-center">
                    <h3>Sign In</h3>
                    <p>Enter your credentials to access your dashboard</p>
                </div>

                {error && <Message type="danger">{error}</Message>}

                <form onSubmit={handleSubmit} className="auth-form-saas">
                    <div className="form-group-saas">
                        <label>Email Address</label>
                        <div className="input-with-icon-saas">
                            <Mail size={18} className="input-icon-saas" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={credentials.email}
                                onChange={handleChange}
                                className="saas-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group-saas">
                        <div className="label-row-saas">
                            <label>Password</label>
                            <Link to="#" className="forgot-link-saas">Forgot password?</Link>
                        </div>
                        <div className="input-with-icon-saas">
                            <Lock size={18} className="input-icon-saas" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={handleChange}
                                className="saas-input"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary saas-auth-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
                    </button>

                    <div className="auth-trust-saas">
                        <ShieldCheck size={14} />
                        <span>Encrypted and Secure Connection</span>
                    </div>
                </form>

                <div className="auth-footer-saas">
                    <p>Don't have an account? <Link to="/register">Create an account</Link></p>
                </div>
            </div>

            <style>{`
                .auth-wrapper-saas {
                    min-height: calc(100vh - 80px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: var(--bg-app);
                }
                .auth-brand-saas {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }
                .auth-logo-saas {
                    background: var(--primary);
                    color: white;
                    width: 64px;
                    height: 64px;
                    border-radius: var(--radius-xl);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    box-shadow: var(--shadow-lg);
                }
                .auth-brand-saas h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
                .auth-brand-saas p { color: var(--text-muted); font-size: 0.9375rem; }

                .auth-card-saas {
                    width: 100%;
                    max-width: 440px;
                    padding: 2.5rem;
                }
                .auth-header-saas { margin-bottom: 2rem; }
                .auth-header-saas h3 { font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
                .auth-header-saas p { font-size: 0.875rem; color: var(--text-light); }

                .auth-form-saas { display: flex; flex-direction: column; gap: 1.5rem; }
                .form-group-saas { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-group-saas label { font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); }
                .label-row-saas { display: flex; justify-content: space-between; align-items: center; }
                .forgot-link-saas { font-size: 0.75rem; font-weight: 700; color: var(--primary); }
                
                .input-with-icon-saas { position: relative; display: flex; align-items: center; }
                .input-icon-saas { position: absolute; left: 1rem; color: var(--text-light); }
                .saas-input {
                    width: 100%;
                    padding: 0.875rem 1rem 0.875rem 3rem;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-md);
                    font-size: 0.9375rem;
                    outline: none;
                    transition: var(--transition);
                }
                .saas-input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

                .saas-auth-btn { padding: 0.875rem; font-size: 1rem; }
                .auth-trust-saas {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--text-light);
                    margin-top: 0.5rem;
                }

                .auth-footer-saas {
                    margin-top: 2rem;
                    text-align: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-subtle);
                }
                .auth-footer-saas p { font-size: 0.875rem; color: var(--text-muted); }
                .auth-footer-saas a { font-weight: 700; color: var(--primary); }
            `}</style>
        </div>
    );
};

export default Login;
