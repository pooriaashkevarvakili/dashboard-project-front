import React from "react";
import { Button, Badge, Dropdown, Avatar } from "antd";
import { BellOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBarChart } from "react-icons/md";
import { Typography } from "antd";

const { Title } = Typography;

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-200">
          <MdBarChart className="text-white text-xl" />
        </div>
        <div>
          <Title level={4} className="!mb-0 !text-gray-800">
            Copy Trading
          </Title>
          <span className="text-gray-400 text-xs">
            Follow & copy top traders
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <input
            type="text"
            placeholder="Search traders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-56 md:w-64 bg-white shadow-sm"
          />
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>

        <Badge count={3} size="small">
          <Button
            type="text"
            icon={<BellOutlined className="text-xl" />}
            className="!w-10 !h-10 rounded-xl bg-white shadow-sm hover:bg-gray-50"
          />
        </Badge>

        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Profile" },
              { key: "2", label: "Settings" },
              { key: "3", label: "Logout" },
            ],
          }}
          placement="bottomRight"
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="cursor-pointer border-2 border-white shadow-sm"
            style={{ backgroundColor: "#667eea" }}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
