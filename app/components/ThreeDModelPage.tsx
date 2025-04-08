import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Environment, Html, type FontData } from "@react-three/drei";
import Roboto from "../fonts/Roboto_Regular.json";
import * as THREE from "three";
import RotatingModel from "./RotatingModel";
import CustomDirectionalLight from "./CustomDirectionalLight";
import FloorMesh from "./FloorMesh";

/**
 * ThreeDModelPage component.
 * The main component that renders the 3D scene, including:
 * - A rotating GLB model.
 * - A 3D text component.
 * - A floor mesh with a tiled texture.
 * - Lighting and environment settings.
 * - OrbitControls with auto-rotation when the user is not interacting.
 */
export default function ThreeDModelPage() {
  const baseUrl: string = process.env.PUBLIC_URL || '';
  const textRef = useRef<THREE.Mesh>(null);

  /**
   * Tracks whether the user is interacting with the scene.
   * Used to enable or disable auto-rotation of the camera.
   */
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows> {/* Enable shadows in the Canvas */}
        <ambientLight intensity={0.3} />
        <CustomDirectionalLight />
        <Suspense
          fallback={
            <Html center>
              <div style={{ color: "white", fontSize: "1.5rem" }}>Loading...</div>
            </Html>
          }
        >
          <Environment
            files={`${baseUrl}/3D/background/autumn_field_puresky_2k.hdr`} // Path to your HDR file
            background // Use the HDR as the scene background
          />
          {/* Floor Mesh */}
          <FloorMesh />
          {/* Rotating GLB Model */}
          <RotatingModel modelPath={`${baseUrl}/3D/models/kaizen-logo.glb`} />
          <Text3D
            ref={textRef}
            font={Roboto as unknown as FontData}
            rotation={[0, 0, 0]}
            letterSpacing={0.05}
            lineHeight={1}
            size={1}
            height={0.2} // Adds depth to the text
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelSegments={5}
            castShadow // Enable shadow casting
            onUpdate={(self) => {
              // Center the text geometry
              const box = new THREE.Box3().setFromObject(self);
              const center = box.getCenter(new THREE.Vector3());
              self.position.set(-center.x, -center.y, -center.z);
            }}
          >
            KZS Talks
            <meshStandardMaterial color="white" />
          </Text3D>
        </Suspense>
        {/* OrbitControls with Auto-Rotate */}
        <OrbitControls
          autoRotate={!isInteracting} // Enable auto-rotate when not interacting
          autoRotateSpeed={1.0} // Adjust the speed of auto-rotation
          enableDamping // Smooth camera movement
          dampingFactor={0.1}
          onStart={() => setIsInteracting(true)} // Disable auto-rotate on interaction
          onEnd={() => setIsInteracting(false)} // Re-enable auto-rotate after interaction
        />
      </Canvas>
    </div>
  );
}