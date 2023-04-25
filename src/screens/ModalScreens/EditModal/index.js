import { Dropdown, Modal } from "antd";
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { useState } from "react";
import { Menu } from 'antd';


const EditModal = ({open, handleClose, id, name,ip ,status}) => {

    const [pName, setPName] = useState(name);
    const [pIP, setPIP] = useState(id);

    const idCreation = () => {
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        return seq;
    }

    const handleEdit = () => {
        const printerId = id;
        const updateData = {
            "printerId": id,
            "printerIP": pIP,
            "printerName": pName,
            "printerStatus": status
        }
        
        fetch("https://mx914tztwk.execute-api.us-east-1.amazonaws.com/prod/printer", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            method: "PATCH",	
   
            // Fields that to be updated are passed
            body: JSON.stringify(updateData)
        })
       .then(function (response) {
   
       console.log(response);
       return response.json();
       })
       .then(function (data) {
       console.log(data);
       });

        handleClose();
    };

    

    return (
        <Modal
        onOk={handleEdit}
        onCancel={handleClose}
        okText="Save"
        cancelText="Cancel"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box >
            <h2 id="modal-modal-title" variant="h6" component="h2">
            Let's add a new Printer
            </h2>

            <TextField onChange={(e)=> setPName(e.target.value)} label={"Printer Name: "} type={"text"} required={true} defaultValue={name} /> <br/><br/>
            <TextField onChange={(e)=> setPIP(e.target.value)} label={"Printer IP: "} type={"text"} required={true}  defaultValue={ip}/> 

           

        </Box>
        </Modal>
    );
}

export default EditModal;