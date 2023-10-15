import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const LieuContext = createContext();

export const LieuProvider = ({ children }) => {
    const [listeLieu, setListeLieu] = useState([])
    const [listeLieuAfficher, setListeLieuAfficher] = useState([])
    const [page, setPage] = useState(1)

    

  return (
    <LieuContext.Provider
      value={{
        
      }}
    >
      {children}
    </LieuContext.Provider>
  );
};
