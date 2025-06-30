import { AnimatePresence, motion } from "motion/react"
import React, { useState } from "react"

interface CardProps {
  image: string
  title?: string
  links?: Array<{ icon: React.ReactNode; label: string; url: string }>;
}

const Card: React.FC<CardProps> = ({ image, title = "", links = [] }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleOverlay = () => {
    setShowOverlay((prev) => !prev)
  }

  return (
    <motion.div
      className="
        relative overflow-hidden
        h-[250px] min-w-[250px]
        sm:h-[400px] sm:min-w-[400px]
        xs:h-[200px] xs:min-w-[200px]
        bg-slate-400 rounded-xl flex justify-center max-content"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      onClick={toggleOverlay}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="
    absolute inset-0 z-10 flex flex-col justify-center items-center gap-3 p-4
    overflow-y-auto
    sm:gap-3 sm:p-4
    xs:gap-1 xs:p-2
  "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-60 h-full w-full rounded-xl" />

            {title && (
              <motion.h2
                className="text-white font-bold text-xl z-10 mb-2 text-center
        sm:text-xl
        xs:text-base xs:mb-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
              >
                {title}
              </motion.h2>
            )}

            {links.length > 0 ? (
              links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
          flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition-colors z-10 text-sm
          sm:text-sm sm:px-4 sm:py-2
          xs:text-xs xs:px-2 xs:py-1
        "
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{ y: 10, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              ))
            ) : (
              <motion.p
                className="text-white z-10
        sm:text-sm
        xs:text-xs"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                No links available
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={image}
        alt={title || "Card image"}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}

export default Card
