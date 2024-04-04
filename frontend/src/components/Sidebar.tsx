import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CustomerList from './CustomerList';

interface Customer {
    _id: string;
    name: string;
    title: string;
}

interface SidebarProps {
    handleSelectedCustomer: (id: string) => void;
    selectedCustomerId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ handleSelectedCustomer, selectedCustomerId }) => {
    const [list, setList] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const fetchUserList = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://cube-red-delta.vercel.app/user/?page=${page}`);
            setList(prevList => [...prevList, ...res.data]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (sidebarRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = sidebarRef.current;
            if (scrollTop + clientHeight >= scrollHeight && !loading) {
                console.log("bottom reached...");
                fetchUserList();
            }
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <div className='sidebar' ref={sidebarRef} onScroll={handleScroll}>
            {list?.map((customer, index) => (
                <CustomerList
                    key={customer._id + index}
                    customer={customer}
                    handleSelectedCustomer={handleSelectedCustomer}
                    isSelected={selectedCustomerId === customer._id}
                />
            ))}
            {loading && <div className="spinner"></div>}
        </div>
    );
}

export default Sidebar;