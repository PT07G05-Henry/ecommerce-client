import React from "react";
import "./loading.css";
import { Waveform } from "@uiball/loaders";

const Loading = ({ size }) => {
  return (
    <div className="loading">
      <Waveform size={size} color="#0c7489" />
    </div>
  );
};

export default Loading;
