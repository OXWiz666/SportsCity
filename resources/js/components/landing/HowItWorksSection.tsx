import { UserPlus, Calendar, Trophy, Zap } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import { use3DTilt } from '@/hooks/use-3d-tilt';

function StepCard({ step, index }: { step: { icon: React.ElementType; title: string; description: string; step: string }; index: number }) {
    const { ref, style, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(12, 1.04);

    return (
        <AnimateOnScroll animation="fade-up" delay={index * 150}>
            <div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
                className="relative flex flex-col text-left group border-2 border-zinc-900 bg-zinc-950 p-8 hover:bg-zinc-900/80 transition-all duration-300 hover:border-lime-400 overflow-hidden h-full"
            >
                <div style={glareStyle} />

                <div className="absolute -top-10 right-6 text-8xl font-black opacity-10 text-white group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-500 select-none group-hover:drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                    {step.step}
                </div>

                <div className="w-16 h-16 flex items-center justify-center bg-black border-[3px] border-lime-400 mb-8 z-10 transform skew-x-[-15deg] group-hover:bg-lime-400 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] relative">
                    <step.icon className="w-8 h-8 text-lime-400 transform skew-x-[15deg] group-hover:text-black transition-colors duration-300" />
                </div>

                <h4 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase relative z-10">{step.title}</h4>
                <p className="text-zinc-400 font-bold text-sm leading-relaxed uppercase tracking-widest relative z-10 group-hover:text-zinc-300 transition-colors">
                    {step.description}
                </p>

                {/* Bottom accent line that grows on hover */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-lime-400 group-hover:w-full transition-all duration-500" />
            </div>
        </AnimateOnScroll>
    );
}

export default function HowItWorksSection() {
    const steps = [
        {
            icon: UserPlus,
            title: 'Register',
            description: 'Create your profile. Join the ranks of facility managers and elite players.',
            step: '01',
        },
        {
            icon: Calendar,
            title: 'Book',
            description: 'Book the facilities in General Santos City. Make your reservation in seconds.',
            step: '02',
        },
        {
            icon: Trophy,
            title: 'Join a League',
            description: 'Join a league. Compete with other teams. Win prizes and glory.',
            step: '03',
        },
    ];

    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-black relative border-y-4 border-lime-400 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimateOnScroll animation="fade-up" className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-lime-400 font-black tracking-[0.2em] uppercase text-sm mb-6 inline-flex items-center gap-2 border border-lime-400/20 px-4 py-1 bg-lime-400/10">
                        <Zap className="w-4 h-4" fill="currentColor" /> Three Steps to Success
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Your Journey Starts Here</h3>
                </AnimateOnScroll>

                {/* Connecting line between steps */}
                <div className="hidden md:block absolute top-[55%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </div>
            </div>

            <div className="absolute top-0 left-0 w-16 h-full bg-[repeating-linear-gradient(45deg,#000,#000_15px,#27272a_15px,#27272a_30px)] opacity-80 z-0 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-[repeating-linear-gradient(-45deg,#000,#000_15px,#27272a_15px,#27272a_30px)] opacity-80 z-0 pointer-events-none" />
        </section>
    );
}
