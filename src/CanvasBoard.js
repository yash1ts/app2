import { useContextBridge } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, {Suspense, useRef} from 'react';
import { ControlContext } from './ControlContext';
import Loader from './Loader';
function CanvasElement({children, camera}) {
    const light = useRef(null);
    useFrame(()=>{
        if(light.current){
            light.current.position.copy(camera.position);
        }
    })
    return (
        <group>
        <pointLight ref={light} position={[0,0, 50]} intensity={1} />
                <ambientLight intensity={0.5}/>
                <Suspense fallback={<Loader/>} >
                    {children}
                </Suspense>
                </group>
    )
}
export default function CanvasBoard({camera, children, controls}) {
    const ContextBridge = useContextBridge(ControlContext);
    
    return (
        <Canvas camera={camera}>
            <ContextBridge>
                <CanvasElement camera={camera}>
                    {children}
                </CanvasElement>
            </ContextBridge>
        </Canvas>
    );
}