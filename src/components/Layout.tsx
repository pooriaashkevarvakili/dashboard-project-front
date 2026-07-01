import { Layout as AntLayout, Menu, Dropdown, Avatar } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = AntLayout;

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname.replace("/", "") || "home";

  const items = [
    {
      key: "home",
      label: <Link to="/">خانه</Link>,
    },
    {
      key: "about",
      label: <Link to="/about">درباره ما</Link>,
    },
    {
      key: "contact",
      label: <Link to="/contact">تماس با ما</Link>,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <AntLayout style={{ minHeight: "100vh", direction: "rtl" }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <div
          style={{
            padding: 16,
            textAlign: "center",
            background: "#fff",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <img
            src="/maxonir.png"
            alt="MaxonIR Logo"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: 16 }}>
            پنل ادمین
          </span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ textAlign: "right" }}
        />
      </Sider>

      <AntLayout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          <div />

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
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Avatar icon={<UserOutlined />} />
              <span>کاربر</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: 24,
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
            textAlign: "right",
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}