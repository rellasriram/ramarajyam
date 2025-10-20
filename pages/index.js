import React, { useState, useEffect } from 'react';

export default function HouseWarmingInvite() {
  const [stage, setStage] = useState('initial');
  const [keyPosition, setKeyPosition] = useState({ y: -400, rotate: -45, scale: 0.5, opacity: 0 });
  const [doorOpen, setDoorOpen] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [showInvite, setShowInvite] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (stage === 'unlocking') {
      // Key descent animation
      setTimeout(() => setKeyPosition({ y: -400, rotate: -45, scale: 0.5, opacity: 1 }), 300);
      setTimeout(() => setKeyPosition({ y: -200, rotate: -30, scale: 0.65, opacity: 1 }), 900);
      setTimeout(() => setKeyPosition({ y: -80, rotate: -10, scale: 0.85, opacity: 1 }), 1600);
      setTimeout(() => setKeyPosition({ y: 0, rotate: 0, scale: 1, opacity: 1 }), 2300);

      // Glow buildup
      setTimeout(() => {
        let glow = 0;
        const glowInterval = setInterval(() => {
          glow += 0.02;
          setGlowIntensity(Math.min(glow, 1));
          if (glow >= 1) clearInterval(glowInterval);
        }, 30);
      }, 2500);

      // Key turning
      setTimeout(() => setKeyPosition(prev => ({ ...prev, rotate: 30 })), 3200);
      setTimeout(() => setKeyPosition(prev => ({ ...prev, rotate: 60 })), 3400);
      setTimeout(() => {
        setKeyPosition(prev => ({ ...prev, rotate: 90 }));
        setGlowIntensity(1.5);
        generateParticles();
      }, 3600);

      // Door opening
      setTimeout(() => {
        setStage('opening');
        let openAmount = 0;
        const doorInterval = setInterval(() => {
          openAmount += 3;
          setDoorOpen(Math.min(openAmount, 100));
          
          if (openAmount >= 100) {
            clearInterval(doorInterval);
            setTimeout(() => {
              setStage('invitation');
              setTimeout(() => setShowInvite(true), 200);
            }, 600);
          }
        }, 20);
      }, 4000);
    }
  }, [stage]);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Math.random(),
      angle: (Math.PI * 2 * i) / 30,
      delay: Math.random() * 0.3
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  const handleStart = () => setStage('unlocking');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-950 via-red-950 to-purple-950">
      {/* Optimized starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-200 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      {/* Initial screen */}
      {stage === 'initial' && (
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full border-4 border-yellow-500/30"></div>
              </div>
              <div className="text-6xl md:text-9xl mb-6 animate-bounce" style={{ animationDuration: '3s' }}>🕉️</div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-yellow-200 mb-6 tracking-wider animate-pulse" 
                style={{ 
                  textShadow: '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 146, 36, 0.4)',
                  animationDuration: '3s'
                }}>
              Griha Pravesh
            </h1>
            
            <div className="w-48 md:w-96 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8 animate-pulse"></div>
            
            <p className="text-2xl md:text-4xl text-orange-300 tracking-widest font-serif mb-12 animate-pulse">
              श्री राम जय राम
            </p>
            
            <button
              onClick={handleStart}
              className="group relative px-12 md:px-20 py-4 md:py-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white text-xl md:text-2xl font-bold rounded-full overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-orange-500/60 hover:scale-110 animate-pulse"
              style={{ boxShadow: '0 0 40px rgba(251, 146, 36, 0.4)' }}
            >
              <span className="relative z-10 tracking-widest">Begin Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </button>
          </div>
        </div>
      )}

      {/* Door unlocking scene */}
      {(stage === 'unlocking' || stage === 'opening') && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-[4/5] max-h-[90vh]">
            
            {/* Particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  animation: `particleExplosion 1.5s ease-out forwards`,
                  animationDelay: `${particle.delay}s`,
                  '--angle': `${particle.angle}rad`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-200 to-orange-500"
                     style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }} />
              </div>
            ))}

            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="frameGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="doorWood" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#92400E" />
                  <stop offset="50%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
                <radialGradient id="keyholeGlow">
                  <stop offset="0%" stopColor="#FEF3C7" stopOpacity={glowIntensity} />
                  <stop offset="40%" stopColor="#FCD34D" stopOpacity={glowIntensity * 0.7} />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="doorShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
                  <feOffset dx="0" dy="8"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Frame */}
              <rect x="40" y="40" width="720" height="920" fill="none" stroke="url(#frameGold)" strokeWidth="12" rx="30"/>
              <rect x="55" y="55" width="690" height="890" fill="none" stroke="url(#frameGold)" strokeWidth="6" rx="25" opacity="0.7"/>
              
              {/* Top Om symbol */}
              <circle cx="400" cy="50" r="30" fill="url(#frameGold)"/>
              <text x="400" y="65" fontSize="32" fill="#DC2626" textAnchor="middle" fontWeight="bold">ॐ</text>
              
              {/* Corner decorations */}
              {[{x: 100, y: 100}, {x: 700, y: 100}, {x: 100, y: 900}, {x: 700, y: 900}].map((corner, i) => (
                <g key={i}>
                  <circle cx={corner.x} cy={corner.y} r="28" fill="url(#frameGold)"/>
                  <text x={corner.x} y={corner.y + 7} fontSize="20" fill="#DC2626" textAnchor="middle">✦</text>
                </g>
              ))}

              {/* Glow effect */}
              {glowIntensity > 0 && (
                <rect x="100" y="120" width="600" height="800" 
                      fill={`rgba(251, 191, 36, ${glowIntensity * 0.15})`} 
                      rx="20" 
                      style={{ filter: 'blur(30px)' }}/>
              )}

              {/* Left door */}
              <g style={{ 
                transformOrigin: '140px 520px', 
                transform: `perspective(2000px) rotateY(${-doorOpen}deg)`,
                transition: 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}>
                <rect x="140" y="120" width="260" height="800" fill="url(#doorWood)" stroke="#1C0A00" strokeWidth="5" rx="12" filter="url(#doorShadow)"/>
                <rect x="170" y="160" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                <rect x="170" y="400" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                <rect x="170" y="640" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                
                {/* Mandala pattern */}
                <circle cx="270" cy="270" r="60" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                <circle cx="270" cy="270" r="45" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                <path d="M 270 210 L 270 330 M 210 270 L 330 270" stroke="#9A6B3D" strokeWidth="3"/>
                
                <circle cx="370" cy="520" r="20" fill="url(#frameGold)" stroke="#D97706" strokeWidth="3"/>
              </g>

              {/* Right door */}
              <g style={{ 
                transformOrigin: '660px 520px', 
                transform: `perspective(2000px) rotateY(${doorOpen}deg)`,
                transition: 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}>
                <rect x="400" y="120" width="260" height="800" fill="url(#doorWood)" stroke="#1C0A00" strokeWidth="5" rx="12" filter="url(#doorShadow)"/>
                <rect x="430" y="160" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                <rect x="430" y="400" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                <rect x="430" y="640" width="200" height="220" fill="#5B2D0F" stroke="#3D1A06" strokeWidth="3" rx="10"/>
                
                <circle cx="530" cy="270" r="60" fill="none" stroke="#9A6B3D" strokeWidth="3"/>
                <circle cx="530" cy="270" r="45" fill="none" stroke="#9A6B3D" strokeWidth="2"/>
                <path d="M 530 210 L 530 330 M 470 270 L 590 270" stroke="#9A6B3D" strokeWidth="3"/>
                
                <circle cx="430" cy="520" r="20" fill="url(#frameGold)" stroke="#D97706" strokeWidth="3"/>
                
                {/* Keyhole */}
                <g>
                  <circle cx="430" cy="520" r="7" fill="#1C0A00"/>
                  <path d="M 430 527 L 425 542 L 435 542 Z" fill="#1C0A00"/>
                  
                  {glowIntensity > 0.3 && (
                    <circle cx="430" cy="520" r={glowIntensity * 60} fill="url(#keyholeGlow)"/>
                  )}
                </g>
              </g>

              {/* Divine key */}
              <g style={{
                transformOrigin: '430px 520px',
                transform: `translate(0, ${keyPosition.y}px) rotate(${keyPosition.rotate}deg) scale(${keyPosition.scale})`,
                opacity: keyPosition.opacity,
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                filter: `drop-shadow(0 ${keyPosition.opacity * 10}px 20px rgba(251, 191, 36, ${keyPosition.opacity * 0.8}))`
              }}>
                <circle cx="430" cy="480" r="32" fill="url(#frameGold)" stroke="#D97706" strokeWidth="4"/>
                <circle cx="430" cy="480" r="25" fill="none" stroke="#92400E" strokeWidth="2"/>
                <text x="430" y="492" fontSize="24" fill="#DC2626" textAnchor="middle" fontWeight="bold">ॐ</text>
                <rect x="426" y="505" width="8" height="65" fill="url(#frameGold)" stroke="#D97706" strokeWidth="2" rx="2"/>
                <rect x="426" y="555" width="8" height="8" fill="url(#frameGold)" rx="1"/>
                <rect x="426" y="567" width="8" height="4" fill="url(#frameGold)" rx="1"/>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Invitation */}
      {stage === 'invitation' && (
        <div className="relative w-full h-full flex items-center justify-center p-4 overflow-y-auto">
          <div className={`relative max-w-5xl w-full my-auto transition-all duration-1000 ${showInvite ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            
            {/* Floating diyas */}
            <div className="absolute -top-8 -left-8 text-5xl md:text-6xl animate-bounce" style={{ animationDuration: '4s' }}>🪔</div>
            <div className="absolute -top-8 -right-8 text-5xl md:text-6xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>🪔</div>
            <div className="absolute -bottom-8 left-1/4 text-4xl md:text-5xl animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}>🙏</div>
            <div className="absolute -bottom-8 right-1/4 text-4xl md:text-5xl animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>🙏</div>
            
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-orange-900/95 via-red-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border-4 border-yellow-500/50 shadow-2xl">
              
              {/* Header */}
              <div className="text-center mb-6 md:mb-10">
                <div className="flex justify-center items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="text-4xl md:text-5xl lg:text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🪷</div>
                  <div className="text-5xl md:text-6xl lg:text-7xl animate-pulse" style={{ animationDuration: '2s' }}>🕉️</div>
                  <div className="text-4xl md:text-5xl lg:text-6xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>🪷</div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-yellow-200 mb-3 md:mb-4 animate-pulse" 
                    style={{ 
                      textShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
                      animationDuration: '3s'
                    }}>
                  You Are Invited
                </h2>
                <div className="w-40 sm:w-48 md:w-64 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto animate-pulse"></div>
              </div>
              
              {/* Content */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <div className={`transition-all duration-700 delay-200 ${showInvite ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-lg sm:text-xl md:text-2xl text-orange-200 mb-2">Join us as we celebrate</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-yellow-300 mb-4 animate-pulse">
                    Griha Pravesh Ceremony
                  </p>
                </div>
                
                {/* Details card */}
                <div className={`bg-gradient-to-br from-black/40 to-black/20 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-600/30 backdrop-blur-sm transition-all duration-700 delay-400 ${showInvite ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="space-y-4 md:space-y-6">
                    
                    {/* Date */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 group">
                      <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">📅</span>
                      <div className="text-center sm:text-left">
                        <p className="text-xs md:text-sm text-orange-200/80 uppercase tracking-wide">Date & Time</p>
                        <p className="text-xl sm:text-2xl md:text-3xl text-yellow-200 font-semibold">Saturday, November 15, 2025</p>
                        <p className="text-lg md:text-xl text-yellow-300">10:00 AM onwards</p>
                      </div>
                    </div>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent"></div>
                    
                    {/* Venue */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 group">
                      <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">📍</span>
                      <div className="text-center sm:text-left">
                        <p className="text-xs md:text-sm text-orange-200/80 uppercase tracking-wide">Venue</p>
                        <p className="text-lg sm:text-xl md:text-2xl text-orange-300 font-semibold">123 Prosperity Lane</p>
                        <p className="text-base md:text-lg text-orange-200">Maple Grove, MN 55311</p>
                      </div>
                    </div>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent"></div>
                    
                    {/* Details */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 group">
                      <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">✨</span>
                      <div className="text-center sm:text-left">
                        <p className="text-xs md:text-sm text-orange-200/80 uppercase tracking-wide">Ceremony</p>
                        <p className="text-base sm:text-lg md:text-xl text-yellow-100">Followed by lunch & blessings</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quote */}
                <div className={`pt-2 md:pt-4 transition-all duration-700 delay-600 ${showInvite ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-xl p-4 md:p-6 border border-yellow-500/20">
                    <p className="text-lg sm:text-xl md:text-2xl text-orange-200 italic font-serif leading-relaxed text-center">
                      &quot;May this home be filled with light, love, and divine blessings&quot;
                    </p>
                  </div>
                </div>
                
                {/* Icons */}
                <div className={`flex justify-center gap-4 md:gap-8 pt-2 md:pt-4 transition-all duration-700 delay-700 ${showInvite ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                  <div className="text-3xl md:text-4xl lg:text-5xl animate-bounce" style={{ animationDuration: '3s' }}>🕉️</div>
                  <div className="text-3xl md:text-4xl lg:text-5xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.3s' }}>🪔</div>
                  <div className="text-3xl md:text-4xl lg:text-5xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.6s' }}>🙏</div>
                </div>
                
                {/* RSVP Button */}
                <div className={`pt-2 md:pt-4 transition-all duration-700 delay-900 ${showInvite ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <button className="w-full sm:w-auto group relative px-8 sm:px-10 md:px-12 py-3 md:py-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white text-base sm:text-lg md:text-xl font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/60 hover:scale-105 mx-auto block">
                    <span className="relative z-10 tracking-wider">Confirm Your Presence 🙏</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </div>
              
              {/* Footer dots */}
              <div className="mt-6 md:mt-8 flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes particleExplosion {
          0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translate(
              calc(cos(var(--angle)) * 150px),
              calc(sin(var(--angle)) * 150px)
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}