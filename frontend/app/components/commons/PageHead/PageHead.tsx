"use client";

import { useEffect } from "react";

interface IPageHeadProps {
    title?: string;
}

const PageHead: React.FC<IPageHeadProps> = ({ title = "MernApp" }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; 
};

export default PageHead;