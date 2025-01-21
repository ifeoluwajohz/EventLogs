import Carousel from '../components/Carousel'
import HeroSection from '../components/HeroSection'
import Partners from '../components/Partners'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Carousel />
      <Partners />
      <div className="mt-10">
        <FAQ />
      </div>
    </div>
  )
}

export default Home