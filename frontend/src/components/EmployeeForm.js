import React, { useState, useEffect } from 'react';

const DEPARTMENTS = ['Engineering', 'HR', 'Marketing', 'Finance', 'Sales', 'Operations'];
const ROLES = ['Manager', 'Developer', 'Analyst', 'Designer', 'Lead', 'Intern'];

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '',
  department: '', role: '', salary: ''
};

export default function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({ ...employee });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [employee]);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.department) errs.department = 'Department is required';
    if (!form.role) errs.role = 'Role is required';
    if (!form.salary || form.salary < 0) errs.salary = 'Valid salary required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ ...form, salary: parseFloat(form.salary) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange}>
                <option value="">Select...</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <span className="error">{errors.department}</span>}
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="">Select...</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Salary (₹)</label>
            <input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="50000" />
            {errors.salary && <span className="error">{errors.salary}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary">{employee ? 'Update' : 'Add'} Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
