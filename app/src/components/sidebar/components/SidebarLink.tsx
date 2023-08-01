import React from 'react';
import { SidebarLinkProps } from '../sidebar.util';



const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, to }) => {
  return (
    <li>
      <a href={to} className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
        <span className="w-6">{icon}</span>
        <span className="ml-3">{text}</span>
      </a>
    </li>
  );
};

export default SidebarLink;
