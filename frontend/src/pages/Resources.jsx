import React from 'react'
import PageBanner from '../components/PageBanner'
import resource1 from '../static/images/resource_1.jpg'
import resource2 from '../static/images/resource_interview.jpg';
import banner from '../static/images/ResourcesBanner.jpg'
export default function Resources() {
    // scroll to top
    window.scrollTo(0, 0);
    document.title = "Resources";
    return (
        <div className='md:mt-20 mt-[65px] flex flex-col'>
            <PageBanner
                image={banner}
                bannerText={'Resources'}
            />
            <div className='flex my-10 flex-col md:flex-row  items-center justify-center md:gap-10'>
                <div>
                    <div className='flex flex-row gap-2 items-center mb-5 px-12'>
                        <svg className='fill-dark-color' width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 28.5H24V32.5H8V28.5ZM8 20.5H24V24.5H8V20.5ZM20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.78 40.5 3.98 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM28 36.5H4V4.5H18V14.5H28V36.5Z" />
                        </svg>
                        <h1 className='text-3xl md:text-4xl font-semibold text-dark-color'><span className='text-primary-color'>Resume</span> Template</h1>
                    </div>

                    <div className='flex flex-col gap-4 px-12 my-2 items-center'>
                        <img className='w-[310px] h-[200px] rounded-lg' src={resource1} />

                        <div
                            onClick={() => {
                                window.open('https://bit.ly/Sample_Resume_Ignite')
                            }}
                            className="cursor-pointer flex rounded-xl flex-row gap-2 w-[200px] h-[48px] bg-primary-color items-center justify-center text-light-color font-semibold text-center">
                            <svg className='fill-light-color' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 11V14H2.5V11H0.5V14C0.5 15.1 1.4 16 2.5 16H14.5C15.6 16 16.5 15.1 16.5 14V11H14.5ZM13.5 7L12.09 5.59L9.5 8.17V0H7.5V8.17L4.91 5.59L3.5 7L8.5 12L13.5 7Z" />
                            </svg>
                            <h1>Download</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-row gap-2 items-center mb-5 px-12'>
                        <svg className='fill-dark-color' width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 28.5H24V32.5H8V28.5ZM8 20.5H24V24.5H8V20.5ZM20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.78 40.5 3.98 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM28 36.5H4V4.5H18V14.5H28V36.5Z" />
                        </svg>
                        <h1 className='text-3xl md:text-4xl font-semibold text-dark-color'><span className='text-primary-color'>Interview</span> Preparation</h1>
                    </div>

                    <div className='flex flex-col gap-4 px-12 my-2 items-center'>
                        <img className='w-[310px] h-[200px] rounded-lg' src={resource2} />

                        <div
                            onClick={() => {
                                window.open('https://drive.google.com/drive/folders/1ARKlh9s1yMDThVG9TRL9ulVcoLnRQIPt?usp=share_link')
                            }}
                            className="cursor-pointer flex rounded-xl flex-row gap-2 w-[200px] h-[48px] bg-primary-color items-center justify-center text-light-color font-semibold text-center">
                            <svg className='fill-light-color' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 11V14H2.5V11H0.5V14C0.5 15.1 1.4 16 2.5 16H14.5C15.6 16 16.5 15.1 16.5 14V11H14.5ZM13.5 7L12.09 5.59L9.5 8.17V0H7.5V8.17L4.91 5.59L3.5 7L8.5 12L13.5 7Z" />
                            </svg>
                            <h1>Download</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}