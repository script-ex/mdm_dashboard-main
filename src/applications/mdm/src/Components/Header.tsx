import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
// import { Link, Route, Routes } from 'react-router-dom'

function Header({ setBeginStatus, beginStatus }) {
  return (
    <div className="header">
      <Nav setBeginStatus={setBeginStatus} beginStatus={beginStatus} />
    </div>
  );
}

export default Header;
