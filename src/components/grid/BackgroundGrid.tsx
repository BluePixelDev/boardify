import './BackgroundGrid.css'

interface BackgroundGridProps {
  gridSpacing?: number
  dotRadius?: number
  color?: string
}

export const BackgroundGrid = ({
  gridSpacing = 40,
  dotRadius = 2,
  color = 'rgba(255,255,255,0.05)',
}: BackgroundGridProps) => {

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSpacing}" height="${gridSpacing}" viewBox="0 0 ${gridSpacing} ${gridSpacing}">
      <circle cx="${gridSpacing / 2}" cy="${gridSpacing / 2}" r="${dotRadius}" fill="${color}" />
    </svg>
  `.trim()

  const encodedSvg = encodeURIComponent(svg)

  return (
    <div
      className="background-grid"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
