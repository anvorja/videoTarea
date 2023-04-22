/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Hamburger(props) {

    const hamburgerRef = useRef(null)
    const hamburger = useGLTF("/static/hamburger.glb");
    return (
        <primitive
            object={hamburger.scene}
            ref={hamburgerRef}
            {...props}
            dispose={null}
            onClick={(e) => {
                console.log(e.object.name)
                e.stopPropagation();
            }}
        />

    );
}

useGLTF.preload("/static/hamburger.glb");
