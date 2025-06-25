import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface ProjectLayoutProps {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  links?: { icon: React.ReactNode; url: string }[];
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ title, shortDescription, description, images, links }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  
  const openImage = (src: string) => {
    setSelectedImage(src)
  }

  const closeImage = () => {
    if (overlayRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setSelectedImage(null)
        }
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      })
    } else {
      setSelectedImage(null)
    }
  }
  useEffect(() => {
    if (selectedImage && overlayRef.current && imageRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(imageRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 })
    }
  }, [selectedImage])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-8 text-left mt-24">

      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-white">{title}</h1>

        <p className="text-2xl text-blue-300 font-medium">
          {shortDescription}
        </p>

        <p className="text-white text-lg leading-relaxed">
          {description}
        </p>

        {links && links.length > 0 && (
          <div className="flex space-x-4 mt-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-3 rounded-full hover:bg-blue-300 transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <img
          src={images[0]}
          alt=""
          onClick={() => openImage(images[0])}
          className="rounded-lg w-full object-cover"
        />

        <div className="grid grid-cols-2 gap-4">
          <img
            src={images[1]}
            alt=""
            onClick={() => openImage(images[1])}
            className="rounded-lg w-full object-cover"
          />
          <img
            src={images[2]}
            alt=""
            onClick={() => openImage(images[2])}
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>
     {selectedImage && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
          onClick={closeImage}
        >
          <div
            ref={imageRef}
            className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-700"
            >
              ✖️
            </button>
            <img src={selectedImage} alt="Preview" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectLayout;
