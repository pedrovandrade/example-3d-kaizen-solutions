import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FloorMesh component.
 * Renders a plane mesh with a tiled texture to simulate a floor.
 * The texture is loaded asynchronously using the useLoader hook.
 */
export default function FloorMesh() {
  // Load a texture for the floor
  const floorTexture = useLoader(THREE.TextureLoader, "/3D/textures/floor_tile.jpg");
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Enable texture tiling
  floorTexture.repeat.set(5, 5); // Set the number of tiles

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to make it horizontal
      position={[0, -1, 0]} // Position slightly below the origin
      receiveShadow // Enable shadow receiving
    >
      <planeGeometry args={[10, 10]} /> {/* Plane size */}
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
}