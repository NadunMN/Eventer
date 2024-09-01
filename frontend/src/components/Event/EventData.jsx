// import { Container, Typography } from '@mui/material'
// import axios from 'axios'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventData() {
  const Api_url = "http://localhost";

  const { _id } = useParams();
  // const [eventDetails, setEventDetails] = useState(null)

  // useEffect(() => {
  //     if (_id) {
  //         axios
  //             .get(`http://localhost:5000/api/getEvent/${_id}`)
  //             .then((response) => setEventDetails(response.data))
  //             .catch((error) => console.error("Error fetching event details:" , error))
  //     }
  // },[_id])


  // if (!eventDetails) return <div>Loading...</div>;
  return (
    // <Container>
    //     <Typography variant='h4'>{eventDetails.title}</Typography>
    //     <Typography variant='h4'>{eventDetails.start_date}</Typography>
    //     <Typography variant='h4'>{eventDetails.venue}</Typography>
    // </Container>
    <>
      <dev> event data {_id} </dev>
    </>
  );
}
