import { Layout as AntLayout, Menu, Dropdown, Avatar } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = AntLayout;

import { useImage } from "../hooks/useImage";
import { RiDashboardFill} from "react-icons/ri";
import { FaChartArea, FaChartLine, FaSwatchbook, FaWallet } from "react-icons/fa6";
import { FaExchangeAlt, FaHistory } from "react-icons/fa";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: image, isLoading, isError } = useImage();


  const selectedKey = location.pathname;

  const handleLogout = () => {
    navigate("/login");
  };

  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>خطا در دریافت تصویر</div>;

  return (
    <AntLayout style={{ minHeight: "100vh", direction: "rtl" }}>
      
      {/* SIDEBAR */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
       
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={image}
            alt="logo"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <span style={{  fontWeight: "bold" }}>
            پنل ادمین
          </span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
      
          items={[
            {
              key: "/layout/dashboard",
              icon: <RiDashboardFill />,
              label: <Link to="/layout/dashboard">داشبورد</Link>,
            },
             {
    key: "/layout/portfolio",
    icon: <FaWallet />,
    label: <Link to="/layout/portfolio">سبد دارایی</Link>,
  },
           {
    key: "/layout/assetDetails",
    icon: <FaHistory />,
    label: <Link to="/layout/assetDetails">تاریخچه سفارشات</Link>,
  },
    {
  key: "/layout/tradingTerminal",
 icon: <FaChartLine />, // یا FaChartBar
  label: <Link to="/layout/tradingTerminal">محیط معاملات</Link>,
},
{
  key: "/layout/walletDashboard",
  icon: <FaExchangeAlt />, // یا FaChartBar
  label: <Link to="/layout/walletDashboard">کیف پول</Link>,
},
{
  key: "/layout/tradingHistory",
  icon: <FaHistory />, // یا FaChartBar
  label: <Link to="/layout/tradingHistory">تاریخچه   تراکنش ها</Link>,
},
{
  key: "/layout/watchList",
  icon: <FaSwatchbook />, // یا FaChartBar
  label: <Link to="/layout/watchList">    لیست علاقه مندی</Link>,
},
{
  key: "/layout/markets",
  icon: <FaChartArea />, // یا FaChartBar
  label: <Link to="/layout/markets">      بازار</Link>,
},
{
  key: "/layout/coinDetails",
  icon: <FaChartLine />, // یا FaChartBar
  label: <Link to="/layout/coinDetails">      توضیحات کوین</Link>,
},
{
  key: "/layout/cryptoNewsDashboard",
  icon: <FaChartLine />, // یا FaChartBar
  label: <Link to="/layout/cryptoNewsDashboard">      اخبار </Link>,
},

{
  key: "/layout/CryptoCalendar",
  icon: <FaChartLine />, // یا FaChartBar
  label: <Link to="/layout/CryptoCalendar">      تقویم </Link>,
},

          ]}
        />
      </Sider>

      {/* MAIN */}
      <AntLayout>

        {/* HEADER */}
      <Header
  style={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #eee",
    background: "#fff",
  }}
>
  <Dropdown
    placement="bottomLeft"
    trigger={["click"]}
    menu={{
      items: [
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "خروج",
          onClick: handleLogout,
        },
      ],
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
    >
      <Avatar icon={<UserOutlined />} />
      <span>کاربر</span>
      <DownOutlined />
    </div>
  </Dropdown>
</Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: 24,
            padding: 24,
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>

      </AntLayout>
    </AntLayout>
  );
}