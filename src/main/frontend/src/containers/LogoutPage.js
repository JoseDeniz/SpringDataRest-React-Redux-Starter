import React, {PropTypes} from "react";
import * as routePaths from "../constants/routePaths";

export class LogoutPage extends React.Component {
    componentWillMount(){
        this.props.storageWrapper.resetAuthToken();
        this.props.actions.doLogout();
        this.props.router.push(routePaths.LOGIN_ROUTE);
    }

    render() {
        return null;
    }
}

LogoutPage.propTypes = {
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    storageWrapper: PropTypes.object.isRequired
};

export default LogoutPage;
