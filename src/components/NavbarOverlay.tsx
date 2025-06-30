import { useState } from "react";
import MenuPanel from "./MenuPanel";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const menuItems = ["Projects", "Music", "Social Media"];

interface NavbarOverlayProps {
  onClose: () => void;
}

export default function NavbarOverlay({ onClose }: NavbarOverlayProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>("Projects");

  useGSAP(() => {
    gsap.from(".menu-overlay", {
      duration: 0.5,
      opacity: 0,
      x: 50,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white flex z-50 menu-overlay">
      <div className="w-[70%] bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center text-white text-6xl font-bold">
        Saúl España Ara
      </div>
      <div className="w-[70%] relative p-8">
        <div className="flex space-x-4 mb-8">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`px-4 py-2 rounded-full ${activeMenu === item ? "bg-white text-black" : "hover:underline"
                }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={onClose}
            className="text-2xl font-bold ml-auto"
          >
            ✕
          </button>
        </div>

        <MenuPanel title={activeMenu!} />
      </div>
    </div>
  );
}
