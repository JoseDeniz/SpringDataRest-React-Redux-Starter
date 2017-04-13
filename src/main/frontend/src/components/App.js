import React, {PropTypes} from 'react';

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
