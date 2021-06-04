import { Canvas } from '@react-three/fiber';
import React, {Suspense} from 'react';
import Loader from './Loader';
export default function CanvasBoard({model, camera, control}) {

    return (
        <Canvas camera={camera}>
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loader/>} >
            {model}
        </Suspense>
      </Canvas>
    );
}