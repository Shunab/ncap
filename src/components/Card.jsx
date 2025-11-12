import React from "react";
import ReactMarkdown from "react-markdown";

export default function Card({ title, description, expanded, fullContent }) {
  return (
    <div className={expanded ? "fade-wrap fade-in" : "fade-wrap"}>
      <h3 className="capability-title">{title}</h3>
      {description && (
        <p className="capability-description">{description}</p>
      )}
      {expanded && fullContent && (
        <div className="blog-scroll">
          <ReactMarkdown>{fullContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

