import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "../navbar/index";
import Sidebar from "./index";
const Layout = (props: PropsWithChildren) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div
      className={classNames({
        "w-full":true,
        "grid bg-zinc-100 min-h-screen": true,
        "md:grid-cols-sidebar": !collapsed,
        "md:grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />
      <div className="w-full">
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;