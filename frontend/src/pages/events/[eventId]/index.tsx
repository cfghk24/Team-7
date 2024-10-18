/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type EventType = {
    _id: string;
    name: string;
    photo: string;
    date: string;
    location: string;
    description: string;
}

const Index = () => {
    const {eventId} = useParams();
    
    const handleRegister = async ()=>{
        const userId = "6711fdb3a6f049c4ce3cd1c0"
        const res = await axios.post(`/api/events/${eventId}/register`, {user_id: userId});
        console.log(res.data);
    }
    
    const [event, setEvent] = useState<EventType | null>(null);
    useEffect(() => {
      const fetchEvent =async ()=>{
        const res = await axios.get(`/api/events/${eventId}`);
        setEvent(res.data);
      }
      fetchEvent();
  
    }, []);

    if(!event) return <p>Loading...</p>
  return (
    <div className='p-4'>
        <div className="w-full space-y-4">
            <a href="#">
                <img className="rounded-t-lg" src={event.photo} alt="" />
            </a>
            <div className="">
                <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight">{event.name}</h5>
                </a>
                <p className="mb-3 text-sm font-normal text-gray-700 line-clamp-3">{event.description}</p>
                <Button onClick={handleRegister} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Register
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Index