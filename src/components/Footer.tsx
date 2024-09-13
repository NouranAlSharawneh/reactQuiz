import React from "react";

interface FooterProps {
  children: React.ReactNode;
  // other props if necessary
}

const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
  return <footer {...props}>{children}</footer>;
};

export default Footer;
