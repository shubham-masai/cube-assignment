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
}

const Sidebar: React.FC<SidebarProps> = ({ handleSelectedCustomer }) => {
    const [list, setList] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);

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
        if (containerRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollHeight - scrollTop === clientHeight && !loading) {
                fetchUserList();  // this gives error
            }
        }
    };

    useEffect(() => {

        fetchUserList();
    }, [page]);



    return (
        <div className='sidebar' ref={containerRef} onScroll={handleScroll}>
            {list?.map((customer, index) => (
                <CustomerList
                    key={customer._id + index}
                    customer={customer}
                    handleSelectedCustomer={handleSelectedCustomer}
                />
            ))}
            {loading && <div className="spinner"></div>}
        </div>
    );
}

export default Sidebar;