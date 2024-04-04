import React from 'react';

interface Customer {
    _id: string;
    name: string;
    title: string;
}

interface CustomerListProps {
    customer: Customer;
    handleSelectedCustomer: (id: string) => void;
    isSelected?: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({ customer, handleSelectedCustomer,isSelected = false}) => {
    const handleClick = () => {
        handleSelectedCustomer(customer._id);
    }

    return (
        <div className={`customer-card ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            <h3>{customer.name}</h3>
            <p>{customer.title}</p>
        </div>
    );
}

export default CustomerList;
