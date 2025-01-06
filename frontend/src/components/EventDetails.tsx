import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import OrderButton from "./OrderButton"

interface EventDetail {
    id: string;
    adminId: string;
    availableTickets: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    eventType: string;
    price?: number;
    date: string;
    image: string;
  }

const EventDeatils:React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvents] = useState<EventDetail | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchevent = async () => {
          try {
            // if (!id || isNaN(Number(id))) {
            //   throw new Error('Invalid event ID');
            // }
    
            const response = await fetch(`http://localhost:5000/event/${id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch event details');
            }
    
            const data: EventDetail = await response.json();
            console.log(data)
            setEvents(data);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          } finally {
            setLoading(false);
          }
        };
        fetchevent();
      }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!event) return <p>Product not found</p>;
  return (
    <div className='p-8 md:p-10 mb-8 flex-col md:flex-row md:flex flex-none'>
        <div className=''>
          <p className="text-sm mb-2">Event title: </p>
          <p className="text-2xl md:text-4xl font-bold mb-12">{event.title}</p>
            <div className="inf0 mt-5">
              <p className="text-lg font-bold underline my-3 text-black">Event details:</p>
              <div className="flex">
                <img width="20" height="12" className="mr-2" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar--v1"/>
                <p className=" text-sm">{new Date(event.date).toDateString()}</p>
              </div>
              <div className="flex">
              {/* <img width="50" height="50" className="mr-2" src="https://img.icons8.com/carbon-copy/100/ticket.png" alt="ticket"/> */}
              <p className="my-4 text-sm">Available tickets: {event.availableTickets}</p>
              </div>
              <p className="font-bold my-4 text-sm"><span className="font-normal">Price: </span> {event.price || event.eventType}</p>
            <div>
            <p className="font-normal text-sm">{event.shortDescription}</p>
            <p className="font-normal my-3 text-sm">{event.longDescription}</p>
            <Link to={`/user/userInfo/${event.adminId}`}>
              <p className="underline text-blue-500 text-sm">About The Organizer</p>
            </Link>
        </div>
          </div>
        </div>
        <OrderButton />

    </div>
  )
}

export default EventDeatils