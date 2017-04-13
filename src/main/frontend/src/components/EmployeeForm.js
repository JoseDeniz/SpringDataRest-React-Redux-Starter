import React, {PropTypes} from 'react';
import {handleAsyncAction} from '../components/commons/ux';

class EmployeeForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            description: ''
        };
    }

    onChange(evt) {
        const {name, value} = evt.target;
        this.setState({[name]: value});
    }

    onSubmit(evt) {
        evt.preventDefault();
        handleAsyncAction(
            this.props.actions.saveEmployee(this.state),
            this.props.notifier,
            this.props.router,
            this.props.actions.updateEmployees);
    }

    render() {
        return (
            <form>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName"
                       type="text"
                       name="firstName"
                       value={this.state.firstName}
                       onChange={this.onChange}/>
                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName"
                       type="text"
                       name="lastName"
                       value={this.state.lastName}
                       onChange={this.onChange}/>
                <label htmlFor="description">Description:</label>
                <input id="description"
                       type="text"
                       name="description"
                       value={this.state.description}
                       onChange={this.onChange}/>
                <input type="submit" value="Create" onClick={this.onSubmit}/>
            </form>
        );
    }
}

EmployeeForm.propTypes = {
    actions: PropTypes.object.isRequired,
    notifier: PropTypes.object.isRequired,
    router: PropTypes.object,
};

export default EmployeeForm;
