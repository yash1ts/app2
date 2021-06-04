import { Button } from '@material-ui/core';
import React from 'react';
export function ControlBoard({controls, camera, setShowLower, setShowUpper, setMeshAngle}) {
    const centerView = () => {
        setShowUpper(true);
        setShowLower(true);
        setMeshAngle(1.75);
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const rightView = () => {
        setShowUpper(true);
        setShowLower(true);
        setMeshAngle(1.75);
    
        camera.position.set( 120, 0, 120 );
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
        
      }
    
      const leftView = () => {
        setShowUpper(true);
        setShowLower(true);
        setMeshAngle(1.75);
        camera.position.set(-120,0,120);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const upperView = () => {
        setShowLower(false);
        setShowUpper(true);
        setMeshAngle(0);
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const lowerView = () => {
        setShowLower(true);
        setShowUpper(false);
        setMeshAngle(3.14);
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    return (
        <>
            <Button variant="contained" color="primary" onClick={()=> {
            centerView();
            }}>Center</Button>
            <Button variant="contained" color="primary" onClick={()=> {
            rightView();
            }}>Right</Button>
            <Button variant="contained" color="primary" onClick={()=> {
            leftView();
            }}>Left</Button>
            <Button variant="contained" color="primary" onClick={()=> {
            upperView()
            }}>Upper Jaw</Button>
            <Button variant="contained" color="primary" onClick={()=> {
            lowerView();
            }}>Lower Jaw</Button>
        </>
    );
}