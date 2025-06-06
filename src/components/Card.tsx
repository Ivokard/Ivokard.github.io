
import { AnimatePresence, motion } from "motion/react"
import React, { useState } from "react"

interface CardProps {
  image: string
  title?: string
  links?: Array<{ icon: React.ReactNode; label: string; url: string }>
}

const Card: React.FC<CardProps> = ({ image, title = "", links = [] }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden h-[400px] min-w-[400px] bg-slate-400 rounded-xl flex justify-center max-content"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-center items-center gap-3 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-60 h-full w-full rounded-xl" />

            {title && (
              <motion.h2
                className="text-white font-bold text-xl z-10 mb-2 text-center"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
              >
                {title}
              </motion.h2>
            )}

            {/* Links */}
            {links.length > 0 ? (
              links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition-colors z-10 text-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{ y: 10, opacity: 0 }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              ))
            ) : (
              <motion.p
                className="text-white z-10"
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

export default Card;
