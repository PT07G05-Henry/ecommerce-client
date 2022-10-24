import React from "react";
import "./loading.css";
import { Ring } from "@uiball/loaders";

const Loading = ({ size }) => {
  return (
    <div className="loading">
      <Ring size={size} color="#c5a86d" />
    </div>
  );
};

export default Loading;
