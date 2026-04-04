import { Play, ArrowDown } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-black">
            {/* Dark & Gritty Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
                {/* Desaturated Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-30 mix-blend-luminosity blur-[2px]"></div>
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center items-center text-center">
                
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-lime-400/30 bg-lime-400/10 mb-8 animate-fade-in-up uppercase tracking-[0.2em] text-xs font-bold text-lime-400 cursor-default">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                    Powering GenSan Sports
                </div>

                <h1 className="text-6xl sm:text-7xl md:text-[6.5rem] font-black tracking-tighter mb-6 animate-fade-in-up text-white leading-[0.9] uppercase" style={{animationDelay: '100ms'}}>
                    Unleash Your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-lime-400 to-green-600 block mt-2">
                        Inner Champion
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-bold animate-fade-in-up uppercase tracking-widest leading-relaxed" style={{animationDelay: '200ms'}}>
                    Hardcore facility booking and intense tournament management. No excuses. Just results.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 w-full sm:w-auto animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    <button className="w-full sm:w-auto px-10 py-5 text-lg font-black text-black bg-lime-400 transform skew-x-[-10deg] hover:bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0_#fff] shadow-[6px_6px_0_rgba(163,230,53,1)] transition-all duration-200 flex items-center justify-center group uppercase tracking-widest outline-none focus:ring-4 focus:ring-lime-400/50">
                        <div className="skew-x-[10deg] flex items-center gap-3">
                            Join Now
                        </div>
                    </button>
                    <button className="w-full sm:w-auto px-10 py-5 text-lg font-black text-white bg-transparent border-2 border-zinc-700 transform skew-x-[-10deg] hover:border-lime-400 hover:text-lime-400 transition-all duration-200 flex items-center justify-center group uppercase tracking-widest outline-none focus:ring-4 focus:ring-zinc-700/50">
                        <div className="skew-x-[10deg] flex items-center gap-3">
                            <Play className="w-5 h-5 fill-current" />
                            See Action
                        </div>
                    </button>
                </div>

                {/* High Impact Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-4xl border-t border-zinc-900 pt-10 animate-fade-in-up" style={{animationDelay: '400ms'}}>
                    <div className="flex flex-col items-center justify-center group">
                        <span className="text-5xl font-black text-white group-hover:text-lime-400 transition-colors tracking-tighter mb-2">12+</span>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Active Arenas</span>
                    </div>
                    <div className="flex flex-col items-center justify-center group">
                        <span className="text-5xl font-black text-white group-hover:text-lime-400 transition-colors tracking-tighter mb-2">5K+</span>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Hardcore Athletes</span>
                    </div>
                    <div className="flex flex-col items-center justify-center group">
                        <span className="text-5xl font-black text-white group-hover:text-lime-400 transition-colors tracking-tighter mb-2">150+</span>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Intense Leagues</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-up" style={{animationDelay: '600ms'}}>
                <a href="#features" aria-label="Scroll down" className="text-lime-400 hover:text-white transition-colors duration-300 mt-2 focus:outline-none">
                    <ArrowDown className="w-8 h-8 animate-bounce" />
                </a>
            </div>
            
            {/* Caution tape design element */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#000,#000_15px,#a3e635_15px,#a3e635_30px)] opacity-50 z-20"></div>
        </section>
    );
}
