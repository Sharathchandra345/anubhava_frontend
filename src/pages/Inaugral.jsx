import React, { useState } from "react";
import backgroundImage from "../static/images/inaugralPage.png";
import { useNavigate } from "react-router-dom";

const Inaugral = () => {
  const navigate = useNavigate();
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  if (redirectToHome) {
    navigate("/");
    return null;
  }

  return (
    <div style={backgroundStyles}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=""
          className="p-2"
          style={{
            background: "transparent",
            color: "black",
            position: "absolute",
            left: "517px",
            top: "325px",
            height: "41px",
            width: "240px",
            border: "none",
            outline: "none",
          }}
        />
        <br />
        <input
          type="password"
          placeholder=""
          className="p-2"
          style={{
            background: "transparent",
            color: "black",
            position: "absolute",
            left: "517px",
            top: "375px",
            height: "41px",
            width: "240px",
            border: "none",
            outline: "none",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            border: "none",
            background: "transparent",
            position: "absolute",
            left: "490px",
            top: "465px",
            height: "41px",
            width: "245px",
          }}
          onSubmit={handleSubmit}
        ></button>
      </form>
    </div>
  );
};

export default Inaugral;
