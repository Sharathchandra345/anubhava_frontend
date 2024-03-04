import React, { useState } from "react";

export default function HomeReviewCard({ reviews }) {
    const [index, setIndex] = useState(1);
    const [visibleItems, setVisibleItems] = useState([0, 1, 2]);
    const [key, setKey] = useState("students");





    const circularDivs = reviews[key];

    const handleSelect = (selectedItem) => {

        setIndex(selectedItem);
        const selectedItemIndex = circularDivs.indexOf(circularDivs[selectedItem]);
        const newVisibleItems = [];
        for (let i = -1; i <= 1; i++) {
            const newIndex = selectedItemIndex + i;
            const item = circularDivs[(newIndex + circularDivs.length) % circularDivs.length];
            newVisibleItems.push(item.id);
        }
        setVisibleItems(newVisibleItems);
    };
    return (
        <div className="bg-teal-200 md:p-10 p-5 w-full h-full md:mt-10 mt-3">
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold md:text-4xl text-3xl text-center text-teal-800">
                    {key === 'students' ? 'What our students say' : 'What our employers say'}
                </h1>
                <div className="flex flex-row gap-8 md:gap-x-16 justify-center items-center mt-5 md:mt-8">
                    {visibleItems.map((el) => (
                        <div key={el}>
                            {/* LEFT DIV RIGHT DIV */}
                            <div
                                className={"relative md:h-24 md:w-24 h-16 w-16 rounded-full" + (el === index ? " hidden" : "block")}
                                onClick={() => handleSelect(el)}
                            >
                                <div className="absolute flex flex-row gap-1 items-center justify-center top-0 -right-2 md:h-10 md:w-10 h-7 w-7 rounded-full bg-teal-500">
                                    <h1 className="font-bold md:text-base text-sm text-white">{circularDivs[el].stars}</h1>
                                    <i className='fa fa-star text-white' style={{ fontSize: '0.6rem' }}></i>
                                </div>
                                <img className={`md:h-24 md:w-24 h-16 w-16 rounded-full`} src={circularDivs[el].image} alt="" />
                            </div>
                            {/* MIDDLE DIV */}
                            <div className="relative">
                                <div className={`${el === index ? 'flex' : 'hidden'} mt-10 flex-col items-center justify-center h-full w-full rounded-xl p-8 bg-white`}
                                    style={{ background: 'rgb(255, 255, 255)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
                                >
                                    <div
                                        className={"absolute md:-top-12 -top-8 md:h-24 md:w-24 h-16 w-16 rounded-full border-2 border-teal-500"}
                                        onClick={() => handleSelect(el)}
                                    >
                                        <div className="absolute flex flex-row gap-1 items-center justify-center top-0 -right-2 md:h-10 md:w-10 h-7 w-7 rounded-full bg-teal-500">
                                            <h1 className="font-bold md:text-base text-sm text-white">{circularDivs[el].stars}</h1>
                                            <i className='fa fa-star text-white' style={{ fontSize: '0.6rem' }}></i>
                                        </div>
                                        <img className={` md:h-[92px] md:w-[92px] h-[60px] w-[60px] rounded-full`} src={circularDivs[el].image} alt="" />
                                    </div>
                                    <h1 className="text-teal-500 text-xl font-semibold md:mt-10 mt-5 md:mb-5 mb-2">{circularDivs[el].name}</h1>
                                    <h1>{circularDivs[el].review}</h1>
                                    <div className="flex flex-row gap-10 items-center justify-center mt-4">
                                        <i className='fa fa-angle-left text-teal-500' style={{ fontSize: '1.5rem' }}
                                            onClick={() => {
                                                if (index !== 0) {
                                                    handleSelect(index - 1)
                                                }
                                                else {
                                                    handleSelect(circularDivs.length - 1)
                                                }
                                            }}
                                        ></i>
                                        <i className='fa fa-angle-right text-teal-500' style={{ fontSize: '1.5rem' }}
                                            onClick={() => {
                                                if (index !== circularDivs.length - 1) {
                                                    handleSelect(index + 1)
                                                }
                                                else {
                                                    handleSelect(0)
                                                }
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center justify-center md:gap-4 gap-3 mt-5">
                    <div className="rounded-lg py-2 md:px-10 px-3 cursor-pointer"
                        style={{
                            border: key !== 'students' ? '2px solid #115e59' : 'none',
                            background: key !== 'students' ? 'none' : '#115e59',
                            color: key !== 'students' ? '#115e59' : 'white'
                        }}
                        onClick={() => { setKey('students') }}
                    >
                        <h1 className={"font-semibold  text-center md:text-base text-xs" + (key === 'students' ? 'text-teal-500' : 'text-white')}>From our students</h1>
                    </div>
                    <div className="rounded-lg py-2 md:px-10 px-3 cursor-pointer"
                        style={{
                            border: key !== 'employers' ? '2px solid #115e59' : 'none',
                            background: key !== 'employers' ? 'none' : '#115e59',
                            color: key !== 'employers' ? '#115e59' : 'white'
                        }}
                        onClick={() => { setKey('employers') }}
                    >
                        <h1 className={"font-semibold text-center md:text-base text-xs" + (key === 'employers' ? 'text-teal-500' : 'text-white')}>From our employers</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
