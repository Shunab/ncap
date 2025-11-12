// src/components/TransitionLayer.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * TransitionLayer
 * Renders a temporary, fixed-size "merged card" centered inside the right panel
 * during page transitions. Show it by passing active={true} and hide it when
 * onAnimationComplete fires (or control via parent state).
 *
 * Props:
 * - active: boolean — whether to render the layer
 * - onComplete: function — called when the entrance animation finishes
 * - width: number (optional) — merged card width in px (default 400)
 * - height: number (optional) — merged card height in px (default 180)
 */
export default function TransitionLayer({
  active,
  onComplete,
  width = 400,
  height = 180,
}) {
  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center", // vertical center
        justifyContent: "center", // horizontal center
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width, height, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
        onAnimationComplete={onComplete}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-base)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)", // subtle lift
        }}
      />
    </div>
  );
}