// import { useState } from 'react';
// import { VideoTexture } from 'three';

// export default function Wall() {

//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleVideoClick = () => {
//     setIsPlaying(true);
//   };

//     return (
//       <group>
//         <mesh receiveShadow= {true}
//             position-y={0.5}
//             position-x={4}
//             position-z={-0.06}
//             rotation-x={- Math.PI * 0.5}>
//             <boxGeometry args={[0.25,8.14,4]} />
//             <meshStandardMaterial color={'#FCF3CF'}/>
//         </mesh>
//               <mesh receiveShadow= {true}
//               position-y={0.5}
//               position-z={-4}
//               position-x={-0.06}
//               rotation-z={4.72}
//               rotation-x={ - Math.PI * 0.5}>
//               <boxGeometry args={[0.25,7.86,4]} />
//               <meshStandardMaterial color={'#A2D9CE'}/>
//           </mesh>
//       </group>

//     )
//   }

// import { useState } from 'react';
// import { TextureLoader } from 'three';
// import casa from './casa.jpg';
// import barco from './barco.jpg';
// import avion from './avion.jpg';
// import nino from './nino.jpg';

// export default function Wall() {
//   const [currentImage, setCurrentImage] = useState(casa);

//   const handleWallClick = () => {
//     let newImage;
//     switch (currentImage) {
//       case casa:
//         newImage = barco;
//         break;
//       case barco:
//         newImage = avion;
//         break;
//       case avion:
//         newImage = nino;
//         break;
//       case nino:
//         newImage = casa;
//         break;
//       default:
//         newImage = casa;
//     }
//     setCurrentImage(newImage);
//   };

//   return (
//     <group>
//       <mesh receiveShadow={true} position-y={0.5} position-x={4} position-z={-0.06} rotation-x={-Math.PI * 0.5} onClick={handleWallClick}>
//         <boxGeometry args={[0.25, 8.14, 4]} />
//         <meshStandardMaterial>
//           <VideoTexture
//             url="./historia.mp4"
//             encoding="sRGBEncoding"
//             wrapS="RepeatWrapping"
//             wrapT="RepeatWrapping"
//             repeat={new Vector2(1, 1)}
//             onEnded={() => setIsPlaying(false)}
//             premultiplyAlpha
//           />
//         </meshStandardMaterial>
//       </mesh>
//       <mesh receiveShadow={true} position-y={0.5} position-z={-4} position-x={-0.06} rotation-z={4.72} rotation-x={-Math.PI * 0.5}>
//         <boxGeometry args={[0.25, 7.86, 4]} />
//         <meshStandardMaterial>
//           <meshBasicMaterial>
//             <texture attach="map" url={currentImage} />
//           </meshBasicMaterial>
//         </meshStandardMaterial>
//       </mesh>
//     </group>
//   );
// }


import React, { useState, useMemo, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

import * as THREE from 'three';
import casa from './imagenes/casa.jpg';
import barco from './imagenes/barco.jpg';
import avion from './imagenes/avion.jpg';
import nino from './imagenes/nino.jpg';

import { VideoTexture } from 'three';

const video = document.createElement('video');
video.src = './video/peachesSong.mp4';
video.loop = true;

const texture = new VideoTexture(video);

function handleClick() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

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

  //
  const videoRef = useRef();
  const videoTexture = useMemo(() => new VideoTexture(videoRef.current), [videoRef.current]);
  const material = new THREE.MeshStandardMaterial({
    map: videoTexture,
  });

  const handleClick = (event) => {
    //
    // event.preventDefault();
    // setIsLoading(true);

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const intersectedObject = intersects[0]?.object;

    if (intersectedObject && intersectedObject.name === 'wall2') {
      setImagenIndex((imagenIndex + 1) % imagenes.length);
    }
  };

  return (
    <group onPointerDown={handleClick}>
      <mesh receiveShadow={true} position-y={0.5} position-x={4} position-z={-0.06} rotation-x={-Math.PI * 0.5} name="wall1">
        <boxGeometry args={[0.25, 8.14, 4]} />
        <meshStandardMaterial color={'#FCF3CF'} />
      </mesh>
      <mesh receiveShadow={true} position-y={0.5} position-z={-4} position-x={-0.06} rotation-z={4.72} rotation-x={-Math.PI * 0.5} name="wall2">
        <boxGeometry args={[0.25, 7.86, 4]} />
        <meshStandardMaterial map={texture} shouldUpdate={true} />
      </mesh>
    </group>
  );
}

