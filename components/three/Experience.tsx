import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { Color } from "three";
import { currentPageAtom } from "./TextHero";
import { Island } from "./Island";
import { ShipModel } from "./Ship";
import { lerp } from "three/src/math/MathUtils.js";
import { useFrame } from "@react-three/fiber";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef<CameraControls>(null);
  const meshFitCameraHome = useRef(null);
  const meshFitCameraStore = useRef(null);
  const meshFitCameraLaptop = useRef(null);
  const textMaterial = useRef<THREE.MeshBasicMaterial>(null!);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const intro = useCallback(async () => {
    if (!controls.current) return;
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.2;
    setTimeout(() => {
      setCurrentPage("home");
    }, 1200);
    fitCamera();
  }, []);

  const fitCamera = useCallback(async () => {
    if (
      !controls.current ||
      !meshFitCameraHome.current ||
      !meshFitCameraStore.current ||
      !meshFitCameraLaptop.current
    )
      return;
    if (currentPage === "store") {
      controls.current.smoothTime = 0.8;
      controls.current.fitToBox(meshFitCameraStore.current, true, {
        paddingTop: 0.6,
      });
    } else if (currentPage === "member") {
      controls.current.smoothTime = 0.8;
      await controls.current.fitToBox(meshFitCameraLaptop.current, true, {
        cover: true,
        paddingTop: 0.12,
      });
      controls.current.camera.updateMatrixWorld();
    } else {
      controls.current.smoothTime = 1.4;
      controls.current.fitToBox(meshFitCameraHome.current, true);
    }
  }, [currentPage]);

  useFrame((_, delta) => {
    textMaterial.current.opacity = lerp(
      textMaterial.current.opacity,
      currentPage === "home" ? 1 : 0,
      delta * 1.5
    );
  });

  useEffect(() => {
    intro();
  }, [intro]);

  useEffect(() => {
    fitCamera();
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, [fitCamera]);

  return (
    <>
      <CameraControls ref={controls} dollySpeed={1} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={THREE.MathUtils.degToRad(30)}
        anchorY={"bottom"}
        scale={0.6}
      >
        TEAM{"\n"}WHALE HUNTERS
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
          ref={textMaterial}
        >
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#fff"]} />
            <Environment preset="sunset" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <ShipModel
                scale={0.07}
                position-y={-0.8}
                rotation-y={-THREE.MathUtils.degToRad(25)}
                rotation-x={THREE.MathUtils.degToRad(40)}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotation-y={THREE.MathUtils.degToRad(-25)} position-x={3}>
        <Island scale={0.04} html ref={meshFitCameraLaptop} />
        <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

useFont.preload("fonts/Poppins-Black.ttf");
