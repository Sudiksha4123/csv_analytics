
import axios from 'axios';
 
import React, { Component } from 'react';
class App extends Component {
 
    state = {
 
        // Initially, no file is selected
        selectedFile: null
    };
 
    // On file select (from the pop up)
    onFileChange = event => {
 
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
 
    };
 
    // On file upload (click the upload button)
    onFileUpload = async () => {
 
        // Create an object of formData
        const formData = new FormData();
 
        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
 
        // Details of the uploaded file
        console.log(this.state.selectedFile);
 
        // Request made to the backend api
        // Send formData object
        try {
          await axios.post("http://localhost:8000/uploadCsv/", formData).then(
            value => {
                console.log(value);
            }
          );  
        } catch (error) {
          console.log(error)
        }
        
    };
 
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
 
        if (this.state.selectedFile) {
 
            return (
                <div>
                    <h1>File Details:</h1>
                    <p>File Name: {this.state.selectedFile.name}</p>
 
                    <p>File Type: {this.state.selectedFile.type}</p>
 
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
 
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h3>Choose before Pressing the Upload button</h3>
                </div>
            );
        }
    };
 
    render() {
 
        return (
            <div>
                <h2>
                    File Upload using React!
                </h2>
                <div>
                    <input type="file" onChange={this.onFileChange} name="myFile"/>
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}
 
export default App
