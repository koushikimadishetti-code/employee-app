import React from 'react';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <span className={`badge badge-${emp.department.toLowerCase().replace(/\s/g, '-')}`}>
                  {emp.department}
                </span>
              </td>
              <td>{emp.role}</td>
              <td>₹{Number(emp.salary).toLocaleString('en-IN')}</td>
              <td className="actions">
                <button className="btn-edit" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
