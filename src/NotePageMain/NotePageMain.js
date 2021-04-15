import React from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import NoteContext from '../NoteContext';
import {findNote} from  '../notes-helper';
import PropTypes from 'prop-types';


class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NoteContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`);
  }

  render(){
    const { notes=[] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: '' };
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
  }

NotePageMain.propTypes = {
    match : PropTypes.shape({
        params: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
};

  export default NotePageMain;