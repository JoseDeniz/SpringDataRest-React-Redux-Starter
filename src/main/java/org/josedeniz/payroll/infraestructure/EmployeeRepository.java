package org.josedeniz.payroll.infraestructure;

import org.josedeniz.payroll.entities.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}
