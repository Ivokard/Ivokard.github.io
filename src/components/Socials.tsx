import { FaGithub, FaLinkedin, FaSoundcloud, FaYoutube, FaBandcamp, FaSpotify } from "react-icons/fa6"
import { IoMail } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa";

const Socials = () => {
    return (
        <div className="text-white relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
            <p className="text-white text-lg leading-relaxed mt-4">
                On my social media you can find more about me and updates about my work, projects and interests.
            </p>

            <div className="flex space-x-4 mt-4 mb-7">
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
                    href="https://www.tiktok.com/@ivokardmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <FaTiktok size={24} />
                </a>
                <a
                    href="https://www.instagram.com/ivokard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <LuInstagram size={24} />
                </a>
                <a
                    href="https://soundcloud.com/ivokard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <FaSoundcloud size={24} />
                </a>
                <a
                    href="https://www.youtube.com/@ivokard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <FaYoutube size={24} />
                </a>
                <a
                    href="https://ivokard.bandcamp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <FaBandcamp size={24} />
                </a>
                <a
                    href="https://open.spotify.com/intl-es/artist/1CULdMxPZvF4r5DWa76BOL?si=hiMgLs1oRiW5OTCxrXmSNg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                >
                    <FaSpotify size={24} />
                </a>
            </div>
        </div>
    )
}
export default Socials;