import { Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function EventData() {
    const { id } = useParams()
    const [eventDetails, setEventDetails] = useState(null)

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5000/api/getEvent/${id}`)
                .then((response) => setEventDetails(response.data))
                .catch((error) => console.error("Error fetching event details:" , error))
        }
    },[id])
    
    if (!eventDetails) return <div>Loading...</div>;

  return (
    // <Container>
    //     <Typography variant='h4'>{eventDetails.title}</Typography>
    //     <Typography variant='h4'>{eventDetails.start_date}</Typography>
    //     <Typography variant='h4'>{eventDetails.venue}</Typography>
    // </Container>
    <>
    event data
    </>
  )
}
