import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Home from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function App() {
  

  

  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
    
>
      <Router>
        <Routes>

          {/* صفحه لاگین جدا از Layout */}
          <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;