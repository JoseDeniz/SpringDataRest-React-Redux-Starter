import React, {PropTypes} from 'react';
import * as routePaths from '../../constants/routePaths';
import storageWrapper from '../../utils/localStorageWrapper';

class Authenticated extends React.Component {

    componentWillMount() {
        this._authorize();
    }

    componentWillUpdate() {
        this._authorize();
    }

    _authorize() {
        let token = storageWrapper().getAuthToken();
        if (!token) {
            this.props.router.push(routePaths.LOGIN_ROUTE);
        }
    }

    render() {
        return this.props.children;
    }
}

Authenticated.propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default Authenticated;
