import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const AnimationCarteContext = createContext();

export const AnimationCarteProvider = ({ children }) => {
    const [cardHover, setCardHover] = useState(false)
    const [pointerCarteHover, setPointerCarteHover] = useState(false)
    const [styleCardElement, setStyleCardElement] = useState("card-element")

    

  return (
    <AnimationCarteContext.Provider
      value={{
        cardHover,
        setCardHover,

        pointerCarteHover, 

        setPointerCarteHover,
        styleCardElement, setStyleCardElement
      }}
    >
      {children}
    </AnimationCarteContext.Provider>
  );
};
