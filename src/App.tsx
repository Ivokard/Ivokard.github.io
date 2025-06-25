import './index.css'
import { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel'
import SplitText from './components/SplitText'
import Masonry from './components/Masonry/Masonry'
//import NavbarOverlay from './components/NavbarOverlay'
import { ReactLenis } from 'lenis/react'
import ProjectLayout from './components/ProjectLayout'
import IntroSection from './components/IntroSection'
import Socials from './components/Socials'
import { FaGooglePlay, FaGlobe, FaItchIo, FaGithub } from 'react-icons/fa'

import gsap from 'gsap'
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()

const data = [
  {
    id: 1,
    image: 'images/marble.jpg',
    height: 600,
    title: 'Marble Race Demo',
    description: 'A small game developed on React with three.js. Part of threejs-journey course.',
    links: [{ icon: <FaGithub size={24} />, url: "https://github.com/Ivokard/React-Threejs-GameDemo" }]
  },

  {
    id: 2,
    image: 'images/eom.png',
    height: 600,
    title: 'Edge of Madness',
    description: 'A 2D action game developed with Godot. Defeat the five bosses without losing.',
    links: [{ icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/edge-of-madness" }]
  },

  {
    id: 3,
    image: 'images/jrj.png',
    height: 600,
    title: 'Justas Rejustas',
    description: 'Get on your horse, grab your lance and shield and get ready to fight exciting duels that will test your combat and strategy skills!',
    links: [{ icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/justas-rejustas" }]
  },

  {
    id: 4,
    image: 'images/eom.png',
    height: 600,
    title: 'Mix of SFX',
    description: 'This pack is a mix of samples that I did for gamejams and old projects.',
    links: [{ icon: <FaItchIo size={24} />, url: "https://ivokard.itch.io/mix-of-sfx" }]
  },

]

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} >
      <div className="flex flex-col overflow-x-hidden w-full relative text-center space-y-6 bg-black min-h-screen">

        {/* <button
          onClick={() => setNavbarOpen(true)}
          className="fixed top-4 right-16 z-50 p-2 text-white "
        >
          ☰
        </button>

        {navbarOpen && <NavbarOverlay onClose={() => setNavbarOpen(false)} />} */}
        <IntroSection />

        <div id="projects" className="relative w-full z-20">
          <div className="absolute top-0 left-0 w-full">
            <SplitText text="Projects" />
          </div>
          <div>
            <ProjectLayout
              title="Lethal Soap Dispenser"
              shortDescription="3D platformer for Windows and Linux devices."
              description="Lethal Soap Dispenser is a classic 3D platformer and puzzle game in which you must make the citizens happy in order to advance in your journey! This game was done for Global Game Jam 2025."
              images={['images/videolsd.png', 'images/lsd2.png', 'images/lsd3.png']}
              links={[
                { icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/lethal-soap-dispenser" },
                { icon: <FaGlobe size={24} />, url: "https://www.morphingames.com" },
              ]}
            />

          </div>
          <div>
            <ProjectLayout
              title="Nightmare Run"
              shortDescription="Endless Runner for Android devices."
              description="Nighmare Run is an Endless Runner type game where you will be continuously chased by death.
            Try to run as far as possible with the help of powerups and your skill.
            The more distance you run the higher your score. So do your best!"
              images={['images/nightmarerun1.png', 'images/nightmarerun2.png', 'images/nightmarerun3.png']}
              links={[
                { icon: <FaGooglePlay size={24} />, url: "https://play.google.com/store/apps/details?id=com.morphingames.nightmareRun" },
                { icon: <FaGlobe size={24} />, url: "https://www.morphingames.com" },
              ]}
            />
          </div>
          <div>
            <ProjectLayout
              title="Scale Tale"
              shortDescription="3D platformer videogame for Windows devices."
              description="Gecko Elders proudly tell of their descent from Dragons, but fewer and fewer people believe these stories, including Endal.
            However, after finding a mysterious giant Scale that gave him the power to resize the world around him, Endal decided to embark on an adventure in the search of its origin.
            Embark in an adventure of Great Scales and help Endal find the 5 Power Scales!"
              images={['images/scaletale.webp', 'images/scale_tale_02.webp', 'images/scale_tale_03.webp']}
              links={[
                { icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/scale-tale" },
                { icon: <FaGlobe size={24} />, url: "https://www.morphingames.com" },
              ]}
            />
          </div>
          <div className="pt-12 z-0">
            <SplitText text="Other projects" />
            <Masonry data={data} />
          </div>
        </div>

        <div id="music" className=" w-full z-10">
          <div>
            <SplitText text="Music" />
          </div>
          <div className="pt-12">
            <Carousel />
          </div>
        </div>

        <div className="pt-12 z-0">
          <SplitText text="Social media" />
          <div className='pt-12'>
            <Socials />
          </div>
        </div>
      </div>
    </ReactLenis>

  )
}
