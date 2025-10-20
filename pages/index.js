import React, { useState, useEffect } from 'react';

export default function HouseWarmingInvite() {
  const [stage, setStage] = useState('initial');
  const [keyPosition, setKeyPosition] = useState({ y: -400, rotate: -45, scale: 0.5, opacity: 0 });
  const [doorOpen, setDoorOpen] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [lightRays, setLightRays] = useState(0);
  const [cameraZoom, setCameraZoom] = useState(1);
  const [divineParticles, setDivineParticles] = useState([]);
  const [lotusBloom, setLotusBloom] = useState(0);
  const [omkaarGlow, setOmkaarGlow] = useState(0);
  const [energyWaves, setEnergyWaves] = useState([]);
  const [celestialRing, setCelestialRing] = useState(0);

  useEffect(() => {
    if (stage === 'unlocking') {
      let omGlow = 0;
      const omInterval = setInterval(() => {
        omGlow += 0.03;
        setOmkaarGlow(Math.min(omGlow, 1));
        if (omGlow >= 1) clearInterval(omInterval);
      }, 30);

      setTimeout(() => setCameraZoom(1.15), 100);
      setTimeout(() => setKeyPosition({ y: -400, rotate: -45, scale: 0.5, opacity: 1 }), 300);
      setTimeout(() => { setKeyPosition({ y: -200, rotate: -30, scale: 0.65, opacity: 1 }); generateEnergyWave(); }, 900);
      setTimeout(() => { setKeyPosition({ y: -80, rotate: -10, scale: 0.85, opacity: 1 }); generateEnergyWave(); }, 1600);
      setTimeout(() => { setKeyPosition({ y: 0, rotate: 0, scale: 1, opacity: 1 }); generateEnergyWave(); }, 2300);

      setTimeout(() => {
        let ring = 0;
        const ringInterval = setInterval(() => {
          ring += 0.05;
          setCelestialRing(Math.min(ring, 1));
          if (ring >= 1) clearInterval(ringInterval);
        }, 20);

        let bloom = 0;
        const bloomInterval = setInterval(() => {
          bloom += 0.04;
          setLotusBloom(Math.min(bloom, 1));
          if (bloom >= 1) clearInterval(bloomInterval);
        }, 25);

        let glow = 0;
        const glowInterval = setInterval(() => {
          glow += 0.015;
          setGlowIntensity(Math.min(glow, 1));
          if (glow >= 1) clearInterval(glowInterval);
        }, 20);
      }, 3000);

      setTimeout(() => { setKeyPosition(prev => ({ ...prev, rotate: 22.5 })); generateDivineParticles(30); }, 3600);
      setTimeout(() => { setKeyPosition(prev => ({ ...prev, rotate: 45 })); generateDivineParticles(40); }, 3800);
      setTimeout(() => { setKeyPosition(prev => ({ ...prev, rotate: 67.5 })); setGlowIntensity(1.3); generateDivineParticles(50); }, 4000);
      
      setTimeout(() => {
        setKeyPosition(prev => ({ ...prev, rotate: 90 }));
        setGlowIntensity(1.8);
        generateDivineParticles(80);
        for (let i = 0; i < 5; i++) {
          setTimeout(() => generateEnergyWave(), i * 100);
        }
      }, 4200);

      setTimeout(() => {
        let rays = 0;
        const rayInterval = setInterval(() => {
          rays += 0.08;
          setLightRays(Math.min(rays, 1));
          if (rays >= 1) clearInterval(rayInterval);
        }, 25);
      }, 4400);

      setTimeout(() => {
        setCameraZoom(0.95);
        setStage('opening');
        
        let openAmount = 0;
        let velocity = 0;
        let acceleration = 0.2;
        
        const doorInterval = setInterval(() => {
          velocity += acceleration;
          openAmount += velocity;
          
          if (openAmount > 70) acceleration = -0.1;
          
          setDoorOpen(Math.min(openAmount, 100));
          
          if (Math.random() > 0.7) generateDivineParticles(5);
          
          if (openAmount >= 100) {
            clearInterval(doorInterval);
            setTimeout(() => setStage('invitation'), 1000);
          }
        }, 16);
      }, 4800);
    }
  }, [stage]);

  const generateDivineParticles = (count) => {
    const particles = Array.from({ length: count }, (_, i) => ({
      id: Math.random(),
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.3,
      speed: 1.5 + Math.random() * 3.5,
      size: 2 + Math.random() * 6,
      delay: Math.random() * 0.2,
      type: Math.random() > 0.5 ? 'gold' : 'white'
    }));
    setDivineParticles(prev => [...prev, ...particles]);
    setTimeout(() => {
      setDivineParticles(prev => prev.filter(p => !particles.find(np => np.id === p.id)));
    }, 1500);
  };

  const generateEnergyWave = () => {
    const wave = { id: Math.random(), timestamp: Date.now() };
    setEnergyWaves(prev => [...prev, wave]);
    setTimeout(() => {
      setEnergyWaves(prev => prev.filter(w => w.id !== wave.id));
    }, 1500);
  };

  const handleStart = () => {
    setStage('unlocking');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-950 via-red-950 to-purple-950">
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: `${Math.random() > 0.5 ? '#FCD34D' : '#FFFFFF'}`,
              animation: `twinkle ${2 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.4 + Math.random() * 0.6
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatSlow ${20 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            {['ॐ', '🪷', '🕉️', '🙏'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {stage === 'initial' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center px-4 animate-fadeIn">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 animate-spin-slow">
                <div className="w-48 h-48 mx-auto rounded-full border-4 border-yellow-500 opacity-30"></div>
              </div>
              <div className="absolute inset-0 animate-spin-slower">
                <div className="w-40 h-40 mx-auto mt-4 rounded-full border-2 border-orange-400 opacity-40"></div>
              </div>
              <div className="text-9xl mb-6 animate-float relative z-10">🕉️</div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-serif text-yellow-200 mb-6 tracking-wider animate-glow-divine" 
                style={{ textShadow: '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 146, 36, 0.4), 0 0 150px rgba(220, 38, 38, 0.2)' }}>
              Griha Pravesh
            </h1>
            
            <div className="relative mb-8">
              <div className="w-96 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto animate-pulse-divine"></div>
              <div className="absolute inset-0 w-96 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto blur-sm animate-pulse-divine"></div>
            </div>
            
            <p className="text-4xl text-orange-300 tracking-widest font-serif mb-12 animate-glow-soft">
              श्री राम जय राम
            </p>
            
            <button
              onClick={handleStart}
              className="group relative px-20 py-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white text-2xl font-bold rounded-full overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-orange-500/60 hover:scale-110 animate-pulse-divine"
              style={{ boxShadow: '0 0 40px rgba(251, 146, 36, 0.4)' }}
            >
              <span className="relative z-10 tracking-widest">Begin Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 animate-shimmer-fast bg-gradient-to-r from-transparent via-white to-transparent" style={{ backgroundSize: '200% 100%' }}></div>
              </div>
            </button>
          </div>
        </div>
      )}

      {(stage === 'unlocking' || stage === 'opening') && (
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out"
          style={{ transform: `scale(${cameraZoom})` }}
        >
          <div className="relative w-full h-full max-w-5xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-h-screen p-4">
                
                {celestialRing > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-full h-full" style={{ opacity: celestialRing }}>
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#celestialGradient)" strokeWidth="3" strokeDasharray="10 5" className="animate-spin-slow" />
                      <circle cx="50%" cy="50%" r="42%" fill="none" stroke="url(#celestialGradient)" strokeWidth="2" strokeDasharray="5 10" className="animate-spin-slower" style={{ animationDirection: 'reverse' }} />
                      <defs>
                        <linearGradient id="celestialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FCD34D" stopOpacity={celestialRing} />
                          <stop offset="50%" stopColor="#F59E0B" stopOpacity={celestialRing * 0.6} />
                          <stop offset="100%" stopColor="#DC2626" stopOpacity={celestialRing * 0.3} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}

                {energyWaves.map(wave => (
                  <div key={wave.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute rounded-full border-2 border-yellow-400" style={{ width: '100px', height: '100px', animation: 'energyWave 1.5s ease-out forwards', opacity: 0.8 }} />
                  </div>
                ))}

                {omkaarGlow > 0 && (
                  <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-8xl z-50 pointer-events-none"
                    style={{
                      opacity: omkaarGlow,
                      textShadow: `0 0 ${omkaarGlow * 60}px rgba(251, 191, 36, ${omkaarGlow}), 0 0 ${omkaarGlow * 120}px rgba(251, 146, 36, ${omkaarGlow * 0.6})`,
                      filter: `drop-shadow(0 0 ${omkaarGlow * 30}px rgba(251, 191, 36, ${omkaarGlow * 0.8}))`
                    }}
                  >
                    🕉️
                  </div>
                )}

                {lotusBloom > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="600" height="600" viewBox="0 0 600 600" style={{ opacity: lotusBloom }}>
                      <defs>
                        <radialGradient id="petalGradient">
                          <stop offset="0%" stopColor="#FDE047" />
                          <stop offset="50%" stopColor="#FB923C" />
                          <stop offset="100%" stopColor="#F87171" />
                        </radialGradient>
                      </defs>
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30) - 90;
                        const radius = 80 + (lotusBloom * 120);
                        return (
                          <ellipse key={i} cx="300" cy="300" rx="30" ry="60" fill="url(#petalGradient)" opacity={0.6}
                            style={{
                              transformOrigin: '300px 300px',
                              transform: `rotate(${angle}deg) translate(${radius}px, 0) scale(${lotusBloom})`,
                              transition: 'all 0.3s ease-out'
                            }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                )}

                {lightRays > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="absolute w-2 h-full origin-center"
                        style={{
                          background: `linear-gradient(to bottom, transparent, rgba(251, 191, 36, ${lightRays * 0.8}), transparent)`,
                          transform: `rotate(${i * 15}deg)`,
                          opacity: lightRays,
                          animation: `rayPulse ${2 + (i % 3)}s ease-in-out infinite`,
                          animationDelay: `${i * 0.05}s`,
                          filter: 'blur(1px)'
                        }}
                      />
                    ))}
                  </div>
                )}

                {divineParticles.map(particle => (
                  <div key={particle.id} className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      animation: `particleExplosion ${1 + particle.delay}s ease-out forwards`,
                      animationDelay: `${particle.delay}s`,
                      '--angle': `${particle.angle}rad`,
                      '--speed': particle.speed,
                      '--size': `${particle.size}px`
                    }}
                  >
                    <div 
                      className={`rounded-full ${particle.type === 'gold' ? 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500' : 'bg-gradient-to-br from-white to-yellow-100'}`}
                      style={{ 
                        width: `${particle.size}px`, 
                        height: `${particle.size}px`,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.type === 'gold' ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255, 255, 255, 0.9)'}`
                      }}
                    />
                  </div>
                ))}

                <svg className="absolute inset-0 w-full h-full drop-shadow-2xl" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="frameGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FEF3C7" />
                      <stop offset="20%" stopColor="#FDE047" />
                      <stop offset="40%" stopColor="#FCD34D" />
                      <stop offset="60%" stopColor="#FBBF24" />
                      <stop offset="80%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                    <linearGradient id="doorWood" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#92400E" />
                      <stop offset="30%" stopColor="#78350F" />
                      <stop offset="60%" stopColor="#654321" />
                      <stop offset="100%" stopColor="#451A03" />
                    </linearGradient>
                    <filter id="doorShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="15"/>
                      <feOffset dx="0" dy="10" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.7"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="innerShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                      <feOffset dx="0" dy="3"/>
                      <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    </filter>
                    <radialGradient id="keyholeGlow">
                      <stop offset="0%" stopColor="#FEF3C7" stopOpacity={glowIntensity} />
                      <stop offset="20%" stopColor="#FDE047" stopOpacity={glowIntensity * 0.9} />
                      <stop offset="40%" stopColor="#FCD34D" stopOpacity={glowIntensity * 0.7} />
                      <stop offset="60%" stopColor="#F59E0B" stopOpacity={glowIntensity * 0.4} />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <radialGradient id="doorGlow">
                      <stop offset="0%" stopColor="rgba(254, 243, 199, 0)" />
                      <stop offset="50%" stopColor={`rgba(251, 191, 36, ${glowIntensity * 0.2})`} />
                      <stop offset="100%" stopColor={`rgba(251, 146, 36, ${glowIntensity * 0.4})`} />
                    </radialGradient>
                    <filter id="goldenGlow">
                      <feGaussianBlur stdDeviation={glowIntensity * 8} result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <rect x="35" y="35" width="730" height="930" fill="none" stroke="url(#frameGold)" strokeWidth="14" rx="30" filter="url(#goldenGlow)"/>
                  <rect x="50" y="50" width="700" height="900" fill="none" stroke="url(#frameGold)" strokeWidth="8" rx="25" opacity="0.9"/>
                  <rect x="65" y="65" width="670" height="870" fill="none" stroke="url(#frameGold)" strokeWidth="4" rx="20" opacity="0.6"/>
                  <rect x="80" y="80" width="640" height="840" fill="none" stroke="url(#frameGold)" strokeWidth="2" rx="15" opacity="0.3"/>
                  
                  <path d="M 140 80 Q 250 35 400 35 Q 550 35 660 80" fill="none" stroke="url(#frameGold)" strokeWidth="10" strokeLinecap="round" filter="url(#goldenGlow)"/>
                  <circle cx="400" cy="45" r="35" fill="url(#frameGold)" opacity="0.95" filter="url(#goldenGlow)"/>
                  <circle cx="400" cy="45" r="28" fill="none" stroke="#92400E" strokeWidth="2"/>
                  <text x="400" y="62" fontSize="38" fill="#DC2626" textAnchor="middle" fontWeight="bold">ॐ</text>
                  
                  {[
                    {x: 95, y: 95, symbol: '✦'},
                    {x: 705, y: 95, symbol: '✦'},
                    {x: 95, y: 905, symbol: '✦'},
                    {x: 705, y: 905, symbol: '✦'}
                  ].map((corner, i) => (
                    <g key={i}>
                      <circle cx={corner.x} cy={corner.y} r="32" fill="url(#frameGold)" filter="url(#doorShadow)"/>
                      <circle cx={corner.x} cy={corner.y} r="25" fill="none" stroke="#92400E" strokeWidth="2.5"/>
                      <circle cx={corner.x} cy={corner.y} r="18" fill="none" stroke="#92400E" strokeWidth="2"/>
                      <text x={corner.x} y={corner.y + 8} fontSize="24" fill="#DC2626" textAnchor="middle" fontWeight="bold">{corner.symbol}</text>
                    </g>
                  ))}

                  {glowIntensity > 0 && (
                    <>
                      <rect x="90" y="110" width="620" height="820" fill="url(#doorGlow)" rx="20" opacity={glowIntensity * 0.6}/>
                      <rect x="70" y="90" width="660" height="860" fill="none" stroke={`rgba(251, 191, 36, ${glowIntensity * 0.4})`} strokeWidth={glowIntensity * 20} rx="25" filter="blur(20px)"/>
                    </>
                  )}

                  <g style={{ transformOrigin: '130px 520px', transform: `perspective(2000px) rotateY(${-doorOpen}deg)`, transition: 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                    <rect x="130" y="110" width="270" height="820" fill="url(#doorWood)" stroke="#1C0A00" strokeWidth="6" rx="15" filter="url(#doorShadow)"/>
                    <rect x="130" y="110" width="270" height="820" fill="url(#doorWood)" opacity="0.4" rx="15"/>
                    <rect x="158" y="150" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    <rect x="158" y="405" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    <rect x="158" y="660" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    
                    <g opacity="0.8">
                      <circle cx="265" cy="267" r="65" fill="none" stroke="#9A6B3D" strokeWidth="3.5"/>
                      <circle cx="265" cy="267" r="52" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="265" cy="267" r="39" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <circle cx="265" cy="267" r="26" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <circle cx="265" cy="267" r="13" fill="#9A6B3D"/>
                      <path d="M 265 202 L 265 332 M 200 267 L 330 267" stroke="#9A6B3D" strokeWidth="3.5"/>
                      <path d="M 219 221 L 311 313 M 311 221 L 219 313" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <path d="M 232 232 L 298 302 M 298 232 L 232 302" stroke="#9A6B3D" strokeWidth="2"/>
                    </g>
                    
                    <g opacity="0.75">
                      <circle cx="265" cy="522" r="58" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                      <circle cx="265" cy="522" r="46" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="265" cy="522" r="34" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <path d="M 265 476 L 265 568 M 219 522 L 311 522" stroke="#9A6B3D" strokeWidth="3"/>
                      <path d="M 230 491 L 300 553 M 300 491 L 230 553" stroke="#9A6B3D" strokeWidth="2.5"/>
                    </g>
                    
                    <g opacity="0.75">
                      <circle cx="265" cy="777" r="58" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                      <circle cx="265" cy="777" r="46" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="265" cy="777" r="34" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <path d="M 265 731 L 265 823 M 219 777 L 311 777" stroke="#9A6B3D" strokeWidth="3"/>
                    </g>
                    
                    <circle cx="375" cy="520" r="22" fill="url(#frameGold)" stroke="#D97706" strokeWidth="4" filter="url(#doorShadow)"/>
                    <circle cx="375" cy="520" r="15" fill="none" stroke="#92400E" strokeWidth="2.5"/>
                    <circle cx="375" cy="520" r="8" fill="#92400E"/>
                  </g>

                  <g style={{ transformOrigin: '670px 520px', transform: `perspective(2000px) rotateY(${doorOpen}deg)`, transition: 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                    <rect x="400" y="110" width="270" height="820" fill="url(#doorWood)" stroke="#1C0A00" strokeWidth="6" rx="15" filter="url(#doorShadow)"/>
                    <rect x="400" y="110" width="270" height="820" fill="url(#doorWood)" opacity="0.4" rx="15"/>
                    <rect x="428" y="150" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    <rect x="428" y="405" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    <rect x="428" y="660" width="214" height="235" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="4" rx="12" filter="url(#innerShadow)"/>
                    
                    <g opacity="0.8">
                      <circle cx="535" cy="267" r="65" fill="none" stroke="#9A6B3D" strokeWidth="3.5"/>
                      <circle cx="535" cy="267" r="52" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="535" cy="267" r="39" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <circle cx="535" cy="267" r="26" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <circle cx="535" cy="267" r="13" fill="#9A6B3D"/>
                      <path d="M 535 202 L 535 332 M 470 267 L 600 267" stroke="#9A6B3D" strokeWidth="3.5"/>
                      <path d="M 489 221 L 581 313 M 581 221 L 489 313" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <path d="M 502 232 L 568 302 M 568 232 L 502 302" stroke="#9A6B3D" strokeWidth="2"/>
                    </g>
                    
                    <g opacity="0.75">
                      <circle cx="535" cy="522" r="58" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                      <circle cx="535" cy="522" r="46" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="535" cy="522" r="34" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <path d="M 535 476 L 535 568 M 489 522 L 581 522" stroke="#9A6B3D" strokeWidth="3"/>
                      <path d="M 500 491 L 570 553 M 570 491 L 500 553" stroke="#9A6B3D" strokeWidth="2.5"/>
                    </g>
                    
                    <g opacity="0.75">
                      <circle cx="535" cy="777" r="58" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                      <circle cx="535" cy="777" r="46" fill="none" stroke="#9A6B3D" strokeWidth="2.5"/>
                      <circle cx="535" cy="777" r="34" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                      <path d="M 535 731 L 535 823 M 489 777 L 581 777" stroke="#9A6B3D" strokeWidth="3"/>
                    </g>
                    
                    <circle cx="425" cy="520" r="22" fill="url(#frameGold)" stroke="#D97706" strokeWidth="4" filter="url(#doorShadow)"/>
                    <circle cx="425" cy="520" r="15" fill="none" stroke="#92400E" strokeWidth="2.5"/>
                    
                    <g 
                      className="keyhole-group"
                      style={{
                        transformOrigin: '425px 520px',
                        filter: `drop-shadow(0 0 ${glowIntensity * 20}px rgba(251, 191, 36, ${glowIntensity * 0.9}))`,
                      }}
                    >
                      <circle cx="425" cy="520" r="8" fill="#1C0A00"/>
                      <path d="M 425 528 L 420 545 L 430 545 Z" fill="#1C0A00"/>
                      
                      {glowIntensity > 0.3 && (
                        <>
                          <circle cx="425" cy="520" r={glowIntensity * 80} fill="url(#keyholeGlow)" opacity={glowIntensity * 0.4}/>
                          <circle cx="425" cy="520" r={glowIntensity * 50} fill="url(#keyholeGlow)" opacity={glowIntensity * 0.6}/>
                        </>
                      )}
                    </g>
                  </g>

                  <g 
                    className="divine-key"
                    style={{
                      transformOrigin: '425px 520px',
                      transform: `translate(0, ${keyPosition.y}px) rotate(${keyPosition.rotate}deg) scale(${keyPosition.scale})`,
                      opacity: keyPosition.opacity,
                      transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      filter: `drop-shadow(0 ${keyPosition.opacity * 15}px ${keyPosition.opacity * 30}px rgba(251, 191, 36, ${keyPosition.opacity * 0.8}))`
                    }}
                  >
                    <circle cx="425" cy="480" r="35" fill="url(#frameGold)" stroke="#D97706" strokeWidth="5" filter="url(#goldenGlow)"/>
                    <circle cx="425" cy="480" r="28" fill="none" stroke="#92400E" strokeWidth="3"/>
                    <text x="425" y="493" fontSize="28" fill="#DC2626" textAnchor="middle" fontWeight="bold">ॐ</text>
                    
                    <rect x="420" y="505" width="10" height="70" fill="url(#frameGold)" stroke="#D97706" strokeWidth="2" rx="2"/>
                    
                    <rect x="420" y="560" width="10" height="8" fill="url(#frameGold)" rx="1"/>
                    <rect x="420" y="572" width="10" height="4" fill="url(#frameGold)" rx="1"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'invitation' && (
        <div className="relative w-full h-full flex items-center justify-center animate-fadeIn">
          <div className="relative max-w-4xl mx-auto px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl animate-pulse-divine"></div>
            
            <div className="relative bg-gradient-to-br from-orange-900/90 via-red-900/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-12 border-4 border-yellow-500/50 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-7xl mb-6 animate-float">🪷</div>
                <h2 className="text-6xl font-serif text-yellow-200 mb-4 animate-glow-divine" 
                    style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.6)' }}>
                  You Are Invited
                </h2>
                <div className="w-64 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6"></div>
              </div>
              
              <div className="space-y-6 text-center">
                <div>
                  <p className="text-2xl text-orange-200 mb-2">Join us as we celebrate</p>
                  <p className="text-4xl font-serif text-yellow-300 mb-6">Griha Pravesh Ceremony</p>
                </div>
                
                <div className="bg-black/30 rounded-2xl p-8 border-2 border-yellow-600/30">
                  <p className="text-3xl text-yellow-200 mb-4">📅 [Date & Time]</p>
                  <p className="text-2xl text-orange-300 mb-4">📍 [Address]</p>
                  <p className="text-xl text-yellow-100">[Additional Details]</p>
                </div>
                
                <div className="pt-6">
                  <p className="text-2xl text-orange-200 italic font-serif">
                    &quot;May this home be filled with light, love, and divine blessings&quot;
                  </p>
                </div>
                
                <div className="flex justify-center gap-4 pt-4">
                  <div className="text-4xl animate-float" style={{ animationDelay: '0s' }}>🕉️</div>
                  <div className="text-4xl animate-float" style={{ animationDelay: '0.3s' }}>🪔</div>
                  <div className="text-4xl animate-float" style={{ animationDelay: '0.6s' }}>🙏</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(5deg); }
          50% { transform: translate(-15px, -50px) rotate(-5deg); }
          75% { transform: translate(-25px, -30px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes glow-divine {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(251, 191, 36, 0.4)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 40px rgba(251, 191, 36, 0.8)); }
        }
        @keyframes glow-soft {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes pulse-divine {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes shimmer-fast {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes energyWave {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(8); opacity: 0; }
        }
        @keyframes particleExplosion {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { 
            transform: translate(
              calc(cos(var(--angle)) * var(--speed) * 100px),
              calc(sin(var(--angle)) * var(--speed) * 100px)
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes rayPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-floatSlow { animation: floatSlow 1s ease-in-out infinite; }
        .animate-glow-divine { animation: glow-divine 3s ease-in-out infinite; }
        .animate-glow-soft { animation: glow-soft 2s ease-in-out infinite; }
        .animate-pulse-divine { animation: pulse-divine 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slower { animation: spin-slower 30s linear infinite; }
        .animate-shimmer-fast { animation: shimmer-fast 2s linear infinite; }
      `}</style>
    </div>
  );
}