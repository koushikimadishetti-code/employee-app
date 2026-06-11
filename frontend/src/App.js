import React, { useState, useEffect } from 'react';
import LoginPage     from './components/LoginPage';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm  from './components/EmployeeForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('list');        // 'list' | 'form'
  const [editEmployee, setEditEmployee] = useState(null);

  // Restore session on page reload
  useEffect(() => {
    const token    = localStorage.getItem('token');
    const role     = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (token && role) setUser({ token, role, username });
  }, []);

  const handleLogin  = (data) => setUser(data);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setView('list');
    setEditEmployee(null);
  };

  // Not logged in → show login page
  if (!user) return <LoginPage onLogin={handleLogin} />;

  const isAdmin = user.role === 'admin';

  return (
    <div className="app">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <svg viewBox="0 0 40 40" fill="none" width="30" height="30">
            <rect width="40" height="40" rx="10" fill="#e8ff47"/>
            <path d="M20 8C14.477 8 10 12.477 10 18c0 3.536 1.82 6.646 4.572 8.485L13 32h14l-1.572-5.515A10 10 0 0020 8z" fill="#0d0d0d"/>
            <circle cx="16" cy="17" r="2" fill="#e8ff47"/>
            <circle cx="24" cy="17" r="2" fill="#e8ff47"/>
          </svg>
          <span>EmpManager</span>
        </div>

        <div className="nav-right">
          <span className={`role-pill role-pill--${user.role}`}>
            {user.role.toUpperCase()}
          </span>
          <span className="nav-user">{user.username}</span>

          {isAdmin && view === 'list' && (
            <button className="nav-btn nav-btn--primary"
              onClick={() => { setEditEmployee(null); setView('form'); }}>
              + Add Employee
            </button>
          )}
          <button className="nav-btn nav-btn--outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="main">
        {view === 'form' && isAdmin ? (
          <EmployeeForm
            employee={editEmployee}
            onSave={()  => { setView('list'); setEditEmployee(null); }}
            onCancel={() => { setView('list'); setEditEmployee(null); }}
          />
        ) : (
          <EmployeeTable
            isAdmin={isAdmin}
            onEdit={(emp) => { setEditEmployee(emp); setView('form'); }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
