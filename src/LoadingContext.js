
import React, { useState, createContext } from "react";
 
// Create Context Object
export const LoadingContext = createContext();
 
// Create a provider for components to consume and subscribe to changes
export const LoadingContextProvider = props => {
  const [upperState, setUpperState] = useState({
    total: 0,
    loaded: 0
  });
  const [lowerState, setLowerState] = useState({
    total: 0,
    loaded: 0
  });
 
  return (
	<LoadingContext.Provider value={[upperState, setUpperState, lowerState, setLowerState]}>
  	{props.children}
	</LoadingContext.Provider>
  );
};