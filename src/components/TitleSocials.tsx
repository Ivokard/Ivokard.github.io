import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  BrandSpotify, 
  BrandYoutube, 
  BrandInstagram, 
  BrandTwitter, 
  BrandSoundcloud, 
  BrandBandcamp 
} from 'tabler-icons-react'

interface TitleSocialsProps {
  title: string
  socialLinks?: Array<{
    platform: string
    icon: React.ComponentType<{size?: number, color?: string}>
    color: string
    url: string
  }>;
}

const TitleSocials: React.FC<TitleSocialsProps> = ({ 
  title, 
  socialLinks = [
    { 
      platform: 'Spotify', 
      icon: BrandSpotify, 
      color: '#1DB954', 
      url: '' 
    },
    { 
      platform: 'YouTube', 
      icon: BrandYoutube, 
      color: '#FF0000', 
      url: '' 
    },
    { 
      platform: 'Instagram', 
      icon: BrandInstagram, 
      color: '#E1306C', 
      url: '' 
    },
    { 
      platform: 'Twitter', 
      icon: BrandTwitter, 
      color: '#1DA1F2', 
      url: '' 
    },
    { 
      platform: 'SoundCloud', 
      icon: BrandSoundcloud, 
      color: '#FF8800', 
      url: '' 
    },
    { 
      platform: 'Bandcamp', 
      icon: BrandBandcamp, 
      color: '#1D3b3d', 
      url: '' 
    }
  ]
}) => {
    const [showSocialLinks, setShowSocialLinks] = useState(false);

    return (
      <div 
        className="relative inline-flex items-center ml-8 mt-10"
      >
        <motion.div 
          className="flex "
          onHoverStart={() => setShowSocialLinks(true)}
          onHoverEnd={() => setShowSocialLinks(false)}
        >
          <motion.h1 
            className="text-white text-4xl font-bold z-10 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h1>

          <AnimatePresence>
            {showSocialLinks && (
              <motion.div 
                className="absolute left-full ml-4 flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full transition-all"
                      style={{ backgroundColor: link.color }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 } 
                      }}
                    >
                      <Icon size={24} color="white" />
                    </motion.a>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }

export default TitleSocials;