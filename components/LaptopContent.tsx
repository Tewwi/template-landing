import React from "react";

const LaptopContent = () => {
  return (
    <div className="w-full max-h-[520px] max-w-[810px] overflow-hidden ">
      <video controls width="100%">
        <source src="/videos/laptop_content.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LaptopContent;
