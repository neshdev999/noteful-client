import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListMain.css';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../notes-helper';
import PropTypes from 'prop-types';

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NoteContext;

  render(){
    const { folderId } = this.props.match.params;
    const { notes=[] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);

        // Introduce JS React Error to test the AppError component is working or not
  //   const  details = {
  //     name: "nnamdi",
  //     age: 27
  // };
    
    return (
      <section className='NoteListMain'>
        {/* {details} */}
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
  }

  NoteListMain.propTypes = {
      match : PropTypes.shape({
          params: PropTypes.object
      }).isRequired,
      onDeleteNote:  PropTypes.func,
      id: PropTypes.string,
      name: PropTypes.string,
      modified: PropTypes.string 
  };

  export default NoteListMain;