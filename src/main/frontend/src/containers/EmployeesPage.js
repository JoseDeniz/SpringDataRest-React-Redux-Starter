import React, {PropTypes} from 'react';
import {handleAsyncAction} from '../components/commons/ux';
import EmployeeForm from '../components/EmployeeForm';

export class EmployeesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        handleAsyncAction(
            this.props.actions.loadEmployees(),
            this.props.notifier,
            this.props.router);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.employees.map((employee) => {
                            return (
                                <tr key={employee._links.self.href}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h3>Create a new Employee</h3>
                <EmployeeForm actions={this.props.actions} notifier={this.props.notifier}/>
            </div>
        );
    }
}
EmployeesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    employees: PropTypes.array.isRequired,
    router: PropTypes.object,
    notifier: PropTypes.object.isRequired
};
