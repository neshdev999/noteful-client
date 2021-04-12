import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
});

export default NoteContext;