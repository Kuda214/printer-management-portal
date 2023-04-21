import './styles.css';
import  TableRow from '../../components/TableRow';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Home = () => {
    return (
        <div className="content">
            <Button className='button' icon={<PlusCircleOutlined/>}>
                Add new printer
            </Button>

            <table className="table">
                <thead  >
                    <tr className="tr">
                        <th className="th round1st">Printer Id</th>
                        <th className='th'>Printer IP</th>
                        <th className="th">Status</th>
                        <th className="th round2nd">Actions</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                <TableRow />
            </tbody>

        </div>
    );
};

export default Home;