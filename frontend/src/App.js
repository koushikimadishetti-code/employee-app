import React, { useState, useEffect, useCallback } from 'react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import employeeService from './services/employeeService';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = searchQuery
        ? await employeeService.search(searchQuery)
        : await employeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      showToast('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delay = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(delay);
  }, [fetchEmployees]);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await employeeService.delete(id);
      showToast('Employee deleted successfully');
      fetchEmployees();
    } catch {
      showToast('Failed to delete employee', 'error');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedEmployee) {
        await employeeService.update(selectedEmployee.id, formData);
        showToast('Employee updated successfully');
      } else {
        await employeeService.create(formData);
        showToast('Employee added successfully');
      }
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      const msg = err.response?.data?.email || err.response?.data?.error || 'Operation failed';
      showToast(msg, 'error');
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>👥 Employee Manager</h1>
            <p>{employees.length} employee{employees.length !== 1 ? 's' : ''} total</p>
          </div>
          <button className="btn-primary" onClick={handleAdd}>+ Add Employee</button>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍  Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Modal Form */}
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
