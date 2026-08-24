/**
 * Transforms a Hex-coded color into an RGBA-coded color
 * @param hex color of the input color
 * @param opacity  of the input color
 * @returns rgba string color
 */
export function hexToRgba (hex: string, opacity: number) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}