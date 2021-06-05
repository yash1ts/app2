import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { ControlContext } from './ControlContext';
export function ControlBoard({controls, camera, setShowLower, setShowUpper, setMeshAngle}) {
  const [controlState, setControlState] = useContext(ControlContext);
    const centerView = () => {
        setControlState({
          showUpper: true,
          showLower: true,
          meshAngle: 1.75
        });
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const rightView = () => {
        setControlState({
          showUpper: true,
          showLower: true,
          meshAngle: 1.75
        });
    
        camera.position.set( 120, 0, 120 );
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
        
      }
    
      const leftView = () => {
        setControlState({
          showUpper: true,
          showLower: true,
          meshAngle: 1.75
        });
        camera.position.set(-120,0,120);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const upperView = () => {
        setControlState({
          showUpper: true,
          showLower: false,
          meshAngle: 0
        });
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const lowerView = () => {
        setControlState({
          showUpper: false,
          showLower: true,
          meshAngle: 3.14
        });
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    return (
        <div style={{display:'flex',  flexDirection: 'row', justifyContent: 'space-around', margin: 50}}>
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
        </div>
    );
}