import { OrbitControls, Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Wall from './Wall'
import Floor from './Floor'
//import Myvideo from './Myvideo'

export default function Experience() {
    return <>
        <Perf position="top-left" />
        <OrbitControls makeDefault />
        <directionalLight castShadow={true} position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <Sky />
        <Wall />
        <Floor />
    </>
}
