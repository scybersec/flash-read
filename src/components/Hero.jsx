import { logo } from '../assets'


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        
            <img src={logo} alt='app_logo' className=' w-60 object-contain'/>
        
            <button 
                type='button'
                onClick={() => window.open('https://github.com/scybersec')}
                className='black_btn glassmorphism font-robotoC'
            >
                View Code
            </button>
        </nav>

        <h1 className='head_text'>
            Get To The Point Faster with <br className='max-md:hidden'/>
            <span className='blueGreen_gradient'>FLASH-READ</span>
        </h1>
        <h2 className='desc'>
            Powered by GPT-4, FLASH-READ helps you spend less time reading and more time doing. Paste the article's URL below to get started.
        </h2>
    </header>
  )
}

export default Hero

