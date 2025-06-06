import { Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { currentPageAtom } from "./TextHero";

const Slogan = () => {
  const textRef = useRef<THREE.Mesh>(null);
  const [y, setY] = useState(-2);
  const [opacity, setOpacity] = useState(0);
  const [secondY, setSecondY] = useState(-2);
  const [secondOpacity, setSecondOpacity] = useState(0);
  const [currentPage] = useAtom(currentPageAtom);
  const [started, setStarted] = useState(false);
  const [secondStarted, setSecondStarted] = useState(false);
  const delay = 2.5; // seconds
  const secondDelay = 3; // seconds
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    if (currentPage !== "store") return;
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.getElapsedTime();
    }
    const elapsed = state.clock.getElapsedTime() - startTimeRef.current;
    // First text
    if (!started && elapsed > delay) setStarted(true);
    if (started && y < -1) {
      setY((prev) => {
        const next = THREE.MathUtils.lerp(prev, -1, 0.08);
        return next > -1 ? -1 : next;
      });
      setOpacity((prev) => {
        const next = THREE.MathUtils.lerp(prev, 1, 0.08);
        return next > 1 ? 1 : next;
      });
    }
    // Second text
    if (!secondStarted && elapsed > secondDelay) setSecondStarted(true);
    if (secondStarted && secondY < -1) {
      setSecondY((prev) => {
        const next = THREE.MathUtils.lerp(prev, -1, 0.08);
        return next > -1 ? -1 : next;
      });
      setSecondOpacity((prev) => {
        const next = THREE.MathUtils.lerp(prev, 1, 0.08);
        return next > 1 ? 1 : next;
      });
    }
  });

  useEffect(() => {
    if (currentPage !== "store") {
      setY(-2);
      setOpacity(0);
      setSecondY(-2);
      setSecondOpacity(0);
      setStarted(false);
      setSecondStarted(false);
      startTimeRef.current = null;
    }
  }, [currentPage]);

  return (
    <>
      <Text
        font={"fonts/BeachSunny.otf"}
        position-x={-19}
        position-y={y + 1}
        position-z={15}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={0}
        rotation-z={0}
        rotation-x={-Math.PI / 2 + 0.4}
        anchorY={"bottom"}
        scale={4.5}
        fontWeight={"bold"}
        ref={textRef}
        fillOpacity={opacity}
        color={"#e6e18c"}
      >
        Whale hunter
      </Text>
      <Text
        font={"fonts/BeachSunny.otf"}
        position-x={-15}
        position-y={secondY}
        position-z={29}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={0}
        rotation-z={0}
        rotation-x={-Math.PI / 2 + 0.4}
        anchorY={"bottom"}
        scale={4.5}
        fontWeight={"bold"}
        ref={textRef}
        fillOpacity={secondOpacity}
        color={"#e6e18c"}
      >
        not just a hunter {`\n`} a legend
      </Text>
    </>
  );
};

export default Slogan;
