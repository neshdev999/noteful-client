import React from 'react';
import './AppError.css';

class AppError extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    // static getDerivedStateFromError(error){
    //     return {
    //         hasError: true
    //     };
    // }

    componentDidCatch(err, info) {
        // set the the hasError state to true so on the next render it will display the `<div>Error occured.</div>` in the DOM.
        this.setState({
            hasError: true,
            error: err,
            errorInfo: info
        });
    }

    // render(){
    //     if(this.state.hasError){
    //         return(
    //             <h2 className="mainHeader">Could not display this page</h2>
    //         );
    //     }
    //     return this.props.children;
    // }

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

export default AppError;