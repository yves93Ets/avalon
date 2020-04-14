import React, { useState, createContext } from "react";

export const ApiContext = createContext();
export const ApiProvider = (props) => {
  const [count, setCount] = useState(0);
  return (
    <ApiContext.Provider value={[count, setCount]}>
      {props.children}
    </ApiContext.Provider>
  );
};
