import { useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {Suspense} from 'react';
import { ControlContext } from './ControlContext';
import Loader from './Loader';
import { LoadingContext } from './LoadingContext';
export default function CanvasBoard({camera, children}) {
    const ContextBridge = useContextBridge(ControlContext, LoadingContext)
    return (
        <Canvas camera={camera}>
            <ContextBridge>
            <spotLight position={[0,0, 100]} intensity={1} />
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loader/>} >
            {children}
        </Suspense>
        </ContextBridge>
      </Canvas>
    );
}