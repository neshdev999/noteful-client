import React from 'react';
import './AppError.css';
import PropTypes from 'prop-types';

class AppError extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            error: err,
            errorInfo: info
        });
    }

    render() {
        if (this.state.errorInfo) {
          return (
            <div>
              <h2>Something went wrong.</h2>
              <details style={{ whiteSpace: "pre-wrap" }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            </div>
          );
        }
        return this.props.children;
      }
}

AppError.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppError;