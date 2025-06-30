import useMeasure from "react-use-measure"
import Card from "./components/Card"
import { animate, motion, useMotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { FaYoutube, FaSpotify, FaBandcamp, FaSoundcloud, FaApple } from "react-icons/fa"

interface CardData {
  image: string
  title?: string
  links?: Array<{
    platform: "youtube" | "spotify" | "bandcamp" | "soundcloud" | "apple" | "other"
    url: string
  }>;
}

export default function Carousel() {
  const cardsData: CardData[] = [
    {
      image: "./images/videolsd.png",
      title: "Lethal Soap Dispenser (OST) [Global Game Jam]",
      links: [
        { platform: "youtube", url: "https://youtu.be/fautewzSBD8?si=klTeNjSDhSgt__RB" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/album/lethal-soap-dispenser-ost-global-game-jam" },
      ],
    },
    {
      image: "./images/videophoton.png",
      title: "Photonic Pace",
      links: [
        { platform: "youtube", url: "https://www.youtube.com/watch?v=YwvVxj9CqCA" },
        { platform: "soundcloud", url: "https://soundcloud.com/ivokard/photonic-pace" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/track/photonic-pace" }
      ],
    },
    {
      image: "./images/bubblejpg.jpg",
      title: "Bubbles",
      links: [
        { platform: "youtube", url: "https://www.youtube.com/watch?v=fa7I0oaiJ6o" },
        { platform: "soundcloud", url: "https://soundcloud.com/ivokard/bubbles" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/track/bubbles" }
      ],
    },
    {
      image: "./images/cloudy.png",
      title: "Cloudy Afternoon",
      links: [
        { platform: "youtube", url: "https://www.youtube.com/watch?v=_zLUkYkv96A" },
        { platform: "soundcloud", url: "https://soundcloud.com/ivokard/cloudy-afternoon" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/track/cloudy-afternoon" }
      ],
    },
    {
      image: "./images/portada1_3.png",
      title: "Impulso",
      links: [
        { platform: "spotify", url: "https://open.spotify.com/intl-es/track/39xdHmS8f07WcgYVzgQZNn?si=2cc11233d6c843a1" },
        { platform: "youtube", url: "https://www.youtube.com/watch?v=ur1xF7gZsYs" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/track/impulso" }
      ],
    },
    {
      image: "./images/letargo.png",
      title: "Letargo",
      links: [
        { platform: "spotify", url: "https://open.spotify.com/intl-es/album/1VgaHpVhXDZBbJmwARX0Av" },
        { platform: "youtube", url: "https://www.youtube.com/watch?v=F-K1BiFhClQ&list=OLAK5uy_mMmoWA3ol6LFbA7IHB4iYK0TLP1kPZV0k" },
        { platform: "bandcamp", url: "https://ivokard.bandcamp.com/album/letargo" }
      ],
    },
  ];

  const platformIcons: Record<string, React.ReactNode> = {
    youtube: <FaYoutube size={20} />,
    spotify: <FaSpotify size={20} />,
    bandcamp: <FaBandcamp size={20} />,
    soundcloud: <FaSoundcloud size={20} />,
    apple: <FaApple size={20} />,
    other: <FaYoutube size={20} />,
  }

  const FAST_DURATION = 20
  const SLOW_DURATION = 90

  const [duration, setDuration] = useState(FAST_DURATION)
  const [isDragging, setIsDragging] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  const [ref, { width }] = useMeasure()
  const xTranslation = useMotionValue(0)
  const [mustFinish, setMustFinish] = useState(false)

  const contentWidth = cardsData.length * (400 + 32)

  const dragConstraints = {
    left: -contentWidth,
    right: 0,
  }

  const restartAutoAnimation = () => {
    const currentX = xTranslation.get()
    if (currentX < -width) {
      xTranslation.set(0)
    }
    setAutoPlay(true)
    setIsDragging(false)
  }

  useEffect(() => {
    if (!autoPlay || isDragging) return

    let controls
    let finalPos = -contentWidth / 2

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPos], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPos),
        onComplete: () => {
          setMustFinish(false)
        },
      })
    } else {
      controls = animate(xTranslation, [0, finalPos], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      })
    }
    return controls?.stop
  }, [xTranslation, width, duration, autoPlay, isDragging, mustFinish])

  return (
    <main className="py-8 overflow-hidden z-20">
      <motion.div
        key={width}
        className="left-0 flex gap-8 max-content cursor-grab active:cursor-grabbing"
        ref={ref}
        style={{ x: xTranslation }}
        drag="x"
        dragConstraints={dragConstraints}
        onDragStart={() => {
          setIsDragging(true)
          setAutoPlay(false)
        }}
        onDragEnd={() => {
          setTimeout(restartAutoAnimation, 2000)
        }}
        onHoverStart={() => {
          if (!isDragging) {
            setMustFinish(true)
            setDuration(SLOW_DURATION)
          }
        }}
        onHoverEnd={() => {
          if (!isDragging) {
            setMustFinish(true)
            setDuration(FAST_DURATION)
          }
        }}
      >
        {[...cardsData, ...cardsData].map((cardData, index) => (
          <Card
            key={index}
            image={cardData.image}
            title={cardData.title}
            links={
              cardData.links
                ? cardData.links.map((link) => ({
                  icon: platformIcons[link.platform] || platformIcons["other"],
                  label: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
                  url: link.url,
                }))
                : []
            }
          />
        ))}
      </motion.div>
    </main>
  )
}