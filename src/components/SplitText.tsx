import { useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText);

interface SplitTextAnimationProps {
  text: string;
}

export default function SplitTextAnimation({ text }: SplitTextAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!textRef.current) return;

    let split = new SplitText(textRef.current, { type: "words, chars" })

    gsap.from(split.chars, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
      ease: "power3.out",
    })

    return () => split.revert()
  }, { scope: textRef })

  return (
    <div ref={textRef} className="split text-4xl font-bold text-white">
      {text}
    </div>
  )
}
