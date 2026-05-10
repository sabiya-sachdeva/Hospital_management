import "./App.css";

import Form from "./Form/Form.js";
import { Route, Routes } from "react-router-dom";
import Overview from "./Overview/Overview";
import Footer from "./Footer/Footer";
import ContactUs from "./ContactUs/ContactUs.js";
import Search from "./Search/Search.js";
import BookApp from "./BookApp/BookApp.js";
import DiseaseandCondition from "./DiseasesandCondition/DiseasesandCondition.js";
import DiseaseDetail from "./DiseaseDetail/DiseaseDetail.js";
import Home from "./Home/Home.js";
import MedicalSupplies from "./MedicalSupplies.js";
import AddtoBag from "./AddtoBag.js";
import Cart from "./Cart.js";
import Login from "./Login/Login.js";
import SignUp from "./SignUp/SignUp.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/overview" element={<Overview />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/book/:doctorId" element={<BookApp />}></Route>
        <Route path="/diseases" element={<DiseaseandCondition />}></Route>
        <Route path="/medsupplies" element={<MedicalSupplies />}></Route>
        <Route path="/add-to-bag/:id" element={<AddtoBag />}></Route>

        <Route path="/cart" element={<Cart />} />

        <Route path="/diseases/:id" element={<DiseaseDetail />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<SignUp/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
