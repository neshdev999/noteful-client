import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddNote from '../AddNote/AddNote';
import AddFolder from '../AddFolder/AddFolder';
// import dummyStore from '../dummy-store';
import config from '../config';
import './App.css';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import AppError from '../AppError/AppError';



class App extends Component {
    state = {
        notes: [],
        folders: [],
        hasError: false,
        errorMessage: ""
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
                this.setState({
                    hasError: true,
                    errorMessage: {error}                     
                //}, 
                // ()=>{
                //     throw new Error('A server error has occured 🙃!' + this.state.errorMessage.error);
                });

            });            
    }


    handleAddFolder = folder => {
        this.setState({
        folders: [
        ...this.state.folders,
        folder
        ]
        });
    };

    handleAddNote = note => {
        this.setState({
        notes: [
        ...this.state.notes,
        note
        ]
        });
    };

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        // component={NoteDashMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route
                    path='/add-folder'
                    component={AddFolder} 
                />
                <Route
                    path='/add-note'
                    component={AddNote}
                />
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote
        }
        return (
            <NoteContext.Provider value={contextValue}>
                <div className="App">             
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <AppError>           
                    {this.state.errorMessage.length === 0 ? <main className="App__main">{this.renderMainRoutes()}</main> : "Server data is not available"}   
                    </AppError>                     
                </div>
            </NoteContext.Provider>
        );
    }
}

App.propTypes = {
    match : PropTypes.shape({
        params: PropTypes.object
    }),
    onDeleteNote:  PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    onChange: PropTypes.func
};

export default App;