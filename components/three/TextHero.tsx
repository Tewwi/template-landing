"use client";

import { Canvas } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import React, { Suspense } from "react";
import { Experience } from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Button } from "../ui/button";

export const currentPageAtom = atom("intro");

const TextHero = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom);
  if (typeof window === "undefined") return null;

  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>

      <div className="fixed inset-0 pointer-events-none translate-x-[-50px] translate-y-[100px]">
        <section
          className={`flex w-full h-full flex-col items-center justify-center 
      duration-500`}
        >
          <div className="h-[66%]"></div>
          <Button onClick={() => setCurrentPage("store")}>Slogan</Button>
        </section>
      </div>

      <div className="fixed inset-0 pointer-events-none translate-x-[50px] translate-y-[100px]">
        <section
          className={`flex w-full h-full flex-col items-center justify-center 
      duration-500`}
        >
          <div className="h-[66%]"></div>
          <Button onClick={() => setCurrentPage("member")}>Member</Button>
        </section>
      </div>
    </div>
  );
};

export default TextHero;
