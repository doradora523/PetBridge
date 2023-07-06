import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="header">
      <nav className="nav-message">
        <p>🐶반려동물🐱 , 사지말고 입양하세요 !</p>
      </nav>
      <div className="nav-logo">
        <Link to="/">
          <h1 className="logo">펫브릿지</h1>
        </Link>
        <div className="nav-menu">
          <Link to={"/Announcement"} class="link">
            <h2>
              <SearchOutlined />
              &nbsp;분양공고
            </h2>
          </Link>
          <Link to={"/Shelter"} class="link">
            <h2>
              <HomeOutlined /> &nbsp;보호센터
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
