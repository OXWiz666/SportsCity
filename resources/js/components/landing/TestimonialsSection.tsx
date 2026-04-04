import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sarah Jenkins',
            role: 'Cmdr, Lagao Gym',
            content: 'Double bookings are dead. Utilization is maxed. Sportscity changed the entire game for us.',
            image: `https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=150&h=150`
        },
        {
            name: 'Marcus Chen',
            role: 'Head, Tuna Hoops',
            content: 'Running 32 teams used to be hell. Automated standings gave me my life back.',
            image: `https://images.unsplash.com/photo-1583468982228-19f191b41fce?auto=format&fit=crop&q=80&w=150&h=150`
        },
        {
            name: 'Elena Rodriguez',
            role: 'Captain, Calumpang',
            content: 'Instant game notifications. Absolute professionalism for the local street leagues.',
            image: `https://images.unsplash.com/photo-1606902965551-dce093cda6e7?auto=format&fit=crop&q=80&w=150&h=150`
        }
    ];

    return (
        <section id="testimonials" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden text-left border-b border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mb-20 border-l-8 border-lime-400 pl-6 lg:pl-10">
                    <h2 className="text-lime-400 font-black tracking-[0.2em] uppercase text-sm mb-4">Intel & Reports</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">From The Frontlines</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="bg-black border-2 border-zinc-900 p-10 relative flex flex-col justify-between group hover:border-lime-400 transition-colors duration-300 transform font-bold md:skew-x-[-2deg]"
                        >
                            <Quote className="absolute top-6 right-6 w-16 h-16 text-zinc-900 group-hover:text-lime-400/20 transition-colors duration-300 md:skew-x-[2deg]" />
                            
                            <div className="md:skew-x-[2deg]">
                                <div className="flex gap-1 mb-8 text-lime-400 text-lg uppercase tracking-[0.3em] font-black border-b border-zinc-900 pb-4 inline-block">
                                    [ VERIFIED ]
                                </div>
                                <p className="text-zinc-300 font-black leading-relaxed mb-12 text-[17px] uppercase tracking-wider relative z-10 group-hover:text-white transition-colors">
                                    "{testimonial.content}"
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-6 pt-6 border-t border-zinc-900 mt-auto md:skew-x-[2deg]">
                                <img 
                                    src={testimonial.image} 
                                    alt={`Avatar of ${testimonial.name}`} 
                                    loading="lazy"
                                    className="w-16 h-16 rounded-none grayscale border-2 border-zinc-800 object-cover group-hover:grayscale-0 group-hover:border-lime-400 transition-all duration-300"
                                />
                                <div>
                                    <h4 className="text-white font-black tracking-tighter uppercase text-2xl">{testimonial.name}</h4>
                                    <p className="text-xs font-black text-lime-400 uppercase tracking-[0.2em]">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
