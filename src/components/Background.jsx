import React from "react";

export default function Background() {
  return (
    <div className="geometric-bg">
      {/* Grid Lines */}
      <div className="grid-line vertical v1"></div>
      <div className="grid-line vertical v2"></div>
      <div className="grid-line vertical v3"></div>
      <div className="grid-line vertical v4"></div>

      <div className="grid-line horizontal h1"></div>
      <div className="grid-line horizontal h2"></div>
      <div className="grid-line horizontal h3"></div>

      {/* Geometric Shapes */}
      <div className="geometric-shape shape-1"></div>
      <div className="geometric-shape shape-2"></div>
      <div className="geometric-shape shape-3"></div>
    </div>
  );
}