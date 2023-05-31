 async function addFilePath(filePath){
    /* Initializing the schema and putting in CRUDcreate */
    const CRUDcreate = new CsvUploads ({
        uploaded_filepath: filePath,
    });
 
    /* Try Catch */
    try{
        /* Saving the data in mongoose */
        const savedCRUD = await CRUDcreate.save();
        /* Sending the response back */
        res.status(200);
        res.send(savedCRUD);
    }catch(err){
        /* Sending the error back */
        res.status(400).send(err);
    }  
}