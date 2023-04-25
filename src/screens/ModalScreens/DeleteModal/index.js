import { Modal } from "antd";
import { Box, Typography, Button } from '@material-ui/core';


const DeleteModal = ({open, handleClose, id, name }) => {

    const handleDelete = () => {

        fetch("https://mx914tztwk.execute-api.us-east-1.amazonaws.com/prod/printer", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({"printerId": id})
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });


        handleClose();
    }

    return (
        <Modal
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
        onCancel={handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box >
            <h2 id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete ?

            </h2>
            <p>Printer id: {id}</p>
            <p>Printer name: {name}</p>
            
        </Box>
        </Modal>
    );
}

export default DeleteModal;