import { useState } from 'react';
import { Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../../screens/ModalScreens/DeleteModal';
import './styles.css';
import EditModal from '../../screens/ModalScreens/EditModal';
// import { DeleteModal } from '../../screens/ModalScreens/DeleteModal';

const TableRow = ({id, ip, status, name}) => {

    const [active, setActive] = useState(status);
    const [deleteCliked, setDeleteClicked] = useState(false);
    const [editCliicked, setEditClicked] = useState(false);

    const handleToggleActive = () => {
        setActive(!active);
      //TODO: Update status in DB
        
        const printerId = id;
        const updateData = {
            "printerId": printerId,
            "printerIP": ip,
            "printerName": name,
            "printerStatus": !active
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
    };

    const handleDeleteClick = () => {
        setDeleteClicked(true);


    }

    return (
        <table className="table">
            <tr className="tr">
                <td>{id}</td>
                <td>{name}</td>
                <td className=''>{ip}</td>
                <td className="round2nd">
                <Switch
                    checked={active}
                    onChange={handleToggleActive}

                    checkedChildren={<span style={{ color: 'white' }}>Active</span>}
                    unCheckedChildren={<span style={{ color: 'white' }}>Inactive</span>}
                    className={active ? 'switch-active' : 'switch-inactive'}
                />
                </td>
                <td>
                    <EditOutlined className='icon' onClick={() => setEditClicked(true)} />
                    <EditModal  id={id} name={name} ip={ip} status={status} open={editCliicked} handleClose={() => setEditClicked(false)} />

                    <DeleteOutlined className='icon' onClick={handleDeleteClick}  />
                    <DeleteModal id={id} name={name} open={deleteCliked} handleClose={() => setDeleteClicked(false)} />
                </td>
            </tr>
        </table>
    );

};

export default TableRow;