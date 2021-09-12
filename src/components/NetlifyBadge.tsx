import React, { ReactElement, useState } from "react";
import { useEffect } from "react";

interface Props {}

const NetlifyBadge = ({}: Props): ReactElement => {
  const [src, setSrc] = useState(process.env.REACT_APP_NETLIFY_BADGE);
  useEffect(() => {
    setInterval(() => {
      setSrc(`${process.env.REACT_APP_NETLIFY_BADGE}?dummy=${Math.random() * 100}`);
    }, 1000);
  }, []);

  return <img src={src} crossOrigin="anonymous" />;
};

export default NetlifyBadge;
