const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  angle: i * 30,
  distance: 90 + ((i % 3) * 25),
  delay: (i % 4) * 40,
}));

export default function LogoIntro({ src, alt }) {
  return (
    <div className="relative mx-auto w-[70vw] max-w-3xl md:w-[40vw] md:max-w-md">
      {SPARKLES.map((s, i) => (
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
      <h1 className="animate-logo-pop">
        <img src={src} alt={alt} className="block w-full" />
      </h1>
    </div>
  );
}
