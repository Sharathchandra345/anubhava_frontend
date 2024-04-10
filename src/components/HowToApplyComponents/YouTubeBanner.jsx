import React from "react";

export default function YouTubeBanner() {
  return (
    <div className="flex flex-col items-center justify-center px-3 md:p-20 bg-new sansfont">
      <div className="text-center text-white py-8">
        {/* <h2 className="font-semibold text-2xl md:text-3xl">
          Check out these videos for a better understanding:
        </h2> */}
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:space-x-4">
        <iframe
          width="100%"
          height="280px"
          src="https://www.youtube.com/embed/plRRv3Xx4RM?si=JJaATi08DCZhONXM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          width="100%"
          height="280px"
          src="https://www.youtube.com/embed/8JYeAQ43GdU?si=hZuc4FtCgjdC_Y5O"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          iframe {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
