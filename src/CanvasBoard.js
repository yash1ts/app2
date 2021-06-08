import { Html, useContextBridge } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { update } from '@tweenjs/tween.js';
import React, {Suspense, useContext, useRef} from 'react';
import { ControlContext, ControlContextProvider } from './ControlContext';
import Loader from './Loader';
function CanvasElement({children, controls}) {
    const light = useRef(null);
    const [controlState, setControlState] = useContext(ControlContext);
    
    useFrame(({camera})=>{
        update();
        controls.update();
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
                <CanvasElement camera={camera} controls={controls}>
                    {children}
                </CanvasElement>
            </ContextBridge>
        </Canvas>
    );
}