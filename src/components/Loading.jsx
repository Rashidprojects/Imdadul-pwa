
const Loading = () => {
  return (
    <>
      <div className='flex space-x-2 justify-center items-center h-screen dark:inver bg-opacity-0'>
        <div className='h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s] '></div>
        <div className='h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s] '></div>
        <div className='h-5 w-5 bg-secondary rounded-full animate-bounce '></div>
      </div>
    </>
  )
}

export default Loading