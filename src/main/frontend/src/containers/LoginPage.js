import React, {PropTypes} from 'react';
import * as routePaths from '../constants/routePaths';

export class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.login = this.login.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleOnEnterKeyPress = this.handleOnEnterKeyPress.bind(this);
    }

    login() {
        let router = this.props.router;
        router.push(routePaths.EMPLOYEES_ROUTE);
        /*
        let credentials = {user: this.username, password: this.password };
        let actions = this.props.actions;
        actions.doLogin(credentials).then(() => {
        }, (error) => {
            actions.loginError(error.message);
        });*/
    }

    onPasswordChange(evt) {
        this.password = evt.target.value;
    }

    onUsernameChange(evt) {
        this.username = evt.target.value;
    }

    handleOnEnterKeyPress(target) {
        const enterKey = 13;
        if(target.charCode === enterKey){
            this.login();
        }
    }

    render() {
        let loginError = this.props.errors.loginError ? this.props.errors.loginError.toString() : '';
        return (
            <div>
                <form>
                    <div className="error" id="login-error">
                        {loginError}
                    </div>
                    <input
                        className="form-control input-login"
                        id="username"
                        type="text"
                        placeholder="NIF/CIF"
                        onChange={this.onUsernameChange}
                        onKeyPress={this.handleOnEnterKeyPress}/>
                    <input
                        className="form-control input-login"
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        onChange={this.onPasswordChange}
                        onKeyPress={this.handleOnEnterKeyPress}/>
                    <input
                        type="button"
                        className="form-control"
                        id="login-submit"
                        value="Login"
                        onClick={this.login}/>
                </form>
            </div>
        );
    }
}
LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
