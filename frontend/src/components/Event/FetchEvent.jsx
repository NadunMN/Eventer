import React, { useEffect, useState } from 'react';

const FetchEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/event/getEvent');
    
            let eventData = response.data;
    
     
            // Ensure eventData is an array
            if (!Array.isArray(eventData)) {
              eventData = [eventData];
            }
    
            // Process the event data
            const processedEvents = eventData.map((event) => {
              if (event.cover_image) {
                const base64Image = convertBinaryToBase64(
                  new Uint8Array(event.cover_image.data),
                  event.cover_image.contentType
                );
                event.cover_image = base64Image;
              }
              return event;
            });
    
            setEvents(processedEvents);
            setLoading(false);
          } catch (error) {
            console.error("Failed to fetch the event:", error);
            setError("Failed to fetch the event");
            setLoading(false);
          }
        };
    
        fetchEvent();
      }, []);
      
    return (
        <div>
            <h1>Events</h1>
            {events.map((event) => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
};

export default FetchEvent;