import "../graphStyles.css";
import { CSSProperties } from "react";
import { useGraphViewContext } from "../context/GraphViewContext";

export default function GraphGrid() {
  const { position, zoom } = useGraphViewContext();

  const baseDotSize = 2;
  const dotRadius = baseDotSize;
  const baseSpacing = 50;

  const zoomFactor = Math.log2(zoom);
  const fractional = ((zoomFactor % 1) + 1) % 1; // ensures positive fractional part
  const gridSpacing = baseSpacing * Math.pow(2, fractional);


  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSpacing}" height="${gridSpacing}" viewBox="0 0 ${gridSpacing} ${gridSpacing}">
      <circle cx="${gridSpacing / 2}" cy="${gridSpacing / 2}" r="${dotRadius}" fill="white" />
    </svg>
  `.trim();

  const encodedSvg = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;

  const backgroundPosX = `${position.x}px`;
  const backgroundPosY = `${position.y}px`;

  const style: CSSProperties = {
    backgroundImage,
    backgroundPosition: `${backgroundPosX} ${backgroundPosY}`,
    backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
    backgroundRepeat: "repeat",
    opacity: 0.1,
  };

  return <div className="graph-grid" style={style} />;
}
