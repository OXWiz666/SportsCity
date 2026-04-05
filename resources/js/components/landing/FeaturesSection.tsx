import { CalendarCheck, ShieldCheck, Activity, Users, Trophy, CreditCard } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import { use3DTilt } from '@/hooks/use-3d-tilt';

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const { ref, style, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(10, 1.03);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
            className={`relative overflow-hidden ${className}`}
        >
            <div style={glareStyle} />
            {children}
        </div>
    );
}

export default function FeaturesSection() {
    const features = [
        {
            icon: CalendarCheck,
            title: 'Tactical Booking',
            description: 'Lightning-fast scheduling for Lagao Gym & Acharon. Claim your turf before others do.',
            image: 'https://images.unsplash.com/photo-1542652694-40abf526446e?w=800&auto=format&fit=crop&q=80',
        },
        {
            icon: Trophy,
            title: 'Brutal Tournaments',
            description: 'Advanced league tools: ruthless knockout brackets, live standings, and dynamic drafting.',
            image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&auto=format&fit=crop&q=80',
        },
        {
            icon: Users,
            title: 'Squad Management',
            description: 'Assemble your team. Manage rosters, track attendance, and crush the competition.',
            image: 'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=800&auto=format&fit=crop&q=80',
        },
        {
            icon: Activity,
            title: 'Performance Tracking',
            description: 'No more guessing. Hard data, player analytics, and utilization stats to fuel your growth.',
            image: 'https://images.unsplash.com/photo-1558365849-6bb11ab2612b?w=800&auto=format&fit=crop&q=80',
        },
        {
            icon: ShieldCheck,
            title: 'Live Intel',
            description: 'Instant updates on delays, opponent changes, and venue weather. Stay absolutely sharp.',
            image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80',
        },
        {
            icon: CreditCard,
            title: 'Rapid Payments',
            description: 'Secure, hassle-free processing for fees and payouts. Keep the money moving effortlessly.',
            image: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8011?w=800&auto=format&fit=crop&q=80',
        },
    ];

    return (
        <section id="features" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden text-left border-y border-zinc-900">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900 transform skew-x-[-20deg] origin-top opacity-50 z-0 pointer-events-none border-l border-zinc-800/50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimateOnScroll animation="fade-up" className="max-w-3xl mb-20 text-center mx-auto">
                    <h2 className="text-lime-400 font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-lime-400/10 px-4 py-1 border border-lime-400/20">The Arsenal</h2>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">Everything you need to dominate.</h3>
                    <p className="text-zinc-400 text-lg md:text-xl font-bold tracking-widest leading-relaxed uppercase">
                        The ultimate suite for high-intensity sports organizations in General Santos City.
                    </p>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <AnimateOnScroll key={index} animation="flip-up" delay={index * 100}>
                            <TiltCard className="bg-black border-2 border-zinc-800 flex flex-col group h-full hover:border-lime-400 transition-colors duration-300 shadow-2xl shadow-black/50">
                                <figure className="w-full aspect-[16/10] overflow-hidden relative m-0 border-b-2 border-zinc-800 group-hover:border-lime-400 transition-colors duration-300">
                                    <div className="absolute inset-0 bg-black/60 z-[11] group-hover:bg-lime-400/10 transition-colors duration-300 mix-blend-overlay" />
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 grayscale transition-all duration-700 ease-out saturate-50 contrast-125"
                                    />
                                    <div className="absolute top-4 left-4 p-3 bg-black border border-zinc-700/50 z-20 group-hover:bg-lime-400 group-hover:border-lime-400 transition-all duration-300 skew-x-[-10deg] group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                                        <feature.icon className="w-6 h-6 text-lime-400 group-hover:text-black transition-colors duration-300 skew-x-[10deg]" />
                                    </div>
                                </figure>

                                <div className="p-8 pb-10 flex-grow flex flex-col relative z-20">
                                    <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-lime-400 transition-colors duration-200">{feature.title}</h4>
                                    <p className="text-zinc-400 font-bold leading-relaxed mb-0 uppercase tracking-widest text-xs">
                                        {feature.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
