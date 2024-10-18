import Header from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import React from 'react'

const Reward = () => {
    const router = useRouter();
  return (
    <div className=' p-6'>
        <Header />
        <div className='mt-[200px] flex justify-center flex-col space-y-9'>
            <div className=' rounded-md border border-black flex flex-col p-6 justify-center items-center h-auto'>
                <p className=' font-sm'>You have earned points</p>
                <p className=' font-bold text-2xl text-orange-500'>10 points</p>
            </div>
            <Button onClick={ () => router.push("/events")} className="bg-black text-white w-full">Ok</Button>
        </div>

    </div>
  )
}

export default Reward