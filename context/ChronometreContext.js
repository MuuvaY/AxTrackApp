import React, { createContext, useState, useContext } from "react";

const ChronometreContext = createContext();

export const ChronometreProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer((prevTime) => prevTime + 1);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  return (
    <ChronometreContext.Provider value={{ timer, startTimer, resetTimer }}>
      {children}
    </ChronometreContext.Provider>
  );
};

export const useChronometre = () => useContext(ChronometreContext);
