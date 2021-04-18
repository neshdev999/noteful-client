import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NoteContext from '../NoteContext';
import config from '../config';
import './AddNote.css';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

class AddNote extends Component{
    static defaultProps = {
        history: {
            push: () => {}
        },
    }

    static contextType = NoteContext;

    constructor(props){
        super(props);
        this.state = {
            noteName : "",
            noteContent: "",
            currentFolderID: "",
            noteErrorMessage : {
                noteNameMessage : 'You must enter a note title',   
                noteContentMessage: 'You must enter a note description',
                currentFolderIDMessage: 'You must select a folder'
            },
            noteNameIndicator: false,
            noteContentIndicator: false,
            noteFolderIDIndicator: false
        };
    }

    handleNoteNameChange = (event) =>{
        this.setState({noteName: event.target.value});
        this.validateNoteName(event.target.value);
    }

    handleNoteContentChange = (event) =>{
        this.setState({noteContent: event.target.value});
        this.validateNoteContent(event.target.value);
    }

    handleFolderIDChange = (event) =>{
        this.setState({currentFolderID: event.target.value});
        this.validateFolderType(event.target.value);
    }

    validateNoteName = (value) =>{
        if (value.trim().length === 0) {
            let newText = 'Note name is required.';
            const newItems = {
                ...this.state.noteErrorMessage,
                noteNameMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems
            });
        } else if (value.length < 3) {
            let newText = "Note name must be at least 3 characters long";
            const newItems = {
                ...this.state.noteErrorMessage,
                noteNameMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems
            });          
        } else if(value.length > 3){
            let newText = "You are fine..";
            const newItems = {
                ...this.state.noteErrorMessage,
                noteNameMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems,
                noteNameIndicator: true
            });
        }
    }


    validateNoteContent = (value) =>{
        if (value.trim().length === 0) {
            let newText = 'Note content is required.';
            const newItems = {
                ...this.state.noteErrorMessage,
                noteContentMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems
            });
        } else if (value.length < 10) {
            let newText = "Note content must be 10 characters long";
            const newItems = {
                ...this.state.noteErrorMessage,
                noteContentMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems
            });          
        } else if(value.length > 3){
            let newText = "You are fine..";
            const newItems = {
                ...this.state.noteErrorMessage,
                noteContentMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems,
                noteContentIndicator: true
            });
        }
    }

    validateFolderType = (value) =>{
        if (value === "") {
            let newText = 'You must choose valid folder type';
            const newItems = {
                ...this.state.noteErrorMessage,
                currentFolderIDMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems
            }); 
        }else{
            let newText = 'You are fine..';
            const newItems = {
                ...this.state.noteErrorMessage,
                currentFolderIDMessage: newText
            }
            this.setState({
                noteErrorMessage : newItems,
                noteFolderIDIndicator: true
            }); 
        } 
    }

    handleSubmit = e => {
        e.preventDefault();
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            // name: this.state.noteName,
            // content: this.state.noteContent,
            // folderId: this.state.currentFolderID,
            modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
          })
        .then(res => {
            if (!res.ok){
                return res.json().then(e => Promise.reject(e));
            }
                return res.json();
        })
        .then(note => {
            this.context.addNote(note);
            this.props.history.push(`/folder/${note.folderId}`);
        })
        .catch(error => {
            console.error({ error });
            this.setState({
                hasError: true,
                errorText: {error}                     
            }, 
            ()=>{
                throw new Error('A server error has occured while adding new note 🙃.\n Details: ' + this.state.errorText.error);
            });
        });
    }

    render(){
        const { folders = [] } = this.context;
        const {noteNameIndicator, noteContentIndicator, noteFolderIDIndicator} = this.state;
        const isEnabled = noteNameIndicator && noteContentIndicator && noteFolderIDIndicator;
        let noteErrorMessage = this.state.noteErrorMessage;
  
        return(
            <section className="AddNote">
                <h2>Create a note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name
                        </label>
                        <input type="text" id='note-name-input' name='note-name' value={this.state.noteName} onChange={this.handleNoteNameChange}/>
                        {noteErrorMessage.noteNameMessage.length > 0 && <ValidationError message={noteErrorMessage.noteNameMessage}/> }
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content' value={this.state.noteContent} onChange={this.handleNoteContentChange} />  
                        {noteErrorMessage.noteContentMessage.length > 0 && <ValidationError message={noteErrorMessage.noteContentMessage}/> }   
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id' value={this.state.currentFolderID} onChange={this.handleFolderIDChange}>
                        <option value="">Select a folder</option>
                            {folders.map(folder =>
                        <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>
                            )}
                        </select>
                        {noteErrorMessage.currentFolderIDMessage.length > 0 && <ValidationError message={noteErrorMessage.currentFolderIDMessage}/> }  
                    </div>
                    <div className='buttons'>
                        <button type='submit' disabled={!isEnabled}>
                            Add note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func
};

export default AddNote;