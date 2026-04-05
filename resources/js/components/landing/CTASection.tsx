import { Zap, ShieldAlert } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import FloatingParticles from '@/components/ui/floating-particles';

export default function CTASection() {
    return (
        <section className="py-24 bg-lime-400 relative border-t-8 border-black z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimateOnScroll animation="zoom-in">
                    <div className="relative overflow-hidden bg-black p-10 md:p-24 shadow-[20px_20px_0_rgba(0,0,0,0.9)] transform lg:-skew-x-[3deg]">
                        <div className="absolute inset-0 z-0">
                            <FloatingParticles count={30} speed={0.15} maxSize={1.5} connected={false} />
                        </div>

                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-[1]" />
                        <div className="absolute top-0 right-0 text-[10rem] lg:text-[18rem] font-black text-zinc-900 leading-none select-none pointer-events-none -mr-10 -mt-10 lg:skew-x-[3deg] z-[1]">
                            ACT
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:skew-x-[3deg]">
                            <div className="flex-1 text-left">
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                                    Take <br /><span className="text-lime-400 drop-shadow-[0_0_30px_rgba(163,230,53,0.5)]">Control.</span>
                                </h2>
                                <p className="text-lg text-zinc-400 font-black uppercase tracking-widest leading-relaxed mb-10 max-w-xl">
                                    Join GenSan's ultimate sports platform. No compromises. Total domination of your schedule.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-xs font-black text-zinc-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-2 border border-zinc-800 px-4 py-2 hover:border-lime-400 hover:text-lime-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                                        <ShieldAlert className="w-5 h-5 text-lime-400" /> Free For Residents
                                    </span>
                                    <span className="flex items-center gap-2 border border-zinc-800 px-4 py-2 hover:border-lime-400 hover:text-lime-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                                        <Zap className="w-5 h-5 text-lime-400" /> Instant Access
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 w-full lg:w-auto min-w-[300px]">
                                <a
                                    href={route('register')}
                                    className="w-full px-8 py-6 text-xl font-black text-black bg-lime-400 transform skew-x-[-10deg] hover:bg-white hover:-translate-y-2 hover:shadow-[6px_6px_0_#a3e635,0_0_40px_rgba(163,230,53,0.3)] shadow-[6px_6px_0_rgba(255,255,255,1)] transition-all duration-300 uppercase tracking-[0.2em] group outline-none focus:ring-4 focus:ring-white text-center relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <div className="skew-x-[10deg] flex items-center justify-center gap-3 relative z-10">
                                        <Zap className="w-6 h-6 fill-black group-hover:animate-pulse" />
                                        Join Now
                                    </div>
                                </a>
                                <button className="w-full px-8 py-5 text-sm font-black text-white border-4 border-zinc-800 transform skew-x-[-10deg] hover:border-lime-400 hover:text-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] transition-all duration-300 uppercase tracking-[0.2em] outline-none">
                                    <div className="skew-x-[10deg]">Contact Command</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#000,#000_20px,#a3e635_20px,#a3e635_40px)] z-0" />
        </section>
    );
}
