import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
function EarthModel() {
  const { scene } = useGLTF("/Models/earth-v1.glb");
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0005;
    }
  });
  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.5}
      position={[0, -2.5, 0]}
    />
  );
}
export default function EarthScene() {
  return (
    <div
      className="earth-background"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {" "}
      <Canvas
        camera={{ position: [0, 8, 1.5], fov: 45 }}
        style={{ width: "100%", height: "100%", backgroundColor: "black" }}
      >
        {" "}
        <ambientLight intensity={0.8} />{" "}
        <directionalLight position={[3, 2, 5]} intensity={1.2} /> <EarthModel />{" "}
        <Environment preset="night" />{" "}
      </Canvas>{" "}
    </div>
  );
}
