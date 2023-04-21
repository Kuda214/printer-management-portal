import { useState } from 'react';
import { Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

import './styles.css';

const TableRow = ({printerId, printerIP, printerStatus}) => {

    const [active, setActive] = useState(false);

    const handleToggleActive = () => {
      setActive((prevState) => !prevState);
    };

    return (
        <table className="table">
            <tr className="tr">
                <td>1</td>
                <td className=''>1122:090:992</td>
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
                    <EditOutlined className='icon' />
                    <DeleteOutlined className='icon'/>
                </td>
            </tr>
        </table>
    );

};

export default TableRow;