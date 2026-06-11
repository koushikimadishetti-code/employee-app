import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../services/employeeService';
import './EmployeeForm.css';

const DEPARTMENTS = ['Engineering','Marketing','Sales','HR','Finance','Design','Operations'];

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const isEdit = !!employee;
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    department: '', position: '', phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) setForm({ ...employee });
  }, [employee]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim())  errs.lastName  = 'Required';
    if (!form.email.trim())     errs.email     = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      if (isEdit) await updateEmployee(employee.id, form);
      else        await createEmployee(form);
      onSave();
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object') setErrors(data);
      else setErrors({ general: 'Save failed. Please try again.' });
    } finally { setLoading(false); }
  };

  return (
    <div className="ef-wrap">
      <div className="ef-card">
        <div className="ef-header">
          <h2>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
          <p>{isEdit ? `Editing ${employee.firstName} ${employee.lastName}` : 'Fill in the details below'}</p>
        </div>

        <form onSubmit={handleSubmit} className="ef-form">
          {errors.general && <div className="ef-err-box">{errors.general}</div>}

          <div className="ef-row">
            <div className="ef-fg">
              <label>First Name *</label>
              <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="John"/>
              {errors.firstName && <span className="ef-err">{errors.firstName}</span>}
            </div>
            <div className="ef-fg">
              <label>Last Name *</label>
              <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Doe"/>
              {errors.lastName && <span className="ef-err">{errors.lastName}</span>}
            </div>
          </div>

          <div className="ef-fg">
            <label>Email *</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="john@company.com"/>
            {errors.email && <span className="ef-err">{errors.email}</span>}
          </div>

          <div className="ef-row">
            <div className="ef-fg">
              <label>Department</label>
              <select value={form.department} onChange={set('department')}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="ef-fg">
              <label>Position</label>
              <input type="text" value={form.position} onChange={set('position')} placeholder="Software Engineer"/>
            </div>
          </div>

          <div className="ef-fg">
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 9876543210"/>
          </div>

          <div className="ef-actions">
            <button type="button" className="ef-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="ef-submit" disabled={loading}>
              {loading ? <span className="ef-spin"/> : (isEdit ? 'Update Employee' : 'Add Employee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
