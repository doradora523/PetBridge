import React from "react";
import "./style.scss";

const Loader = () => {
  return (
    <div className="flex-container">
      <div className="loading-image__container">
        <div className="loading-image__border"></div>
        <img
          src="https://media4.giphy.com/media/H4DjXQXamtTiIuCcRU/200.webp?cid=ecf05e47mqm11tv9d6g11s39is1edpl12r94h7kpypzcu60n&rid=200.webp&ct=g"
          className="loading-image"
          alt="loading"
        />
      </div>
    </div>
  );
};

export default Loader;
