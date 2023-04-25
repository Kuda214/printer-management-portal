import { Dropdown, Modal } from "antd";
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { useState } from "react";
import { Menu } from 'antd';


const AddModal = ({open, handleClose, id, name }) => {

    const [pName, setPName] = useState("");
    const [pIP, setPIP] = useState("");

    const idCreation = () => {
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        return seq;
    }

    const handleAdd = () => {
        var printerId = idCreation();
        fetch("https://mx914tztwk.execute-api.us-east-1.amazonaws.com/prod/printer", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            method: "POST",

            body: JSON.stringify({"printerId": printerId, "printerName": pName, "printerIP": pIP, "printerStatus": true})
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

    const menu = [
        true,
        false
    ]

    return (
        <Modal
        onOk={handleAdd}
        okText="Add"
        cancelText="Cancel"
        onCancel={handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box >
            <h2 id="modal-modal-title" variant="h6" component="h2">
            Let's add a new Printer
            </h2>

            <TextField onChange={(e)=> setPName(e.target.value)} label={"Printer Name: "} type={"text"} required={true} /> <br/> <br/>
            <TextField onChange={(e)=> setPIP(e.target.value)} label={"Printer IP: "} type={"text"} required={true} /> 
            {/* <TextField onChange={(e)=> setPStatus(e.target.value)} label={"Printer Status: "} type={"text"} required={true} defaultValue={true} /> <br/> */}

           

        </Box>
        </Modal>
    );
}

export default AddModal;