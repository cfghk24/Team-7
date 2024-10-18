import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
type EventType = {
  _id: string;
  name: string;
  photo: string;
  date: string;
  location: string;
  description: string;
}
const Review = () => {
  const {eventId} = useParams();
  const router = useRouter();
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

    <div className=' p-6'>
      <Header />
        <div className="w-full space-y-4">
            <a href="#">
                <img className="rounded-t-lg" src={event.photo} alt="" />
            </a>
            <div className="">
                <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight">{event.name}</h5>
                </a>
                
            </div>
        </div>
        <div>
        <Textarea placeholder="Type your message here." rows={6} />
        <Button onClick={ ()=> router.push("/events/reward")} className="bg-black w-full mt-6">Submit</Button>
        </div>
    </div>
  )
}

export default Review