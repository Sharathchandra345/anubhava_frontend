import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useEffect, useState } from 'react';
import star from '../../static/logos/star2.svg'
import date from '../../static/logos/date.svg'
import '../../static/css/parallax.css';

export default function HomeTimeline({ timelineArray }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 700);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div className={isMobile ? '' : 'parallax'} >
            <div className={isMobile ? '' : 'parallax-overlay'}>
                <VerticalTimeline
                    className="vertical-timeline-custom-line"
                    // lineColor={"#0f766e"} // default
                    // lineColor={'#58b368'} // 1
                    // lineColor={'#2b2d42'} // 2 // BLACK
                    lineColor={'#36528b'} // 3
                >
                    {timelineArray && timelineArray.map((item, index) => {
                        return (
                            <VerticalTimelineElement
                                key={index}
                                className="vertical-timeline-element--work border-r-7 border-primary-color md:block flex"
                                date={item['date']}
                                contentStyle={{ background: 'rgb(255, 255, 255)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
                                icon={<img className='md:h-12 md:ml-[6px] md:mt-[6px] h-8 ml-[4px] mt-[4px]' src={date} alt="date" />}
                                // iconStyle={{ background: '#0ea5e9', color: '#0f766e' }} // default
                                // iconStyle={{ background: '#58b368', color: '#0f766e' }} // 1
                                // iconStyle={{ background: '#2b2d42', color: '#0f766e' }} // 2
                                iconStyle={{ background: '#9db7ed', color: '#0f766e' }} // 3
                            >
                                <div className='flex flex-row justify-center items-center gap-4'>
                                    <div className='flex flex-col'>
                                        <div
                                            style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                                            className='rounded-lg flex items-center justify-center bg-primary-color p-4 h-16 w-16 text-light-color font-bold text-3xl'>
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className="text-primary-color text-lg font-bold">{item['heading']}</h3>
                                        <h4 className="">{item['subheading']}</h4>
                                        <p className='text-base'>
                                            {item['body']}
                                        </p>
                                    </div>
                                </div>

                            </VerticalTimelineElement>
                        )
                    })}

                    <VerticalTimelineElement
                        // iconStyle={{ background: '#2dd4bf', color: '#fff' }} // default
                        // iconStyle={{ background: '#309975', color: '#309975' }} // 1
                        // iconStyle={{ background: '#0D1B2A', color: '#0d1b2a' }} // 2 // BLACK
                        iconStyle={{ background: '#36528b', color: '#0F2550' }} // 3

                        icon={<img className='md:h-12 md:ml-[6px] md:mt-[6px]' src={star} alt="star" />}
                    />
                </VerticalTimeline>
            </div>
        </div>
    )
}
