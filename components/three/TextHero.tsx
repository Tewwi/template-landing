"use client";

import { Canvas } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import React, { Suspense } from "react";
import { Experience } from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Button } from "../ui/button";

export const currentPageAtom = atom("intro");

const TextHero = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  if (typeof window === "undefined") return null;

  return (
    <div className="h-screen w-screen">
      <Canvas
        shadows
        frameloop="demand"
        camera={{ position: [0, 0, 8], fov: 42 }}
      >
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>

      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-end pb-2">
        <div className="flex gap-4 w-fit justify-center">
          <section
            className={`flex w-full h-full flex-col items-center justify-center 
      duration-500`}
          >
            <div className="h-[66%]"></div>
            {currentPage !== "store" && (
              <Button onClick={() => setCurrentPage("store")}>Slogan</Button>
            )}
          </section>

          <section
            className={`flex w-full h-full flex-col items-center justify-center 
      duration-500`}
          >
            <div className="h-[66%]"></div>
            {currentPage !== "member" && (
              <Button onClick={() => setCurrentPage("member")}>Member</Button>
            )}
          </section>

          <section
            className={`flex w-full h-full flex-col items-center justify-center 
      duration-500`}
          >
            <div className="h-[66%]"></div>
            {currentPage !== "home" && (
              <Button onClick={() => setCurrentPage("home")}>Home</Button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TextHero;
