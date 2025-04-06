import React from "react";

/**
 * CustomDirectionalLight component.
 * Provides a directional light source with shadow casting enabled.
 * Includes an orthographic camera for shadow mapping.
 */
export default function CustomDirectionalLight() {
  return (
    <directionalLight
      position={[0, 5, 5]}
      intensity={2}
      castShadow // Enable shadow casting for the light
      shadow-mapSize-width={1024} // Shadow map resolution
      shadow-mapSize-height={1024}
    >
      {/* Shadow Camera */}
      <orthographicCamera
        attach="shadow-camera"
        args={[-10, 10, 10, -10, 0.1, 500]} // [left, right, top, bottom, near, far]
      />
    </directionalLight>
  );
}