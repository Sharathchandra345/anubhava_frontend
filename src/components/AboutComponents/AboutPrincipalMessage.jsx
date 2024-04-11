import React from "react";

export default function AboutPrincipalMessage({
  campusPic,
  principal,
  message,
  principal2,
  message2,
}) {
  const backgroundStyle = {
    backgroundImage: `url(${campusPic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative mb-10 md:mb-0 px-5">
      <div
        className="w-full md:h-[600px] absolute inset-0"
        style={backgroundStyle}
      >
        <div className="bg-dark-color opacity-50 w-full h-full absolute inset-0"></div>
      </div>

      <div className="flex flex-col items-center justify-center md:p-20 p-5">
        <div className="parent mx-auto flex items-center mb-8">
          <img
            src={principal}
            alt="principal"
            className="md:h-56 h-[250px] md:w-32 w-20 object-cover object-center rounded-l-xl mr-4"
            style={{ zIndex: 1 }}
          />
          <div className="flex-grow md:px-4 md:py-5 py-2 px-2 flex flex-col gap-4 text-light-color bg-dark-color opacity-70 rounded-r-xl md:h-56 h-[310px]">
            <h1 className="md:text-3xl text-xl">
              Message from <span className="text-warning-color">Principal</span>
            </h1>
            <p className="md:text-sm text-xs">{message}</p>
            <div className="flex items-center">
              <h1 className="font-bold text-base text-light-color">
                - Dr Jaswinder Singh
              </h1>
              <i
                className="fa fa-quote-right text-warning-color text-base ml-2"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <img
            src={principal2}
            alt="principal2"
            className="md:h-56 h-[250px] md:w-32 w-20 object-cover object-center rounded-l-xl mr-4"
            style={{ zIndex: 1 }}
          />
          <div className="flex-grow md:px-4 md:py-5 py-2 px-2 flex flex-col gap-4 text-light-color bg-dark-color opacity-70 rounded-r-xl md:h-56 h-[310px]">
            <h1 className="md:text-3xl text-xl">
              Message from <span className="text-warning-color">Convenor</span>
            </h1>
            <p className="md:text-sm text-xs">{message2}</p>
            <div className="flex items-center">
              <h1 className="font-bold text-base text-light-color">
                - Dr Bibhu Prasad Sahoo
              </h1>
              <i
                className="fa fa-quote-right text-warning-color text-base ml-2"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
