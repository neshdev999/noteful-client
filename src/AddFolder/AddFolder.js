import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NoteContext from '../NoteContext';
import config from '../config';
import './AddFolder.css';
import ValidationError from '../ValidationError';

class AddFolder extends Component{

    static defaultProps = {
        history:{
            push: () => {}
        },
    }

    static contextType = NoteContext;

    constructor(props){
        super(props);
        this.state = {
            fname : "",
            errorMessage : {
                textHere : "You must enter a folder title"
            }
        };
    }

    validateForm = (value) =>{
        if (value.trim().length === 0) {
            let newText = 'Folder name is required.';
            this.setState({
                errorMessage:{
                    textHere: newText
                }
            });
        } else if (value.length < 3) {
            let newText = "Name must be at least 3 characters long";
            this.setState({
                errorMessage:{
                    textHere: newText
                }
            });           
        } else if(value.length > 3){
            let newText = "You are fine";
            this.setState({
                errorMessage:{
                    textHere: newText
                }
            });
        }
    }

    handleFnameChange = (event) =>{
        event.preventDefault();
        this.setState({fname: event.target.value});
        this.validateForm(event.target.value);
    }

    


    handleSubmit = e => {
        e.preventDefault();
        // const folder = {
        //     name: e.target['folder-name'].value
        // }
        const folder = {
            name: this.state.fname
        }
        fetch(`${config.API_ENDPOINT}/folders`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e));
            }
            return res.json()
        })
        .then(folder => {
            this.context.addFolder(folder);
            this.props.history.push(`/folder/${folder.id}`);
        })
        .catch(error => {
            console.log({error});
            this.setState({
                hasError: true,
                errorText: {error}                     
            }, 
            ()=>{
                throw new Error('A server error has occured while adding new folder 🙃.\n Details: ' + this.state.errorText.error);
            });
        });
    }

    render(){
        const { fname } = this.state;
        const isEnabled = fname.length > 3;
        const errorMessage = this.state.errorMessage;
        return(
            <section className='AddFolder'>
                <h2>Create a folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor='folder-name-input'>
                            Name
                        </label>
                        <input type='text' id='folder-name-input' name='folder-name' value={this.state.fname} onChange={this.handleFnameChange}/>
                        {errorMessage.textHere.length > 0 && (<ValidationError message={errorMessage.textHere}/>)}
                    </div>
                    <div className="buttons">
                        <button type='submit' disabled={!isEnabled}>
                            Add folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        );
    }
}

export default AddFolder;