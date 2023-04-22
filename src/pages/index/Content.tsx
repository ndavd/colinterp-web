import { FC, useEffect, useState } from 'react'

import { copyColor, generatePalette } from '../../utils'
import Color from './Color'

const DEFAULT_COLOR_A = '#6E41D7'
const DEFAULT_COLOR_B = '#2C7D5E'
const DEFAULT_N = 10
const DEFAULT_INCLUDE_HASHTAG = true

interface Color {
  percentage: number
  hex: string
}

const Content: FC = () => {
  const [colorA, setColorA] = useState<string>(DEFAULT_COLOR_A)
  const [colorB, setColorB] = useState<string>(DEFAULT_COLOR_B)
  const [n, setN] = useState<number | null>(DEFAULT_N)
  const [palette, setPalette] = useState<Color[]>([])
  const [includeHashtag, setIncludeHashtag] = useState<boolean>(DEFAULT_INCLUDE_HASHTAG)

  const realN = n ?? 3

  const getPercentage = (pos: number) => (pos == 0) ? 0 : +(pos * 100 / (realN - 1)).toFixed(1)

  const handlePaletteCreation = () => {
    setPalette(
      generatePalette(colorA, colorB, realN)
        .map((hex, i) => ({ hex, percentage: getPercentage(i) } as Color))
    )
  }

  const handleCopy = (color: string) => copyColor(color, !includeHashtag)

  useEffect(() => handlePaletteCreation(), [])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorSetter: (color: string) => void) => {
    const value = e.currentTarget.value
    if (value.length > 7) return
    if (!(/^#[a-fA-F0-9]*$/).test(value)) return
    colorSetter(value.toUpperCase())
  }

  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (value == '') return setN(null)
    if (!Number.isInteger(+value)) return
    if (+value > 100) return
    setN(+value)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked
    setIncludeHashtag(checked)
  }

  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <text className='text-lg'>Enter hex colors</text>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <div className='-mb-3 flex w-full items-center gap-4 text-center'>
          <label className='w-full'>Start color</label>
          <label className='w-full'>End color</label>
          <label className='w-2/3'>Variations</label>
        </div>
        <div className='flex w-full items-center gap-4'>
          <input className='bg-darker w-full rounded-lg p-2 px-3 text-center' value={colorA} onChange={e => handleColorChange(e, setColorA)} />
          <input className='bg-darker w-full rounded-lg p-2 px-3 text-center' value={colorB} onChange={e => handleColorChange(e, setColorB)} />
          <input className='bg-darker w-2/3 rounded-lg p-2 px-3 text-center' type='number' value={n ?? undefined} onChange={handleNChange} />
        </div>
        <button
          className='bg-dark hover:bg-darker disabled:bg-darker w-full rounded-xl p-2 py-4 text-lg'
          onClick={handlePaletteCreation}
          disabled={!n || n < 3 || colorA.length < 7 || colorB.length < 7}
        >
          Create palette 🧙‍♂️
        </button>
        <div className='flex items-center gap-4'>
          <input type='checkbox' className='h-5 w-5' checked={includeHashtag} onChange={handleCheckbox} />
          <label>Include hashtag when copying</label>
        </div>
      </div>
      <div className='my-4 grid w-full grid-cols-[repeat(auto-fit,6rem)] gap-x-4 gap-y-6'>
        {palette.map(({ hex, percentage }, i) => (
          <Color
            key={i}
            color={hex}
            percentage={percentage}
            onCopy={() => handleCopy(hex)}
          />
        ))}
      </div>
    </div>
  )
}

export default Content
