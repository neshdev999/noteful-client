import React from 'react';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';

function Note(props){
    return(
        <div className='Note'>
            <h2 className='Note_title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note__delete' type='button'>
                <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    remove
            </button>
            <div className='Note__dates'>
                <div className='Note__dates-modified'>
                    Modified
                    {' '}
                    <span className='Date'>
                        {props.modified}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Note;