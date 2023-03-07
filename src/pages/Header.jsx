import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="header">
      <div className="center">
        <Link to="/">
          <h1 className="logo">PET SHELTER</h1>
        </Link>
        <div className="nav">
          <Link to={"/Announcement"}>
            <h2>
              <SearchOutlined />
              &nbsp; 분양공고
            </h2>
          </Link>
          <Link to={"/Shelter"}>
            <h2>
              <HomeOutlined /> &nbsp; 동물보호센터
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
