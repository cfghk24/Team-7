import React from 'react'

const index = () => {
    const event = {
        _id: "1",
        name: "Hong Kong Art Fair",
        photo: "https://res.cloudinary.com/nowo-ltd/image/upload/v1729224353/codeforgood/group-people-smiling-happy-drawing-sitting-floor-art-studio_839833-8065_fcwxok.jpg",
        date: "2023-11-15",
        location: "Hong Kong Convention Center",
        description: "Join us for the Hong Kong Art Fair, a vibrant celebration of contemporary art featuring renowned artists from around the world. Discover a diverse range of artworks, from paintings and sculptures to digital installations, all under one roof."
    }
  return (
    <div className='p-4'>
        <div className="w-full">
            <a href="#">
                <img className="rounded-t-lg" src={event.photo} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight">{event.name}</h5>
                </a>
                <p className="mb-3 text-sm font-normal text-gray-700 line-clamp-3">{event.description}</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Register
                </a>
            </div>
        </div>
    </div>
  )
}

export default index