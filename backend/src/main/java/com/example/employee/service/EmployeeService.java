package com.example.employee.service;

import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public List<Employee> getAll()                        { return repo.findAll(); }
    public Employee getById(Long id)                      { return repo.findById(id).orElseThrow(); }
    public Employee create(Employee e)                    { return repo.save(e); }
    public void delete(Long id)                           { repo.deleteById(id); }
    public List<Employee> search(String q)                { return repo.search(q); }
    public List<Employee> byDepartment(String dept)       { return repo.findByDepartmentIgnoreCase(dept); }

    public Employee update(Long id, Employee updated) {
        Employee existing = getById(id);
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setEmail(updated.getEmail());
        existing.setDepartment(updated.getDepartment());
        existing.setPosition(updated.getPosition());
        existing.setPhone(updated.getPhone());
        return repo.save(existing);
    }
}
