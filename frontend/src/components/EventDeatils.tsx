import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';

interface EventDetail {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    eventType: string;
    price?: number;
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
    
            const response = await fetch(`https://zorra-lxsj.onrender.com/event/${id}`);
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
    <div className='p-5'>
        EventDeatils
        {event?.shortDescription}
    </div>
  )
}

export default EventDeatils