import "./App.css";
import NavigationTop from "./Composants/NavigationTop/NavigationTop";
import Footer from "./Composants/Footer/Footer";
import FormulaireContact from "./Composants/FormulaireContact/FormulaireContact";
import HomePage from "./Pages/HomePage/HomePage";
import ElementPage from "./Pages/ElementPage/ElementPage";
import CartePointerPage from "./Pages/CartePointerPage/CartePointerPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { LieuProvider, LieuContext } from "./Context/LieuContext";
import { useContext, useEffect } from "react";
import { GestionContext } from "./Context/GestionContext";

function App() {
  const { flagDataServeur } = useContext(GestionContext);
  return (
    <div className="App">
      <NavigationTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Home" element={<HomePage />} />
        <Route path="/Randonnée" element={<ElementPage />} />
        <Route path="/Lieu" element={<ElementPage />} />
        <Route path="/All" element={<ElementPage />} />
        <Route path="/Carte" element={<CartePointerPage />} />
      </Routes>
      <FormulaireContact />
      <Footer />
    </div>
  );
}

export default App;
