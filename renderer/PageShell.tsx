import './PageShell.css'

import React, { ReactNode, useState } from 'react'

import GitHubCorner from '../src/components/GitHubCorner'
import InitWASM from '../src/components/InitWASM'
import type { PageContext } from './types'
import { PageContextProvider } from './usePageContext'

export { PageShell }

const PageShell = ({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) => {
  const [load, setLoad] = useState(false)
  const handleLoad = () => setLoad(true)
  return (
    <React.StrictMode>
      <GitHubCorner />
      <PageContextProvider pageContext={pageContext}>
        <InitWASM onLoad={handleLoad} />
        <Layout>
          {load && children}
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  )
}

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='mx-auto flex min-h-screen max-w-6xl flex-col items-center px-5'>
    {children}
  </div>
)
