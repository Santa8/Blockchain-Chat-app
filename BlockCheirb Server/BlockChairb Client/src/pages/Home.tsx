import { useEffect } from "react";
import logo from "../assets/logo512.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Worker } from "cluster";

function Home() {
  return (
    <div className="home App-header">
      <h1>Welcome to BlockCheirb ! </h1>
      <img src={logo} className="App-logo" alt="logo" />
      <Button
        onClick={() => {
          window.location.href = "localhost:3000/login";
        }}
      />
      <Link to="/login">
        <Button>Try it now !</Button>
      </Link>
    </div>
  );
}

export default Home;
