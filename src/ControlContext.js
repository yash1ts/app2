
import React, { useState, createContext } from "react";
 
// Create Context Object
export const ControlContext = createContext();
 
// Create a provider for components to consume and subscribe to changes
export const ControlContextProvider = props => {
  const [controlState, setControlState] = useState({
      showUpper: true,
      showLower: true,
      meshAngle: 1.75,
      stage: 0,
      total: 5,
  });
 
  return (
	<ControlContext.Provider value={[controlState, setControlState]}>
  	{props.children}
	</ControlContext.Provider>
  );
};