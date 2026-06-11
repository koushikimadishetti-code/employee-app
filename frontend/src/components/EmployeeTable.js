import React, { useEffect, useState, useCallback } from 'react';
import { getAllEmployees, searchEmployees, deleteEmployee } from '../services/employeeService';
import './EmployeeTable.css';

const DEPT_COLORS = {
  Engineering: '#dbeafe',
  Marketing:   '#fce7f3',
  Sales:       '#dcfce7',
  HR:          '#fef9c3',
  Finance:     '#ede9fe',
  Design:      '#ffedd5',
  Operations:  '#e0f2fe',
};

const EmployeeTable = ({ isAdmin, onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch { showToast('Failed to load employees'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearch(q);
    if (!q.trim()) { load(); return; }
    try {
      const res = await searchEmployees(q);
      setEmployees(res.data);
    } catch {}
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
      showToast('Employee deleted');
    } catch { showToast('Delete failed'); }
  };

  return (
    <div className="et-wrap">
      {toast && <div className="toast">{toast}</div>}

      <div className="et-toolbar">
        <div>
          <h2 className="et-title">Employees</h2>
          <p className="et-count">{employees.length} total</p>
        </div>
        <div className="et-search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor" width="16"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
          <input className="et-search" type="text" placeholder="Search name or email…" value={search} onChange={handleSearch}/>
        </div>
      </div>

      {loading ? (
        <div className="et-loading">Loading…</div>
      ) : employees.length === 0 ? (
        <div className="et-empty">No employees found</div>
      ) : (
        <div className="table-scroll">
          <table className="et-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Phone</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={emp.id}>
                  <td className="row-num">{i + 1}</td>
                  <td className="name-cell">
                    <div className="avatar">{emp.firstName[0]}{emp.lastName[0]}</div>
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="dept-badge" style={{background: DEPT_COLORS[emp.department] || '#f0f0ea'}}>
                      {emp.department || '—'}
                    </span>
                  </td>
                  <td>{emp.position || '—'}</td>
                  <td>{emp.phone || '—'}</td>
                  {isAdmin && (
                    <td className="actions-cell">
                      <button className="btn-edit" onClick={() => onEdit(emp)}>Edit</button>
                      <button className="btn-del"  onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
