'use client';

import * as THREE from 'three';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Decal, useTexture, Bounds } from '@react-three/drei';

// меши из твоего T_shirt.jsx
const BODY_MESHES = [
  'Object_6',
  'Object_8',
  'Object_10',
  'Object_11',
  'Object_12',
  'Object_14',
  'Object_15',
  'Object_16',
];
const SLEEVE_MESHES = ['Object_18', 'Object_20'];

// передний торс модели (по разбору геометрии: Object_10/11/12 — передние панели,
// Object_14/15/16 — задние). Если принт «утонул» — попробуй Object_11 или Object_12.
const DECAL_MESH = 'Object_10';

type Props = {
  color: string;
  decalUrl: string | null;
};

function ShirtModel({ color, decalUrl }: Props) {
  const { nodes, materials } = useGLTF('/t_shirt.glb') as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  };

  const decal = useTexture(decalUrl ?? '/placeholder.png', (tex) => {
    const t = Array.isArray(tex) ? tex[0] : tex;
    t.anisotropy = 16;
  });

  return (
    <group dispose={null}>
      {/* ТЕЛО */}
      {BODY_MESHES.map((name) => (
        <mesh
          key={name}
          geometry={nodes[name].geometry}
          material={materials.Body_FRONT_2664}
          material-color={color}
          dispose={null}>
          {decalUrl && name === DECAL_MESH && (
            <Decal
              position={[0, 1.35, 0.16]} // ⚙️ грудь: X=центр, Y≈центр груди, Z=передняя поверхность
              rotation={[0, 0, 0]}
              scale={[0.55, 0.55, 0.3]} // ширина × высота × глубина проекции
            >
              <meshBasicMaterial
                map={decal}
                transparent
                polygonOffset
                polygonOffsetFactor={-10} // чтобы принт не «мерцал» сквозь ткань
                toneMapped={false}
              />
            </Decal>
          )}
        </mesh>
      ))}

      {/* РУКАВА */}
      {SLEEVE_MESHES.map((name) => (
        <mesh
          key={name}
          geometry={nodes[name].geometry}
          material={materials.Sleeves_FRONT_2669}
          material-color={color}
          dispose={null}
        />
      ))}
    </group>
  );
}

export default function Shirt3D({ color, decalUrl }: Props) {
  // Canvas при первом монтировании (после подгрузки динамического чанка)
  // иногда измеряет контейнер как 0 → остаётся 300×150. Форсим пересчёт.
  React.useEffect(() => {
    const timers = [0, 60, 200].map((ms) =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 30 }}
      resize={{ offsetSize: true }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full">
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} />

      <React.Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <ShirtModel color={color} decalUrl={decalUrl} />
        </Bounds>
      </React.Suspense>

      <OrbitControls makeDefault enablePan={false} enableZoom />
    </Canvas>
  );
}

useGLTF.preload('/t_shirt.glb');
