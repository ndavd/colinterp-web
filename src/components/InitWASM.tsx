import { FC, useEffect } from 'react'

import initColinterp from '../pkg/colinterp'

interface Props {
  onLoad: () => void
}

const InitWASM: FC<Props> = ({ onLoad }) => {
  useEffect(() => {
    (async () => {
      await initColinterp()
      onLoad()
    })()
  }, [])

  return null
}

export default InitWASM
