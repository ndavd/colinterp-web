import { faCheckCircle, faCheckSquare, faCopy, faThumbsUp, IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useState } from 'react'

interface Props {
  color: string
  percentage: number
  onCopy?: () => void
}

const Color: FC<Props> = ({ color, percentage, onCopy }) => {
  const [icon, setIcon] = useState<IconDefinition>(faCopy)
  const copyIcon = () => setIcon(faCopy)
  const copiedIcon = () => setIcon(faThumbsUp)
  const handleClick = () => {
    onCopy && onCopy()
    copiedIcon()
  }
  return (
    <div className='flex w-full cursor-default flex-col items-center gap-2'>
      <div className='bg-darker border-dark rounded-lg border p-1 px-2 text-sm'>{percentage}%</div>
      <div
        className='border-darker group relative aspect-square w-full cursor-pointer rounded-xl border duration-200 hover:scale-105'
        style={{ backgroundColor: color }}
        onClick={handleClick}
        onMouseEnter={copyIcon}
        onMouseLeave={copyIcon}
      >
        <div className='bg-darker border-dark absolute inset-0 m-auto hidden h-12 w-12 rounded border group-hover:block'>
          <div className='flex h-full w-full items-center justify-center'>
            <FontAwesomeIcon className='text-2xl' icon={icon} />
          </div>
        </div>
      </div>
      <div className='font-mono'>{color}</div>
    </div>
  )
}

export default Color
