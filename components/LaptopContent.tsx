import React, { useRef } from "react";
import { currentPageAtom } from "./three/TextHero";
import { useAtom } from "jotai";

const LaptopContent = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setTimeout(() => {
      setCurrentPage("home");
    }, 2000);
  };

  return (
    <div className="w-full max-h-[520px] max-w-[810px] overflow-hidden ">
      <video
        ref={videoRef}
        controls
        width="100%"
        playsInline
        autoPlay={currentPage === "member"}
        style={{ cursor: "auto !important" }}
        onEnded={handleEnded}
        // onPlay={handleEnded}
      >
        <source src="/videos/laptop_content.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LaptopContent;
