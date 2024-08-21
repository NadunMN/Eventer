import  { useState } from 'react';
import { TextField, Button } from '@mui/material'; // Import TextField and Button from MUI
import axios from 'axios';

const Api_utl = "http://localhost";

const SearchForm = ({ setListOfEvents }) => {
    const [searchString, setSearchString] = useState(''); // State to hold the search input
    const [error, setError] = useState('');
    
    const handleSearchEvent = async(event) => {
        event.preventDefault();
        try {
            // eslint-disable-next-line no-undef
            const response = await axios.get(`${Api_utl}:5000/searchEvents`, {
                params: {title: searchString}
            });
            setListOfEvents(response.data);
            setError('')
        } catch (error) {
            setListOfEvents([]);
            setError("Event not found or error occurred!", error)
        }
    }

    return (
        <form onSubmit={handleSearchEvent}>
            <div className='serchContainer'>
                <TextField
                    label="Search Events"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)} // Update the search input
                />
                <Button type="submit" variant="contained" color="primary">Search</Button>
                {error && <p style={{color: 'red'}}> {error} </p>}
            </div>
        </form>
    );
};
export default SearchForm;
