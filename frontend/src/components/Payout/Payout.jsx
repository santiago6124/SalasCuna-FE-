import React, {useEffect, useState} from 'react';

import '../AddChildren/AddChildren.css';

import Col from 'react-bootstrap/Col/';
import Row from 'react-bootstrap/Row/';
import Form from 'react-bootstrap/Form/';
import {Button} from 'react-bootstrap';
import axios from 'axios';

export default function Payout() {
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');

    useEffect(() => {
        ListZones();
    }, []);

    const ListZones = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ZoneViewSet/');
            setZones(response.data.results); // Use response.data.results
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedZone(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const payload = {
            amount: formData.get('amount'),
            date: formData.get('date'),
            zone: formData.get('zone'),
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/payout/', payload);

            if (response.status === 201) {
                console.log('Payout added successfully');
                // Perform any further actions, such as refreshing the UI
            } else {
                console.log('Failed to add payout');
            }
        } catch (error) {
            console.error('An error occurred while adding payout:', error);
        }
    };

    return (
        <div>
            <h1>Add Payout</h1>
            <form onSubmit={handleSubmit}>
                <label>Amount:</label>
                <input type="number" name="amount" required />
                <br />
                <label>Date:</label>
                <input type="date" name="date" required />
                <br />
                <label>Zone:</label>
                <select name="zone" onChange={handleSelectChange} value={selectedZone}>
    <option value="">Select a zone</option>
    {zones.map((zone) => (
        <option key={zone.id} value={zone.id}>
            {zone.name}
        </option>
    ))}
</select>
                <br />
                <button type="submit">Add Payout</button>
            </form>
        </div>
    );
}