import React from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientList from "./ClientList";
import ClientEdit from "./ClientEdit";
import SaleList from "./SaleList";
import SaleEdit from "./SaleEdit";
import withAuth from "./helper/withAuth";

const ProtectedClientList = withAuth(ClientList);
const ProtectedClientEdit = withAuth(ClientEdit);
const ProtectedSaleList = withAuth(SaleList);
const ProtectedSaleEdit = withAuth(SaleEdit);

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/Minicore" element={<Home/>}/>
        <Route path="/clients" exact={true} element={<ProtectedClientList/>}/>
        <Route path="/clients/:id" element={<ProtectedClientEdit/>}/>
        <Route path="/sales" exact={true} element={<ProtectedSaleList/>}/>
        <Route path="/sales/:id" element={<ProtectedSaleEdit/>}/>
      </Routes>
    </Router>
  );
};

export default App;
