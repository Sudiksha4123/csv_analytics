
import axios from 'axios';
import { useState } from "react";

import React from 'react';
import Table from './Table';

function App () {

    const [selectedFile,setSelectedFile]=useState(null)
    const [columnList,setColumnList]=useState(null);
    const [rowList,setRowList]=useState(null);
    const [imgPath,setImgPath]=useState(null);
    const onFileChange = event => {
        console.log(event)
 
        // Update the state
        setSelectedFile(event.target.files[0]);
 
    };
 
    // On file upload (click the upload button)
    const onFileUpload = async () => {
 
        // Create an object of formData
        const formData = new FormData();
 
        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );
 
        // Details of the uploaded file
        console.log(selectedFile);
 
        // Request made to the backend api
        // Send formData object
        try {
          const response=await axios.post("http://localhost:8000/uploadCsv/", formData);
          console.log(response.data);
          setColumnList(response.data.columns);
          setRowList(response.data.rows);  
          setImgPath(response.data.processed_file_path);
        } catch (error) {
          console.log(error)
        }
        
    };

    const tableData = (columnList,rowList) => {
        if (columnList!=null && rowList!=null) {
            return (
                <div>
                    {Table(columnList,rowList)}
                </div>
            )
        } else {
            return null;
        }
    }
 
    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
 
        if (selectedFile) {
 
            return (
                <div>
                    <h1>File Details:</h1>
                    <p>File Name: {selectedFile.name}</p>
 
                    <p>File Type: {selectedFile.type}</p>
 
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
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
 
 
        return (
            <div>
                <h2>
                    File Upload:
                </h2>
                <div>
                    <input type="file" onChange={onFileChange} name="myFile"/>
                    <button onClick={onFileUpload}>
                        Upload!
                    </button>
                </div>
                {fileData()}
                    {rowList!=null && columnList!=null?tableData(columnList,rowList):null}
                    {imgPath?<img src={imgPath}></img>:null}
            </div>
        );
}
 
export default App
