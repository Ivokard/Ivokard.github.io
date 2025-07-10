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

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const lenisRef = useRef()
  const { t } = useTranslation()

  //Masonry data
  const data = [
    {
      id: 1,
      image: 'images/marble.jpg',
      height: 600,
      title: 'Marble Race Demo',
      description: t('marble_desc'),
      links: [{ icon: <FaGithub size={24} />, url: "https://github.com/Ivokard/React-Threejs-GameDemo" }]
    },

    {
      id: 2,
      image: 'images/eom.png',
      height: 600,
      title: 'Edge of Madness',
      description: t('eom_desc'),
      links: [{ icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/edge-of-madness" }]
    },

    {
      id: 3,
      image: 'images/jrj.png',
      height: 600,
      title: 'Justas Rejustas',
      description: t('justas_desc'),
      links: [{ icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/justas-rejustas" }]
    },

    {
      id: 4,
      image: 'images/banner_pack.png',
      height: 600,
      title: 'Mix of SFX',
      description: t('mix1_desc'),
      links: [{ icon: <FaItchIo size={24} />, url: "https://ivokard.itch.io/mix-of-sfx" }]
    },

  ]
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
            <SplitText text={t('project_title')} />
          </div>
          <div>
            <ProjectLayout
              title="Lethal Soap Dispenser"
              shortDescription={t('lsd_subtitle')}
              description={t('lsd_desc')}
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
              shortDescription={t('night_subtitle')}
              description={t('night_desc')}
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
              shortDescription={t('scale_subtitle')}
              description={t('scale_desc')}
              images={['images/scaletale.webp', 'images/scale_tale_02.webp', 'images/scale_tale_03.webp']}
              links={[
                { icon: <FaItchIo size={24} />, url: "https://morphingames.itch.io/scale-tale" },
                { icon: <FaGlobe size={24} />, url: "https://www.morphingames.com" },
              ]}
            />
          </div>
          <div className="pt-12 z-0">
            <SplitText text={t('other_projects')} />
            <Masonry data={data} />
          </div>
        </div>

        <div id="music" className=" w-full z-10">
          <div>
            <SplitText text={t('music_title')} />
          </div>
          <div className="pt-12">
            <Carousel />
          </div>
        </div>

        <div className="pt-12 z-0">
          <SplitText text={t('socials_title')} />
          <div className='pt-12'>
            <Socials />
          </div>
        </div>
      </div>
    </ReactLenis>

  )
}
