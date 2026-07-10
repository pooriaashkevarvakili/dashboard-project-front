import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import AssetDetails from "./pages/AssetDetails";
import TradingTerminal from "./pages/TradingTerminal";
import WalletDashboard from "./pages/WalletDashboard";

function App() {
  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <Router>
        <Routes>
          {/* صفحه لاگین جدا از Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Layout />}>
          <Route path='assetDetails' element={<AssetDetails/>}/>

          
            <Route index element={<Dashboard />} />
            <Route path="about" element={<About />} />
                        <Route path="tradingTerminal" element={<TradingTerminal />} />
                        <Route path="walletDashboard" element={<WalletDashboard />} />

            <Route path="portfolio" element={<Portfolio/>}/>
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
