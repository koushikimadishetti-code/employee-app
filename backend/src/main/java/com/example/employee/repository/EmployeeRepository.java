package com.example.employee.repository;

import com.example.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%',:q,'%')) OR " +
           "LOWER(e.lastName)  LIKE LOWER(CONCAT('%',:q,'%')) OR " +
           "LOWER(e.email)     LIKE LOWER(CONCAT('%',:q,'%'))")
    List<Employee> search(@Param("q") String query);

    List<Employee> findByDepartmentIgnoreCase(String department);
}
