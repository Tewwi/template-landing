import { useAtom } from "jotai";
import { currentPageAtom } from "./TextHero";
import { Html } from "@react-three/drei";
import { useMemo } from "react";

type OverlayItemProps = {
  className?: string;
  title: string;
  description: string;
  bgColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const OverlayItem = ({
  className = "",
  title,
  description,
  bgColor,
  ...props
}: OverlayItemProps) => {
  const [currentPage] = useAtom(currentPageAtom);
  const content = useMemo(
    () => (
      <>
        <div className={`${bgColor} font-bold text-white w-full text-md`}>
          {" "}
          Lorem Ipsum
        </div>
        <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
          <h2 className="font-bold">{title}</h2>
          <p>{description}</p>
        </div>
      </>
    ),
    [bgColor, title, description]
  );

  return (
    <Html
      transform
      distanceFactor={1.2}
      center
      zIndexRange={[1, 0]}
      occlude={false}
      className={`w-48 rounded-md overflow-hidden ${
        currentPage === "store" ? "" : "opacity-0"
      } transition-opacity duration-1000 ${className}`}
      {...props}
    >
      {content}
    </Html>
  );
};

export default OverlayItem;
