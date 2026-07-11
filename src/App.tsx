import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import TradingHistory from "./pages/TransactionHistory";

function App() {
  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <Router>
        <Routes>
          {/* مسیر اصلی به Signup هدایت می‌شود */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* صفحات ورود و ثبت‌نام */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* صفحات داخل Layout */}
          <Route path="layout" element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="assetDetails" element={<AssetDetails />} />
            <Route path="about" element={<About />} />
            <Route path="tradingTerminal" element={<TradingTerminal />} />
            <Route path="walletDashboard" element={<WalletDashboard />} />
            <Route path="tradingHistory" element={<TradingHistory />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;