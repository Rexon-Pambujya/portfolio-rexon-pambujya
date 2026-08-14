import { Fragment } from "react";

/**
 * Renders **bold** spans from a plain string.
 *
 * Exists so content/profile.js can mark emphasis in a way that produces
 * real <strong> elements. The previous site used Unicode mathematical-bold
 * characters (𝗣𝘆𝘁𝗵𝗼𝗻), which look bold but are read out by screen
 * readers as individual math symbols and are invisible to search.
 */
export default function RichText({ children, className = "" }) {
  if (typeof children !== "string") return children ?? null;

  const parts = children.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const bold = part.startsWith("**") && part.endsWith("**");
        return bold ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </span>
  );
}
