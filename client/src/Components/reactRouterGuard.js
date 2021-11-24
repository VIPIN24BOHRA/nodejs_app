// import React, {Component} from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function RouterGuard(props) {
  let token = localStorage.getItem("jwt_token");

  return (
    <>{token !== null ? <props.dcomponent /> : <Navigate to="/login" />}</>
  );
}
