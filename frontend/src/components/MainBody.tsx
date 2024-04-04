import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerDetails from './CustomerDetails';

interface Customer {
    _id: string;
    name: string;
    title: string;
    address: string
}

interface MainBodyProps {
    selectedCustomerId: string | null;
}

const MainBody: React.FC<MainBodyProps> = ({ selectedCustomerId }) => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const res = await axios.get(`https://cube-red-delta.vercel.app/user/${selectedCustomerId}`);
                setSelectedCustomer(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (selectedCustomerId) {
            fetchCustomerDetails();
        } else {
            setSelectedCustomer(null);
        }
    }, [selectedCustomerId]);

    return (
        <div className='main-body'>
            {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </div>
    );
}

export default MainBody;
