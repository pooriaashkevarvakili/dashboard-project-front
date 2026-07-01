import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      theme={{ algorithm: theme.defaultAlgorithm }}
    >
      <Router>
        <Routes>

          {/* صفحه لاگین جدا از Layout */}
          <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          {/* صفحات داخل Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;