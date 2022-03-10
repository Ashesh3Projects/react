import React from "react";
import logo from "./logo.svg";

function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <h1 className="flex text-center text-xl items-center font-semibold">
        {props.title}
      </h1>
    </div>
  );
}

export default Header;
