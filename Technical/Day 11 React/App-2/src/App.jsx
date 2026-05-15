
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/hero/Hero';
import { Gallery } from './components/gallery/Gallery';
import { Footer } from './components/Footer/Footer';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
