import React from 'react'
import Accordion from '../components/HowToApplyComponents/AccordionComponent'
import YouTubeBanner from '../components/HowToApplyComponents/YouTubeBanner'
import PageBanner from '../components/PageBanner'
import banner from '../static/images/HowToApplyBanner.jpg'
import youtube from '../static/images/HowToApplyYoutube.png'
function HowToApply() {
    document.title = "How To Apply";
    // scroll to top 
    window.scrollTo(0, 0);
    return (
        <div className="md:mt-20 mt-[65px] flex flex-col">

            <PageBanner
                image={banner}
                bannerText={'How to apply'}
            />
            <YouTubeBanner
                image={youtube}
                link={'https://www.youtube.com/playlist?list=PLySNCsn_f6eIao6J3zslEOZcckFN2RwLn'}
            />
            <div className='flex flex-col gap-5 md:px-10 px-5 my-5 md:my-10'>

                <div className='flex flex-row items-center gap-2 mb-3'>
                    <svg className='fill-primary-color' width="40" height="41" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8.375H0V36.375C0 38.575 1.8 40.375 4 40.375H32V36.375H4V8.375ZM36 0.375H12C9.8 0.375 8 2.175 8 4.375V28.375C8 30.575 9.8 32.375 12 32.375H36C38.2 32.375 40 30.575 40 28.375V4.375C40 2.175 38.2 0.375 36 0.375ZM36 28.375H12V4.375H36V28.375ZM23.02 16.695C23.84 15.235 25.38 14.375 26.28 13.095C27.24 11.735 26.7 9.215 24 9.215C22.24 9.215 21.36 10.555 21 11.675L18.26 10.535C19.02 8.295 21.04 6.375 23.98 6.375C26.44 6.375 28.14 7.495 29 8.895C29.74 10.095 30.16 12.355 29.02 14.035C27.76 15.895 26.56 16.455 25.9 17.655C25.64 18.135 25.54 18.455 25.54 20.015H22.5C22.52 19.195 22.38 17.855 23.02 16.695ZM21.9 24.275C21.9 23.095 22.84 22.195 24 22.195C25.18 22.195 26.08 23.095 26.08 24.275C26.08 25.435 25.2 26.375 24 26.375C22.84 26.375 21.9 25.435 21.9 24.275Z" />
                    </svg>
                    <h1 className='text-3xl md:text-4xl font-semibold'>
                        Frequently Asked Questions (<span className='text-dark-teal'>FAQs</span>)
                    </h1>
                </div>

                <Accordion
                    title={'How to apply for Anubhava ?'}
                    children={`Sign up on Anubhava’s website with your email address and mobile number. Once your
                    email address is verified, login to your profile and generate a resume to submit for various
                    internships. Look up all the profiles for which you are qualified, then apply for the ones that
                    interest you.
                    `}
                />
                <Accordion
                    title={"I can't sign up on Anubhava's website using Google email. What should I do ?"}
                    children={`We recommend you to Google chrome browser to sign up on Anubhava's website. Otherwise you can use your personal email address to sign up
                    through the Sign up button. If you are still facing issues, please contact us.
                    `}
                />
                <Accordion
                    title={'Who all are eligible for the Internship Fair ?'}
                    children={`
                    Candidates from all universities and domains such as UG, PG and PhD, are eligible.
                    `}
                />
                <Accordion
                    title={'In how many companies can one candidate apply for an internship ?'}
                    children={`
                    There is no restriction on the number of companies that a single candidate can apply in.`}
                />
                <Accordion
                    title={'How to track the opportunity that one applies for ?'}
                    children={`
                    All the further updates regarding your application will be communicated on your
                    registered email address or whatsapp number.
                    `}
                />
                <Accordion
                    title={'Is the Internship Fair free or paid ?'}
                    children={`
                    Anubhava is a completely free Internship Fair
                    `}
                />

            </div>
        </div>
    )
}

export default HowToApply
