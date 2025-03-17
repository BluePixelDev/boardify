import "../graphviewStyles.css";
import { CSSProperties } from "react";
import { useGraphViewContext } from "./GraphView";

export default function GraphGrid() {
  const { zoom: scale, translate } = useGraphViewContext();

  const baseDotSize = 2;
  const dotRadius = baseDotSize;
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
    backgroundPosition: `calc(50% + ${translate.x}px) calc(50% + ${translate.y}px)`,
    backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
    backgroundRepeat: "repeat",
    opacity: 0.1,
  };

  return <div className="graph-grid" style={style} />;
}
