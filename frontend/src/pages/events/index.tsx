import Header from '@/components/shared/Header';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type EventType = {
    _id: string;
    name: string;
    photo: string;
    date: string;
    location: string;
    description: string;
}

const EventCard = (props: {event: EventType}) => {
    const { event } = props;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg" src={event.photo} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-lg font-bold tracking-tight">{event.name}</h5>
            </a>
            <p className="mb-3 text-sm font-normal text-gray-700 line-clamp-3">{event.description}</p>
            <Link href={`/events/${event._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                Read more
            </Link>
        </div>
    </div>

  )
}

const EventsList = ()=>{
    const [events, setEvents] = useState<EventType[]>([]);
    useEffect(()=>{

        const fetchEvents = async () => {
            try {
                const res = await axios('/api/events');
                setEvents(res.data);
                console.log(res);
            } catch (error) {
                console.log("error occured");
                
                console.log(error);
            }
        }
        fetchEvents();
    }, [])
    return (
        <div className='grid gap-3'>
            
            {events && events.map((event) => (
                <EventCard event={event} key={event._id} />
            ))}
        </div>
    )
}
const index = () => {
  return (
    <div className='space-y-6 p-4'>
        <Header />
        <h1 className=' font-bold text-xl'>Recent Events</h1>
        <EventsList />   
    </div>
  )
}

export default index