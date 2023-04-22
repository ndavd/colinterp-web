import { generate_flat_palette } from './pkg/colinterp'

export const generatePalette = (colorA: string, colorB: string, n: number): string[] => {
  const flatPalette = generate_flat_palette(colorA, colorB, n)
  const palette = []
  for (let i = 0; i < flatPalette.length; i += 3) {
    palette.push((
      '#' +
      flatPalette[i].toString(16).padStart(2, '0') +
      flatPalette[i + 1].toString(16).padStart(2, '0') +
      flatPalette[i + 2].toString(16).padStart(2, '0')
    ).toUpperCase())
  }
  return palette
}

export const copyColor = async (color: string, excludeHashtag?: boolean): Promise<void> => {
  await navigator.clipboard.writeText(excludeHashtag ? color.substring(1) : color)
}
