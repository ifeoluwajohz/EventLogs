import Carousel from '../components/Carousel'
// import EventSearchByLocation from '../components/EventSearchByLocation'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div className='text-center'>
      <HeroSection />
      <Carousel />
      {/* <EventSearchByLocation /> */}
    </div>
  )
}

export default Home