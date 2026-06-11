import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      if (!res.ok) { throw new Error(await res.text()); }
      const data = await res.json();
      localStorage.setItem('token',    data.token);
      localStorage.setItem('role',     data.role);
      localStorage.setItem('username', data.username);
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* ── Left decorative panel ── */}
      <div className="login-left">
        <div className="ll-brand">
          <div className="ll-logo">
            <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="12" fill="#e8ff47"/><path d="M20 8C14.477 8 10 12.477 10 18c0 3.536 1.82 6.646 4.572 8.485L13 32h14l-1.572-5.515A10 10 0 0020 8z" fill="#0d0d0d"/><circle cx="16" cy="17" r="2" fill="#e8ff47"/><circle cx="24" cy="17" r="2" fill="#e8ff47"/></svg>
          </div>
          <span>EmpManager</span>
        </div>

        <div className="ll-body">
          <h1 className="ll-heading">Manage your<br/><span>team</span> with<br/>clarity.</h1>
          <p className="ll-sub">A unified workspace for admins and employees to track, manage, and grow together.</p>
          <div className="ll-stats">
            <div><span className="sn">∞</span><span className="sl">Employees</span></div>
            <div><span className="sn">24/7</span><span className="sl">Access</span></div>
            <div><span className="sn">100%</span><span className="sl">Secure</span></div>
          </div>
        </div>

        <div className="ll-dots" />
      </div>

      {/* ── Right form panel ── */}
      <div className="login-right">
        <div className="login-card">
          <div className="lc-header">
            <h2>Welcome back</h2>
            <p>Sign in to your account</p>
          </div>

          {/* Role toggle */}
          <div className="role-toggle">
            <button type="button" className={`rt-btn ${role==='admin'?'active':''}`} onClick={()=>{setRole('admin');setError('');}}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="15"><path fillRule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zm0 10c-5.523 0-8 2.239-8 4v1h16v-1c0-1.761-2.477-4-8-4z" clipRule="evenodd"/></svg>
              Admin
            </button>
            <button type="button" className={`rt-btn ${role==='employee'?'active':''}`} onClick={()=>{setRole('employee');setError('');}}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="15"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
              Employee
            </button>
          </div>

          <form onSubmit={handleSubmit} className="lc-form">
            <div className="fg">
              <label>Username</label>
              <div className="iw">
                <svg className="ii" viewBox="0 0 20 20" fill="currentColor" width="15"><path fillRule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zm0 10c-5.523 0-8 2.239-8 4v1h16v-1c0-1.761-2.477-4-8-4z" clipRule="evenodd"/></svg>
                <input type="text" placeholder={role==='admin'?'admin':'john.doe'} value={username} onChange={e=>setUsername(e.target.value)} required autoComplete="username"/>
              </div>
            </div>
            <div className="fg">
              <label>Password</label>
              <div className="iw">
                <svg className="ii" viewBox="0 0 20 20" fill="currentColor" width="15"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/>
              </div>
            </div>

            {error && <div className="err-box"><svg viewBox="0 0 20 20" fill="currentColor" width="15"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="spin"/> : <>Sign in as {role==='admin'?'Admin':'Employee'} <svg viewBox="0 0 20 20" fill="currentColor" width="15"><path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg></>}
            </button>
          </form>

          <p className="lc-footer">Contact your administrator if you have trouble logging in.</p>

          <div className="demo-creds">
            <p><strong>Demo credentials:</strong></p>
            <p>Admin: <code>admin</code> / <code>admin123</code></p>
            <p>Employee: <code>john.doe</code> / <code>emp123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
