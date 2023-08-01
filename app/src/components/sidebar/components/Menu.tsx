import React from 'react';

const Menu: React.FC<any> = ({ children }) => {
  return <ul className="mt-6 space-y-1">{children}</ul>;
};

export default Menu;
