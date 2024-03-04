import React from 'react';
import '../../static/css/home_timer.css'
export default function HomeTimer() {
  return (
    <div className='bg-primary-lighter md:p-10 p-5 w-full md:h-96 h-64 flex-col flex items-center justify-center gap-4 md:mt-10 mt-3'>
      <h1 className="font-bold md:text-5xl text-2xl text-center text-primary-color font-baloo-paaji">
        APPLICATIONS CLOSED!
      </h1>
      <div className='flex flex-row items-center justify-center md:gap-4 gap-2'>

        <h1 className='font-bold text-primary-color md:text-9xl text-5xl font-baloo-paaji'>
          21st - 24th April
        </h1>
      </div>

      <h1 className='mt-5 text-primary-color font-bold font-baloo-paaji'>Check the schedule</h1>
      <div>
        <svg className='transform -rotate-90 fill-primary-color' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 14.5H7.66L18.84 3.32L16 0.5L0 16.5L16 32.5L18.82 29.68L7.66 18.5H32V14.5Z" />
        </svg>
      </div>
    </div>

  )

}
