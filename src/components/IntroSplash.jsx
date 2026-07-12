import { useEffect, useRef, useState } from "react";
import superLogo from "../assets/super-logo.png";

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  angle: i * 30,
  distance: 90 + (i % 3) * 25,
  delay: (i % 4) * 60,
}));

export default function IntroSplash({ onComplete, onFinished }) {
  const logoRef = useRef(null);
  const [phase, setPhase] = useState("pop"); // pop -> slide -> done
  const [slideStyle, setSlideStyle] = useState({});

  useEffect(() => {
    const popTimer = setTimeout(() => {
      setPhase("slide");

      // Wait two frames so the browser paints the "slide" class (and its
      // frozen pop-end transform) before we change the target style —
      // otherwise the class swap and the new transform land in the same
      // commit and there's nothing for the CSS transition to animate from.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.getElementById("hero-logo-target");
          if (target && logoRef.current) {
            const targetRect = target.getBoundingClientRect();
            const currentRect = logoRef.current.getBoundingClientRect();
            const dx = targetRect.left + targetRect.width / 2 - (currentRect.left + currentRect.width / 2);
            const dy = targetRect.top + targetRect.height / 2 - (currentRect.top + currentRect.height / 2);
            const scale = targetRect.width / currentRect.width;
            setSlideStyle({ transform: `translate(${dx}px, ${dy}px) scale(${scale})` });
          }
        });
      });
    }, 1000);
    return () => clearTimeout(popTimer);
  }, []);

  useEffect(() => {
    if (phase !== "slide") return;
    const doneTimer = setTimeout(() => {
      // Fire both at once: the real page starts fading in at the exact
      // moment the splash starts fading out, so they crossfade instead of
      // the splash vanishing first and leaving a gap before the page
      // catches up.
      onComplete();
      setPhase("done");
    }, 900);
    return () => clearTimeout(doneTimer);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase !== "done") return;
    const finishTimer = setTimeout(onFinished, 500);
    return () => clearTimeout(finishTimer);
  }, [phase, onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-cream transition-opacity duration-500 ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      {phase === "pop" &&
        SPARKLES.map((s, i) => (
          <span
            key={i}
            className="animate-spark absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-super-red"
            style={{
              "--angle": `${s.angle}deg`,
              "--distance": `${s.distance}px`,
              animationDelay: `${s.delay}ms`,
            }}
          />
        ))}
      <img
        ref={logoRef}
        src={superLogo}
        alt="SUPER!"
        className={`w-[50vw] max-w-sm ${
          phase === "pop" ? "animate-logo-pop" : "transition-transform duration-[900ms] ease-in-out"
        }`}
        style={slideStyle}
      />
    </div>
  );
}
