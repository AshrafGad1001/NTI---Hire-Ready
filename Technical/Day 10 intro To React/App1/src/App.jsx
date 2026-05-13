import './App.css';
import { Home } from './components/home/Home';
import { About } from './components/about/About';
import { Footer } from './components/footer/Footer';
import { Contact } from './components/contact/Contact';


function App() {

  return (
    <>
      <h1>Welcome In NTI [Open Source Web Application]</h1>
      <Home />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default App
