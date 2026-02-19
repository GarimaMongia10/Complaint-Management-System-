import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout, LogOut, Bell, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`nav-saas ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-accent">
            <Layout size={22} />
          </div>
          <span>ComplaintPortal</span>
        </Link>

        <div className={`nav-menu-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
          {user && (
            <div className="nav-links">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/complaints"
                className={`nav-link ${isActive('/complaints') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Complaints
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`nav-link admin-active ${isActive('/admin') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="nav-actions">
          <button className="icon-btn" title="Search"><Search size={20} /></button>
          <button className="icon-btn" title="Notifications"><Bell size={20} /></button>

          {user ? (
            <div className="user-profile-saas">
              <div className="profile-info">
                <span className="u-name">{user.name}</span>
                <span className="u-role">{isAdmin ? 'Administrator' : 'User'}</span>
              </div>
              <button onClick={logout} className="logout-btn-saas" title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-group">
              <Link to="/login" className="btn btn-ghost">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
                .nav-saas {
                    height: 80px;
                    background: transparent;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    transition: var(--transition);
                    display: flex;
                    align-items: center;
                }
                .nav-scrolled {
                    height: 64px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border-base);
                    box-shadow: var(--shadow-sm);
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.125rem;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.025em;
                }
                .logo-accent {
                    background: var(--primary);
                    color: white;
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    display: flex;
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
                }
                
                .nav-links {
                    display: flex;
                    gap: 0.5rem;
                    background: var(--border-subtle);
                    padding: 0.375rem;
                    border-radius: var(--radius-lg);
                }
                .nav-link {
                    padding: 0.5rem 1.25rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    border-radius: var(--radius-md);
                    transition: var(--transition);
                }
                .nav-link:hover { color: var(--primary); }
                .nav-link.active {
                    background: white;
                    color: var(--primary);
                    box-shadow: var(--shadow-sm);
                }
                .admin-active.active {
                    color: var(--danger);
                }

                .nav-actions { display: flex; align-items: center; gap: 0.5rem; }
                .icon-btn {
                    padding: 0.625rem;
                    color: var(--text-light);
                    border-radius: var(--radius-md);
                }
                .icon-btn:hover {
                    color: var(--primary);
                    background: var(--primary-light);
                }

                .user-profile-saas {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.375rem 0.375rem 0.375rem 1.25rem;
                    background: white;
                    border: 1px solid var(--border-base);
                    border-radius: 999px;
                    margin-left: 0.5rem;
                    box-shadow: var(--shadow-sm);
                }
                .profile-info {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                }
                .u-name { font-size: 0.8125rem; font-weight: 700; color: var(--text-main); }
                .u-role { font-size: 0.6875rem; color: var(--text-light); text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; margin-top: 0.125rem; }
                
                .logout-btn-saas {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--danger-bg);
                    color: var(--danger);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .logout-btn-saas:hover {
                    background: var(--danger);
                    color: white;
                    transform: rotate(90deg);
                }

                .mobile-toggle { display: none; padding: 0.5rem; }

                @media (max-width: 992px) {
                    .nav-menu-wrapper {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        right: 0;
                        background: white;
                        padding: 1.5rem;
                        border-bottom: 1px solid var(--border-base);
                        box-shadow: var(--shadow-lg);
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(-10px);
                        transition: var(--transition);
                    }
                    .nav-menu-wrapper.open {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    .nav-links {
                        flex-direction: column;
                        background: none;
                        padding: 0;
                    }
                    .mobile-toggle { display: block; }
                    .user-profile-saas { display: none; }
                }
            `}</style>
    </nav>
  );
};

export default Navbar;
