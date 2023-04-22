import * as THREE from 'three';
import { DoubleSide, VideoTexture } from 'three';

const video = document.createElement('video');
video.src = './imagenes/videom.mp4';
video.loop = true;

const texture = new VideoTexture(video);

function handleClick() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

export default function Myvideo() {
  return (
    <mesh
      receiveShadow={true}
      position-y={0.5}
      position-z={-4}
      position-x={-0.06}
      rotation-z={4.72}
      rotation-y={-Math.PI * 0.5}
      rotation-x={-Math.PI * 0.5}
      onClick={handleClick}
    >
      <boxGeometry args={[0.25,4,7.86]}
      />

      <meshStandardMaterial side={DoubleSide} map={texture} />
    </mesh>
  );
  }