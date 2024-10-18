import Link from 'next/link';
import React from 'react'

const EVENTS = [
    {
        _id: "1",
        name: "Hong Kong Art Fair",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2023-11-15",
        location: "Hong Kong Convention Center",
        description: "Join us for the Hong Kong Art Fair, a vibrant celebration of contemporary art featuring renowned artists from around the world. Discover a diverse range of artworks, from paintings and sculptures to digital installations, all under one roof."
    },
    {
        _id: "2",
        name: "Street Art Festival",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2023-12-01",
        location: "Central District",
        description: "Experience the dynamic world of street art at the Hong Kong Street Art Festival. Witness live mural paintings, graffiti workshops, and interactive art installations that transform the cityscape into a colorful canvas."
    },
    {
        _id: "3",
        name: "Art Basel Hong Kong",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-03-21",
        location: "Hong Kong Exhibition Centre",
        description: "Art Basel Hong Kong is a premier art event showcasing a curated selection of galleries and artists from Asia and beyond. Explore cutting-edge contemporary art and engage with artists and collectors in this prestigious event."
    },
    {
        _id: "4",
        name: "Digital Art Expo",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-04-10",
        location: "Cyberport",
        description: "Dive into the future of art at the Digital Art Expo, where technology meets creativity. Explore immersive virtual reality experiences, interactive digital installations, and innovative artworks that push the boundaries of traditional art forms."
    },
    {
        _id: "5",
        name: "Sculpture Park",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-05-05",
        location: "Victoria Park",
        description: "Stroll through the Sculpture Park in Victoria Park, featuring stunning outdoor sculptures by local and international artists. Enjoy a day of art and nature as you explore these captivating works set against the backdrop of Hong Kong's skyline."
    },
    {
        _id: "6",
        name: "Art in the Park",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-06-12",
        location: "Kowloon Park",
        description: "Art in the Park is a family-friendly event that brings art to the heart of Kowloon Park. Participate in art workshops, enjoy live performances, and explore a variety of art installations in a relaxed and creative environment."
    },
    {
        _id: "7",
        name: "Contemporary Art Showcase",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-07-20",
        location: "PMQ",
        description: "Discover the latest trends in contemporary art at the PMQ Contemporary Art Showcase. Featuring emerging artists and innovative artworks, this event offers a platform for new voices in the art world to share their unique perspectives."
    },
    {
        _id: "8",
        name: "Art and Design Week",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-08-15",
        location: "Hong Kong Design Centre",
        description: "Art and Design Week is a celebration of creativity and innovation, bringing together artists, designers, and creatives from various disciplines. Attend exhibitions, talks, and workshops that explore the intersection of art and design."
    },
    {
        _id: "9",
        name: "Photography Festival",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-09-10",
        location: "Hong Kong Cultural Centre",
        description: "Capture the world through the lens at the Hong Kong Photography Festival. Featuring exhibitions, talks, and workshops by renowned photographers, this event is a must-visit for photography enthusiasts and professionals alike."
    },
    {
        _id: "10",
        name: "Art and Music Fusion",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2024-10-05",
        location: "West Kowloon Cultural District",
        description: "Experience the harmonious blend of art and music at the Art and Music Fusion event. Enjoy live performances, art installations, and collaborative projects that showcase the synergy between visual and auditory art forms."
    }
    
]

type EventType = {
    _id: string;
    name: string;
    photo: string;
    date: string;
    location: string;
    description: string;
}

const EventCard = (props: {event: EventType}) => {
    const event = props.event;
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
const index = () => {
  return (
    <div className='space-y-6 p-4'>
        <h1 className=' font-bold text-2xl'>Events</h1>
        <div className='grid grid-cols-2 gap-3'>
            {EVENTS.map((event) => (
                <EventCard event={event} key={event._id} />
            ))}
        </div>
    </div>
  )
}

export default index