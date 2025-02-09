import "./boardgrid.css";
import { CSSProperties } from "react";
import { useGraphViewContext } from "../view/GraphView";

export default function GridBackground() {
  const { zoom: scale, translate } = useGraphViewContext();

  const baseDotSize = 2;
  const minDotSize = 2;
  const maxDotSize = 3;

  const dotRadius = Math.min(Math.max(baseDotSize, minDotSize), maxDotSize);
  const gridSpacing = 50 * scale;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSpacing}" height="${gridSpacing}" viewBox="0 0 ${gridSpacing} ${gridSpacing}">
      <circle cx="${gridSpacing / 2}" cy="${gridSpacing / 2}" r="${dotRadius}" fill="white" />
    </svg>
  `.trim();

  const encodedSvg = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;

  const style: CSSProperties = {
    backgroundImage,
     backgroundPosition: `${translate.x}px ${translate.y}px`,
    backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
    backgroundRepeat: "repeat",
    opacity: 0.1,
  };

  return <div className="board-grid-default" style={style} />;
}
