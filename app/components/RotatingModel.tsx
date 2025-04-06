import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * RotatingModel component.
 * Displays a 3D GLB model that rotates continuously around its Y-axis.
 * The model is dynamically centered based on its bounding box.
 * Ensures all meshes in the model cast shadows.
 * 
 * @param modelPath - The path to the GLB model file.
 */
export default function RotatingModel({ modelPath }: { modelPath: string }) {
  const modelRef = useRef<THREE.Group>(null);

  // Load the GLB model
  const gltf = useGLTF(modelPath);

  // Ensure all meshes in the model cast shadows
  React.useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true; // Enable shadow casting for meshes
      }
    });
  }, [gltf]);

  // Rotate the model on every frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate around the Y-axis
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 2, 0]} // Position above the Text3D
      scale={[1, 1, 1]} // Adjust the scale of the model
      onUpdate={(self: THREE.Object3D<THREE.Object3DEventMap>) => {
        // Center the GLB model
        const box = new THREE.Box3().setFromObject(self);
        const center = box.getCenter(new THREE.Vector3());
        self.position.set(-center.x, 2 - center.y, -center.z); // Adjust Y to keep it above Text3D
      }}
    />
  );
}