import React from 'react';
import './NotefulForm.css';
import PropTypes from 'prop-types';

function NotefulForm(props){
    const{ className, ...otherProps} = props;
    return(
        <form className={['Noteful-form', className].join(' ')} action='#' {...otherProps}/>
    );
}

NotefulForm.propTypes = {
    className: PropTypes.string
};

export default NotefulForm;

