import React from "react";
import "./sidebarOption.css";

function SidebarOption({ title, Icon }) {
  return (
    <div className="sidebarOptions">
      {Icon && <Icon className="SidebarOptions__icon" fontSize="large" />}
      {Icon ? <h1>{title}</h1> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
