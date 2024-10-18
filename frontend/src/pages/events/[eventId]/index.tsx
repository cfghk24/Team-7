/* eslint-disable react-hooks/exhaustive-deps */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from "next/link";

type EventType = {
    _id: string;
    name: string;
    photo: string;
    date: string;
    location: string;
    description: string;
}

const SuccessDialog = ()=>{
    const router = useRouter();
    return(
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
            <div className=" rounded-lg w-[300px] bg-red-100 p-10 space-y-6 border-black">
                <div>
                    <p className=" font-bold text-base">Success</p>
                    <p className=" font-regular text-sm">Event registed successfully!</p>
                </div>
                <Button onClick={()=> router.push("/events")} className="bg-black text-white w-full">Ok</Button>
            </div>
                
        </div>
    )
}

const FailDialog = ()=>{
    const router = useRouter();
    return(
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
            <div className=" rounded-lg w-[300px] bg-red-100 p-10 space-y-6 border-black">
                <div>
                    <p className=" font-bold text-base">Success</p>
                    <p className=" font-regular text-sm">Event registed successfully!</p>
                </div>
                <Button onClick={()=> router.push("/events")} className="bg-black text-white w-full">Ok</Button>
            </div>
                
        </div>
    )
}

const Index = () => {
    const router = useRouter();
    const {eventId} = useParams();
    const [isSuccess, setIsSuccess] = useState(false);

    const {toast} = useToast();
    
    const handleRegister = async ()=>{
        try {
            const userId = "6711fdb3a6f049c4ce3cd1c0"
            const res = await axios.post(`/api/events/${eventId}/register`, {user_id: userId});
            console.log(res.data);
            setIsSuccess(true);
            
        } catch (error) {
            console.log(error);
        }
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
    <div className='p-4 space-y-5'>
        <Header />
        <div className="w-full space-y-4">
            <a href="#">
                <img className="rounded-t-lg" src={event.photo} alt="" />
            </a>
            <div className="">
                <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight">{event.name}</h5>
                </a>
                <div className=" flex justify-between">
                    <div className="mb-4">
                        <p className=' font-light text-sm'>{event.date}</p>
                        <p className=' font-light text-sm'>{event.location}</p>
                    </div>
                    <Button onClick={handleRegister} className="bg-black">Register</Button>
                </div>
                <p className="mb-3 text-sm font-normal text-gray-700">{event.description}</p>
                
            </div>
        </div>
        <hr />
        <div>
            <div className="flex justify-between mb-4">
                <h1 className=" font-bold text-2xl">Reviews</h1>
                <Button onClick={()=> router.push(`/events/${eventId}/review`)}>Create Review</Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <ReviewCard 
                    review={{username: "John Doe", content: "This is a great event. We had fun and encourgaged to involve creativity in our work", photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729239064/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok_itpyxv.jpg"}} 
                />
                <ReviewCard 
                    review={{username: "Peter Tsui", content: "This is going to be the new age of crativity. The kids enjoyed it and it was great time to bond", photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729239514/codeforgood/top-side-view-dark-skinned-boy-painting-indoors_259150-59525_h5m8sv.jpg"}} 
                />
            </div>

        </div>
        {isSuccess && <SuccessDialog />}
    </div>
  )
}

type  Review = {
    username: string;
    content: string;
    photo: string;
}
const ReviewCard = (props: {review: Review})=>{
    const {review} = props;
    return(
        <div className="flex flex-col space-y-5">
            <img className="rounded-md" src={review.photo} alt="" />
            <div className=" space-y-3">
                <p className=" font-bold text-sm" >{review.username}</p>
                <p className=" text-sm">{review.content}</p>
            </div>
        </div>
    )
}

export default Index