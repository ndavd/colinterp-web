import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const DATA = [
  { label: 'ndavd.eth - Colinterp Creator & Web Developer', address: import.meta.env.VITE_ADDRESS_1 },
  { label: 'Web Designer', address: import.meta.env.VITE_ADDRESS_2 }
]

const Page = () => {
  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
  }
  const handleClick = (address: string) => handleCopyAddress(address)
  return (
    <div className='flex w-full flex-col gap-10'>
      <a className='flex flex-row items-center gap-2' href='/'>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        <text>Go back</text>
      </a>
      <div className='text-xl'>Support this project</div>
      {DATA.map(({ label, address }, i) => (
        <div key={i} className='flex flex-col gap-2 font-mono'>
          <div className='font-bold'>{label}</div>
          <div className='flex items-center gap-2'>
            <div className='opacity-70'>Ethereum (EVM compatible):</div>
            <div
              className='bg-darker w-fit rounded px-1'
            >
              {address}
            </div>
            <button className='underline' onClick={() => handleClick(address)}>Copy address</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Page }
