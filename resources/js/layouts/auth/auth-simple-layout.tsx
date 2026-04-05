import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import FloatingParticles from '@/components/ui/floating-particles';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

function HexGrid() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#a3e635" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
    );
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setMousePos({ x: x * 100, y: y * 100 });
        setTilt({
            x: (0.5 - y) * 6,
            y: (x - 0.5) * 6,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-lime-400 selection:text-black overflow-hidden relative">

            {/* Back to Home */}
            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-lime-400 transition-colors group">
                <div className="w-8 h-8 border-2 border-zinc-800 flex items-center justify-center p-1 group-hover:border-lime-400 group-hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all transform -skew-x-[15deg]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className="skew-x-[15deg] group-hover:-translate-x-1 transition-transform">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </div>
                Return to Home
            </Link>

            {/* Animated Background Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover grayscale opacity-30 blur-[12px] transform scale-110"
                    style={{
                        transform: `scale(1.1) translate(${(mousePos.x - 50) * -0.1}px, ${(mousePos.y - 50) * -0.1}px)`,
                        transition: 'transform 0.5s ease-out',
                    }}
                />
            </div>

            <HexGrid />

            {/* Overlays */}
            <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-70" />

            {/* Animated glow that follows mouse */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[3] transition-all duration-700 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 60%)',
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Interactive Particles */}
            <div className="absolute inset-0 z-[4]">
                <FloatingParticles count={40} speed={0.15} maxSize={1.5} connected={true} />
            </div>

            {/* Centered 3D Focus Box */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-3xl mx-auto">
                <div
                    ref={cardRef}
                    className="w-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 p-8 relative group shadow-2xl shadow-black/50"
                    style={{
                        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: 'transform 0.2s ease-out, box-shadow 0.4s ease-out',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Animated border glow */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(163,230,53,0.15) 0%, transparent 50%)`,
                        }}
                    />

                    {/* Corner accents */}
                    <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-lime-400/50 pointer-events-none" />
                    <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-lime-400/50 pointer-events-none" />
                    <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-lime-400/50 pointer-events-none" />
                    <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-lime-400/50 pointer-events-none" />

                    {/* 3D floating diamond accent */}
                    <div
                        className="absolute -top-4 -right-4 w-8 h-8 bg-lime-400 transform rotate-45 shadow-[0_0_20px_rgba(163,230,53,0.5)] pointer-events-none"
                        style={{
                            transform: `rotate(45deg) translateZ(20px)`,
                        }}
                    />

                    {/* Header area */}
                    <div className="flex flex-col items-center gap-8 mb-10">
                        <Link href="/" className="flex items-center gap-3 focus:outline-none group/logo">
                            <div className="flex items-center justify-center p-3 bg-black border-[3px] border-lime-400 text-lime-400 transform -skew-x-12 group-hover/logo:bg-lime-400 group-hover/logo:text-black shadow-[4px_4px_0_#a3e635] group-hover/logo:shadow-[0_0_25px_rgba(163,230,53,0.4)] group-hover/logo:translate-x-1 group-hover/logo:translate-y-1 transition-all duration-300">
                                <svg width="36" height="28" viewBox="0 0 34 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="skew-x-12">
                                    <path d="M16 6H4V18H12V22H4V26H16V14H8V10H16V6Z" />
                                    <path d="M30 6H20V26H30V22H24V10H30V6Z" />
                                </svg>
                            </div>
                        </Link>

                        <div className="space-y-3 text-center border-t border-zinc-800 pt-6 w-full relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-950 px-4 text-[10px] text-lime-400 font-bold uppercase tracking-[0.3em] whitespace-nowrap">System Auth</div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter text-white shrink-0">{title}</h1>
                            <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.1em]">{description}</p>
                        </div>
                    </div>

                    {/* Form overrides */}
                    <div className="
                        [&_label]:uppercase [&_label]:text-[10px] [&_label]:font-black [&_label]:tracking-[0.2em] [&_label]:text-zinc-500
                        [&_input]:bg-black/80 [&_input]:border-2 [&_input]:border-zinc-800 [&_input]:text-white [&_input]:rounded-none [&_input]:h-14 [&_input]:font-bold [&_input]:pr-4 [&_input:focus]:border-lime-400 [&_input:focus]:ring-4 [&_input:focus]:ring-lime-400/20 [&_input:focus]:shadow-[0_0_20px_rgba(163,230,53,0.1)] [&_input]:transition-all [&_input]:backdrop-blur-sm
                        [&_button[type=submit]]:rounded-none [&_button[type=submit]]:h-14 [&_button[type=submit]]:uppercase [&_button[type=submit]]:font-black [&_button[type=submit]]:tracking-[0.2em] [&_button[type=submit]]:bg-lime-400 [&_button[type=submit]]:text-black hover:[&_button[type=submit]]:bg-white [&_button[type=submit]]:border-none [&_button[type=submit]]:transition-all [&_button[type=submit]]:duration-300 [&_button[type=submit]]:shadow-[4px_4px_0_rgba(255,255,255,0.4)] hover:[&_button[type=submit]]:shadow-[6px_6px_0_#fff,0_0_30px_rgba(163,230,53,0.3)] hover:[&_button[type=submit]]:-translate-y-1 [&_button[type=submit]]:relative [&_button[type=submit]]:overflow-hidden
                        [&_a]:text-lime-400 [&_a]:text-[11px] [&_a]:font-bold [&_a]:tracking-[0.1em] [&_a]:uppercase [&_a]:underline-offset-8 [&_a:hover]:text-white [&_a]:transition-colors
                        [&_.text-muted-foreground]:text-zinc-500 [&_.text-muted-foreground]:font-bold [&_.text-muted-foreground]:uppercase [&_.text-muted-foreground]:text-[10px] [&_.text-muted-foreground]:tracking-[0.2em]
                        [&_button[role=checkbox]]:border-2 [&_button[role=checkbox]]:border-zinc-800 [&_button[role=checkbox]]:rounded-none [&_button[role=checkbox][data-state=checked]]:bg-lime-400 [&_button[role=checkbox][data-state=checked]]:border-lime-400 [&_button[role=checkbox][data-state=checked]]:text-black [&_button[role=checkbox]]:w-5 [&_button[role=checkbox]]:h-5
                        [&_svg.animate-spin]:text-black
                    ">
                        {children}
                    </div>
                </div>

                {/* Ambient labels */}
                <div className="absolute bottom-10 right-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 items-center gap-4 hidden xl:flex">
                    GENSAN OPERATIONS
                    <span className="w-12 h-px bg-zinc-700" />
                </div>
                <div className="absolute top-10 right-4 items-center gap-3 hidden xl:flex">
                    <span className="text-lime-400/60 font-bold uppercase tracking-[0.3em] text-xs">Auth Protocol Active</span>
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-ping" />
                </div>
            </div>
        </div>
    );
}
