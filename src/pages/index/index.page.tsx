import Content from './Content'
import Support from './Support'

const Page = () => {
  return (
    <>
      <img className='my-16 w-40' src='colinterp.webp' alt='logo' />
      <Content />
      <div className='mt-auto'>
        <Support />
      </div>
    </>
  )
}

export { Page }
