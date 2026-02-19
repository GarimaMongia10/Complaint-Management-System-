import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';
import { Mail, Lock, User, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const result = await register(formData.name, formData.email, formData.password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="auth-wrapper-saas animated">
            <div className="auth-brand-saas">
                <div className="auth-logo-saas">
                    <Layout size={32} />
                </div>
                <h2>Create your account</h2>
                <p>Join thousands of users resolving issues faster than ever.</p>
            </div>

            <div className="auth-card-saas card-saas">
                {error && <Message type="danger">{error}</Message>}

                <form onSubmit={handleSubmit} className="auth-form-saas">
                    <div className="form-group-saas">
                        <label>Full Name</label>
                        <div className="input-with-icon-saas">
                            <User size={18} className="input-icon-saas" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="saas-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group-saas">
                        <label>Email Address</label>
                        <div className="input-with-icon-saas">
                            <Mail size={18} className="input-icon-saas" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="saas-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row-saas">
                        <div className="form-group-saas">
                            <label>Password</label>
                            <div className="input-with-icon-saas">
                                <Lock size={18} className="input-icon-saas" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="saas-input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group-saas">
                            <label>Confirm</label>
                            <div className="input-with-icon-saas">
                                <Lock size={18} className="input-icon-saas" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="saas-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="auth-benefit-list-saas">
                        <div className="benefit-item-saas">
                            <CheckCircle2 size={14} className="benefit-icon-saas" />
                            <span>Instant dashboard access</span>
                        </div>
                        <div className="benefit-item-saas">
                            <CheckCircle2 size={14} className="benefit-icon-saas" />
                            <span>Real-time tracking notifications</span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary saas-auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Get Started'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer-saas">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>

            <style>{`
                .auth-wrapper-saas {
                    min-height: calc(100vh - 80px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 2rem;
                    background: var(--bg-app);
                }
                .auth-brand-saas { text-align: center; margin-bottom: 2.5rem; }
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

                .auth-card-saas { width: 100%; max-width: 480px; padding: 2.5rem; }
                .auth-form-saas { display: flex; flex-direction: column; gap: 1.5rem; }
                .form-group-saas { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-group-saas label { font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); }
                
                .form-row-saas { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                
                .input-with-icon-saas { position: relative; display: flex; align-items: center; }
                .input-icon-saas { position: absolute; left: 1rem; color: var(--text-light); }
                .saas-input {
                    width: 100%;
                    padding: 0.875rem 1rem 0.875rem 3rem;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    outline: none;
                    transition: var(--transition);
                }
                .saas-input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

                .auth-benefit-list-saas { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
                .benefit-item-saas { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); }
                .benefit-icon-saas { color: var(--success); }

                .saas-auth-btn { padding: 0.875rem; font-size: 1rem; margin-top: 0.5rem; }

                .auth-footer-saas {
                    margin-top: 2rem;
                    text-align: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-subtle);
                }
                .auth-footer-saas p { font-size: 0.875rem; color: var(--text-muted); }
                .auth-footer-saas a { font-weight: 700; color: var(--primary); }

                @media (max-width: 480px) {
                    .form-row-saas { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Register;
