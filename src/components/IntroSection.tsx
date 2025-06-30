import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useTranslation } from 'react-i18next'


const IntroSection = () => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="videos/portfolio.mp4"
        autoPlay
        loop
        muted
        playsInline
      />


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
        <h1 className="text-5xl md:text-7xl font-bold">SAÚL ESPAÑA ARA</h1>
        <p className="text-lg md:text-3xl max-w-2xl">
          Software Developer & Game Developer
        </p>
        <br>
        </br>
        <p className="text-lg md:text-2xl max-w-2xl">
          {t('intro_desc')}
          <br />
          {t('intro_desc2')}
        </p>

        <div className="flex space-x-4 mt-4">
          <a
            href="https://www.linkedin.com/in/saúl-españa-7aabaa26a/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Ivokard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="mailto:saulespanaara3@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
          >
            <IoMail size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
