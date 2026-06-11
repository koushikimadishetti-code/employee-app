package com.example.employee.controller;

import com.example.employee.model.Employee;
import com.example.employee.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired private EmployeeService service;

    @GetMapping              public List<Employee> getAll()                              { return service.getAll(); }
    @GetMapping("/{id}")     public Employee getById(@PathVariable Long id)              { return service.getById(id); }
    @PostMapping             public Employee create(@Valid @RequestBody Employee e)      { return service.create(e); }
    @PutMapping("/{id}")     public Employee update(@PathVariable Long id, @Valid @RequestBody Employee e) { return service.update(id, e); }
    @DeleteMapping("/{id}")  public ResponseEntity<Void> delete(@PathVariable Long id)  { service.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/search")
    public List<Employee> search(@RequestParam String query) { return service.search(query); }

    @GetMapping("/department/{dept}")
    public List<Employee> byDept(@PathVariable String dept)  { return service.byDepartment(dept); }
}
