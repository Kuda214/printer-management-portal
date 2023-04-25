import './styles.css';
import  TableRow from '../../components/TableRow';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react'
import AddModal from '../ModalScreens/AddModal';

const Home = () => {
    
    const [data, setData] = useState([]);
    const [addClicked, setAddClicked] = useState(false);

    useEffect(() => {
        fetch("https://mx914tztwk.execute-api.us-east-1.amazonaws.com/prod/printers", {mode: "cors"})
            .then(res => res.json())
            .then(data =>{
                 
                 setData(data.printers)})
            .catch(err => console.log("EHE ",err));
    }, [data]);

    const handleAdd = () => {
        setAddClicked(true);
    }

    return (
        <div className="content">
            <Button className='button' icon={<PlusCircleOutlined/>} onClick={handleAdd}>
                Add new printer
            </Button>

            <AddModal open={addClicked} handleClose={() => setAddClicked(false)} />

            <table className="table">
                <thead  >
                    <tr className="tr">
                        <th className="th round1st">Printer Id</th>
                        <th className="th">Printer Name</th>
                        <th className='th'>Printer IP</th>
                        <th className="th">Status</th>
                        <th className="th round2nd">Actions</th>
                    </tr>
                </thead>
            </table>

            {
                data.map((item,index) => {
                    return <TableRow key={index} id={item.printerId} ip={item.printerIP} status={item.printerStatus} name={item.printerName} />
                })
            }
                   

        </div>
    );
};

export default Home;