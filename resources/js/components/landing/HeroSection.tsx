import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FloatingParticles from '@/components/ui/floating-particles';

function FloatingShape({ className, delay = '0s' }: { className?: string; delay?: string }) {
    return (
        <div
            className={`absolute pointer-events-none ${className}`}
            style={{ animationDelay: delay }}
        >
            <div className="w-full h-full border-2 border-lime-400/20 animate-float" style={{ animationDelay: delay }} />
        </div>
    );
}

function PerspectiveGrid() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-[60%] overflow-hidden pointer-events-none" style={{ perspective: '400px' }}>
            <div
                className="absolute inset-0 animate-grid-scroll"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(163,230,53,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(163,230,53,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'center top',
                    height: '200%',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/90 to-black" />
        </div>
    );
}

function GlowOrb({ color, size, top, left, delay }: { color: string; size: string; top: string; left: string; delay: string }) {
    return (
        <div
            className={`absolute rounded-full animate-pulse-glow pointer-events-none ${size}`}
            style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                top,
                left,
                animationDelay: delay,
            }}
        />
    );
}

function Trophy3D() {
    return (
        <div className="relative w-64 h-80 md:w-80 md:h-[26rem] flex items-center justify-center">
            {/* Ambient glow */}
            <div className="absolute w-80 h-80 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.25) 0%, rgba(163,230,53,0.05) 70%, transparent 100%)' }} />

            {/* Floating bounce wrapper */}
            <div className="animate-ball-bounce">
                <svg viewBox="0 0 260 380" className="w-full h-full drop-shadow-[0_20px_60px_rgba(234,179,8,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Gold metallic gradient — left-lit */}
                        <linearGradient id="goldBody" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fde68a" />
                            <stop offset="20%" stopColor="#fbbf24" />
                            <stop offset="45%" stopColor="#f59e0b" />
                            <stop offset="65%" stopColor="#d97706" />
                            <stop offset="85%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#92400e" />
                        </linearGradient>
                        {/* Lighter gold for highlights */}
                        <linearGradient id="goldLight" x1="0.2" y1="0" x2="0.8" y2="1">
                            <stop offset="0%" stopColor="#fef3c7" />
                            <stop offset="40%" stopColor="#fde68a" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        {/* Dark gold for shadow side */}
                        <linearGradient id="goldDark" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#92400e" />
                            <stop offset="50%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        {/* Stem gradient */}
                        <linearGradient id="goldStem" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#d97706" />
                            <stop offset="30%" stopColor="#fbbf24" />
                            <stop offset="70%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#92400e" />
                        </linearGradient>
                        {/* Base gradient */}
                        <linearGradient id="goldBase" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#b45309" />
                            <stop offset="25%" stopColor="#fbbf24" />
                            <stop offset="50%" stopColor="#fde68a" />
                            <stop offset="75%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#92400e" />
                        </linearGradient>
                        {/* Specular highlight */}
                        <radialGradient id="specular" cx="35%" cy="30%" r="35%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                        {/* Star fill */}
                        <linearGradient id="starGold" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fef3c7" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        {/* Handle gradient */}
                        <linearGradient id="handleGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="50%" stopColor="#d97706" />
                            <stop offset="100%" stopColor="#92400e" />
                        </linearGradient>
                        {/* Inner cup shadow */}
                        <radialGradient id="innerCup" cx="50%" cy="30%" r="60%">
                            <stop offset="0%" stopColor="#78350f" />
                            <stop offset="60%" stopColor="#451a03" />
                            <stop offset="100%" stopColor="#1c0a00" />
                        </radialGradient>
                    </defs>

                    {/* === CUP BODY === */}
                    <path d="M 68 55 Q 62 140, 85 195 Q 95 218, 130 225 Q 165 218, 175 195 Q 198 140, 192 55 Z" fill="url(#goldBody)" />
                    {/* Left highlight streak */}
                    <path d="M 78 60 Q 74 130, 90 185 Q 95 195, 100 200 L 95 200 Q 80 190, 72 165 Q 64 130, 70 60 Z" fill="url(#goldLight)" opacity="0.5" />
                    {/* Right shadow */}
                    <path d="M 182 60 Q 188 130, 170 185 Q 165 200, 155 210 L 160 210 Q 172 195, 185 165 Q 195 130, 190 60 Z" fill="url(#goldDark)" opacity="0.4" />
                    {/* Specular highlight on cup */}
                    <path d="M 68 55 Q 62 140, 85 195 Q 95 218, 130 225 Q 165 218, 175 195 Q 198 140, 192 55 Z" fill="url(#specular)" />

                    {/* Inner cup opening */}
                    <ellipse cx="130" cy="55" rx="63" ry="14" fill="url(#innerCup)" />
                    {/* Rim - top */}
                    <ellipse cx="130" cy="55" rx="63" ry="14" fill="none" stroke="#fde68a" strokeWidth="3" />
                    {/* Rim highlight */}
                    <path d="M 72 53 Q 100 42, 130 41 Q 160 42, 188 53" fill="none" stroke="rgba(254,243,199,0.6)" strokeWidth="1.5" />

                    {/* Decorative band on cup */}
                    <rect x="80" y="130" width="100" height="4" rx="2" fill="#fde68a" opacity="0.4" />
                    <rect x="80" y="138" width="100" height="4" rx="2" fill="#d97706" opacity="0.3" />

                    {/* === STAR === */}
                    <polygon
                        points="130,85 138,108 162,108 143,122 150,145 130,132 110,145 117,122 98,108 122,108"
                        fill="url(#starGold)"
                        stroke="#fef3c7"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />

                    {/* === LEFT HANDLE === */}
                    <path
                        d="M 68 72 Q 32 78, 26 115 Q 22 148, 44 168 Q 60 180, 78 170"
                        stroke="url(#handleGrad)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 68 72 Q 40 76, 34 110 Q 30 140, 48 158 Q 60 168, 74 162"
                        stroke="#fde68a"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.35"
                    />

                    {/* === RIGHT HANDLE === */}
                    <path
                        d="M 192 72 Q 228 78, 234 115 Q 238 148, 216 168 Q 200 180, 182 170"
                        stroke="url(#handleGrad)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 192 72 Q 220 76, 226 110 Q 230 140, 212 158 Q 200 168, 186 162"
                        stroke="#fde68a"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.35"
                    />

                    {/* === STEM === */}
                    <path d="M 118 225 L 115 275 Q 114 280, 118 282 L 142 282 Q 146 280, 145 275 L 142 225 Z" fill="url(#goldStem)" />
                    <path d="M 121 228 L 119 272 L 126 272 L 128 228 Z" fill="#fde68a" opacity="0.3" />

                    {/* Stem ring decoration */}
                    <ellipse cx="130" cy="232" rx="14" ry="4" fill="url(#goldBase)" />
                    <ellipse cx="130" cy="232" rx="14" ry="4" fill="none" stroke="#fde68a" strokeWidth="0.8" opacity="0.5" />

                    {/* === BASE === */}
                    <rect x="88" y="282" width="84" height="20" rx="4" fill="url(#goldBase)" />
                    <rect x="92" y="284" width="20" height="16" rx="2" fill="#fde68a" opacity="0.2" />
                    {/* Base top edge */}
                    <ellipse cx="130" cy="282" rx="43" ry="8" fill="url(#goldBase)" />
                    <ellipse cx="130" cy="282" rx="43" ry="8" fill="none" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
                    {/* Base bottom edge */}
                    <ellipse cx="130" cy="302" rx="43" ry="8" fill="url(#goldDark)" />
                    <ellipse cx="130" cy="302" rx="43" ry="8" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.4" />

                    {/* Base nameplate area */}
                    <rect x="104" y="288" width="52" height="10" rx="2" fill="#451a03" opacity="0.5" />
                    <rect x="104" y="288" width="52" height="10" rx="2" fill="none" stroke="#d97706" strokeWidth="0.5" opacity="0.6" />

                    {/* Overall edge glow */}
                    <path d="M 68 55 Q 62 140, 85 195 Q 95 218, 130 225 Q 165 218, 175 195 Q 198 140, 192 55" fill="none" stroke="#fde68a" strokeWidth="1" opacity="0.3" />
                </svg>
            </div>

            {/* Ground shadow */}
            <div
                className="absolute bottom-[0%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-ball-bounce"
                style={{
                    width: '45%', height: '5%',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
                    filter: 'blur(12px)',
                    animationDirection: 'reverse',
                }}
            />

            {/* Sparkle particles */}
            {[
                { top: '5%', left: '25%', delay: '0s', size: 'w-1.5 h-1.5' },
                { top: '15%', right: '15%', delay: '0.8s', size: 'w-1 h-1' },
                { top: '30%', left: '12%', delay: '1.6s', size: 'w-1 h-1' },
                { top: '10%', right: '25%', delay: '0.4s', size: 'w-2 h-2' },
                { top: '45%', right: '10%', delay: '1.2s', size: 'w-1 h-1' },
                { top: '25%', left: '18%', delay: '2s', size: 'w-1.5 h-1.5' },
            ].map((s, i) => (
                <div
                    key={i}
                    className={`absolute ${s.size} rounded-full bg-yellow-200 animate-pulse pointer-events-none`}
                    style={{ top: s.top, left: s.left, right: s.right, animationDelay: s.delay, animationDuration: '2.5s', boxShadow: '0 0 8px rgba(250,204,21,0.9)' }}
                />
            ))}

            {/* Floating sport emojis */}
            <div className="absolute top-[3%] right-[-5%] animate-float text-2xl drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]" style={{ animationDelay: '0s' }}>⚽</div>
            <div className="absolute bottom-[5%] left-[-5%] animate-float text-xl drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]" style={{ animationDelay: '1.5s' }}>🏀</div>
            <div className="absolute top-[50%] right-[-8%] animate-float text-lg drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]" style={{ animationDelay: '3s' }}>🏸</div>
        </div>
    );
}

export default function HeroSection() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            });
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-black">
            {/* Layered Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-20 mix-blend-luminosity"
                    style={{
                        transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
                        transition: 'transform 0.3s ease-out',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            </div>

            {/* Perspective Grid Floor */}
            <PerspectiveGrid />

            {/* Animated Glow Orbs */}
            <GlowOrb color="rgba(163,230,53,0.15)" size="w-96 h-96" top="-10%" left="60%" delay="0s" />
            <GlowOrb color="rgba(163,230,53,0.1)" size="w-72 h-72" top="60%" left="-5%" delay="1.5s" />
            <GlowOrb color="rgba(34,197,94,0.08)" size="w-64 h-64" top="30%" left="80%" delay="3s" />

            {/* Interactive Particles */}
            <div className="absolute inset-0 z-[2]">
                <FloatingParticles count={60} speed={0.2} maxSize={2} connected={true} />
            </div>

            {/* Floating Geometric Shapes */}
            <FloatingShape className="top-[15%] left-[8%] w-16 h-16 rotate-45 opacity-20" delay="0s" />
            <FloatingShape className="top-[25%] right-[12%] w-10 h-10 rotate-12 opacity-15" delay="2s" />
            <FloatingShape className="bottom-[30%] left-[15%] w-12 h-12 -rotate-12 opacity-10" delay="4s" />
            <FloatingShape className="top-[60%] right-[8%] w-8 h-8 rotate-45 opacity-20" delay="1s" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col lg:flex-row justify-center items-center gap-12">

                {/* Left Content */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div
                        className="inline-flex items-center gap-3 px-4 py-1.5 border border-lime-400/30 bg-lime-400/10 mb-8 animate-fade-in-up uppercase tracking-[0.2em] text-xs font-bold text-lime-400 cursor-default backdrop-blur-sm"
                        style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}
                    >
                        <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                        Powering GenSan Sports
                    </div>

                    <h1
                        className="text-6xl sm:text-7xl md:text-[6.5rem] font-black tracking-tighter mb-6 animate-fade-in-up text-white leading-[0.9] uppercase"
                        style={{
                            animationDelay: '100ms',
                            transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
                            transition: 'transform 0.4s ease-out',
                        }}
                    >
                        Unleash Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-lime-400 via-green-400 to-emerald-600 block mt-2 drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                            Inner Champion
                        </span>
                    </h1>

                    <p
                        className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl font-bold animate-fade-in-up uppercase tracking-widest leading-relaxed"
                        style={{ animationDelay: '200ms' }}
                    >
                        Hardcore facility booking and intense tournament management. No excuses. Just results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <a
                            href={route('register')}
                            className="w-full sm:w-auto px-10 py-5 text-lg font-black text-black bg-lime-400 transform skew-x-[-10deg] hover:bg-white hover:-translate-y-2 hover:shadow-[6px_6px_0_#fff,0_0_30px_rgba(163,230,53,0.4)] shadow-[6px_6px_0_rgba(163,230,53,1)] transition-all duration-300 flex items-center justify-center group uppercase tracking-widest outline-none focus:ring-4 focus:ring-lime-400/50 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <div className="skew-x-[10deg] flex items-center gap-3 relative z-10">Join Now</div>
                        </a>
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-10 py-5 text-lg font-black text-white bg-transparent border-2 border-zinc-700 transform skew-x-[-10deg] hover:border-lime-400 hover:text-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] transition-all duration-300 flex items-center justify-center uppercase tracking-widest outline-none focus:ring-4 focus:ring-zinc-700/50"
                        >
                            <div className="skew-x-[10deg] flex items-center gap-3">Explore</div>
                        </a>
                    </div>
                </div>

                {/* Right 3D Element */}
                <div
                    className="hidden lg:flex flex-shrink-0 items-center justify-center animate-fade-in-up"
                    style={{
                        animationDelay: '500ms',
                        transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                        transition: 'transform 0.5s ease-out',
                    }}
                >
                    <Trophy3D />
                </div>
            </div>

            {/* Stats Bar */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 w-full border border-zinc-800/50 backdrop-blur-sm bg-black/30 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    {[
                        { value: '12+', label: 'Active Arenas' },
                        { value: '5K+', label: 'Hardcore Athletes' },
                        { value: '150+', label: 'Intense Leagues' },
                    ].map((stat, i) => (
                        <div key={i} className={`flex flex-col items-center justify-center py-8 group cursor-default ${i < 2 ? 'sm:border-r border-b sm:border-b-0 border-zinc-800/50' : ''}`}>
                            <span className="text-4xl md:text-5xl font-black text-white group-hover:text-lime-400 transition-all duration-300 tracking-tighter mb-2 group-hover:drop-shadow-[0_0_15px_rgba(163,230,53,0.5)] group-hover:scale-110 transform">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-zinc-300 transition-colors">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-up z-10" style={{ animationDelay: '800ms' }}>
                <a href="#features" aria-label="Scroll down" className="text-lime-400 hover:text-white transition-colors duration-300 focus:outline-none">
                    <ArrowDown className="w-8 h-8 animate-bounce" />
                </a>
            </div>

            {/* Caution tape bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#000,#000_15px,#a3e635_15px,#a3e635_30px)] opacity-50 z-20" />
        </section>
    );
}
