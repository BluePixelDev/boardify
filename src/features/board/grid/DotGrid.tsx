import { useAppSelector } from "@/store";
import "./grid.styles.css";
import { CSSProperties } from "react";

export default function DotGrid({
  color,
  opacity = 0.1,
}: {
  color?: string;
  opacity?: number;
}) {
  const { position, zoom } = useAppSelector((state) => state.graph.graphView);

  const baseDotSize = 2;
  const dotRadius = baseDotSize;
  const baseSpacing = 50;

  const zoomFactor = Math.log2(zoom);
  const fractional = ((zoomFactor % 1) + 1) % 1;
  const gridSpacing = baseSpacing * Math.pow(2, fractional);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSpacing}" height="${gridSpacing}" viewBox="0 0 ${gridSpacing} ${gridSpacing}">
      <circle cx="${gridSpacing / 2}" cy="${gridSpacing / 2}" r="${dotRadius}" fill="${color ?? "white"}" />
    </svg>
  `.trim();

  const encodedSvg = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;

  const backgroundPosX = `${position.x}px`;
  const backgroundPosY = `${position.y}px`;

  const style: CSSProperties = {
    backgroundImage,
    backgroundPosition: `${backgroundPosX} ${backgroundPosY}`,
    backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
    backgroundRepeat: "repeat",
    opacity,
  };

  return <div className="graph-view__grid" style={style} />;
}
