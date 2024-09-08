import React from "react";

interface MaincompProps {
  children: React.ReactNode;
}

function Maincomp({ children }: MaincompProps) {
  return <main className="main">{children}</main>;
}

export default Maincomp;
