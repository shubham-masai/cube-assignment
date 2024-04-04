import React, { useEffect, useState } from 'react';
import axios from "axios";
interface Customer {
    _id: string;
    name: string;
    title: string;
    address: string
}

interface CustomerDetailsProps {
    customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
    const [randomImages, setRandomImages] = useState<string[]>([]);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const id = setInterval(fetchRandomImages, 10000);
        setIntervalId(id);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);


    const fetchRandomImages = async () => {
        try {
            setLoading(true);
            const photoPromises = Array.from({ length: 9 }).map(async (_, index) => {
                const response = await axios.get(`https://source.unsplash.com/random/200x200?sig=${index}`);
                return response.request.responseURL;
            });

            const newPhotos = await Promise.all(photoPromises);
            setRandomImages(newPhotos);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching random images:', error);
        }
    };

    return (
        <div >
            <div className='text-details'>
                <h2>{customer.name}</h2>
                <p>{customer.title}</p>
                <p>{customer.address}</p>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className='images-div'>
                    {randomImages.map((imageUrl, index) => (
                        <div key={index} className='image-container'>
                            <img src={imageUrl} alt={`Random Image ${index}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomerDetails;
