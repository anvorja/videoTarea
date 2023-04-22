import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

import * as THREE from 'three';
import casa from './imagenes/casa.jpg';
import barco from './imagenes/barco.jpg';
import avion from './imagenes/avion.jpg';
import nino from './imagenes/nino.jpg';
import videom from './imagenes/videom.mp4';

import { VideoTexture } from 'three';

export default function Wall() {
  const [imagenIndex, setImagenIndex] = useState(0);
  //
  const [isLoading, setIsLoading] = useState(false);
  const raycaster = new THREE.Raycaster();
  const mouse = new Vector2();
  const { camera, scene } = useThree();

  const imagenes = [casa, barco, avion, nino];
  const imagenUrl = imagenes[imagenIndex];

  const texture = useMemo(() => useLoader(THREE.TextureLoader, imagenUrl), [imagenUrl]);

  const pasarMouse = (event) => {

    setIsLoading(true);

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const intersectedObject = intersects[0]?.object;

    if (intersectedObject && intersectedObject.name === 'wall2') {
      setImagenIndex((imagenIndex + 1) % imagenes.length);
    }
  };


  const [video] = useState(() => document.createElement('video'));
  useEffect(() => {
    video.src = videom;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    //video.play();
  }, [video]);



  function handleClick() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  const videoTexture = useMemo(() => new VideoTexture(video), [video]);



  return (
    <group >

      <mesh receiveShadow={true} position-y={0.5} position-x={4} position-z={-0.06} rotation-x={-Math.PI * 0.5} onClick={handleClick} name="wall1">
        <boxGeometry args={[0.25, 8.14, 4]} />
        <meshStandardMaterial map={videoTexture} />
      </mesh>

      <mesh receiveShadow={true} position-y={0.5} position-z={-4} position-x={-0.06} rotation-z={4.72} rotation-x={-Math.PI * 0.5} onPointerOver={pasarMouse} name="wall2">
        <boxGeometry args={[0.25, 7.86, 4]} />
        <meshStandardMaterial map={texture} shouldUpdate={true} />
      </mesh>
    </group>
  );
}

