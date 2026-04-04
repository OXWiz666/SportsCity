import { Link } from '@inertiajs/react';
import { Twitter, Facebook, Globe, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t-8 border-lime-400 pt-20 pb-10 uppercase tracking-widest text-xs font-bold relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-lime-400/5 via-black to-black border-none pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 text-left">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-4 pr-0 lg:pr-8">
                        <Link href="/" className="flex items-center gap-4 group mb-8 focus:outline-none w-fit">
                            <div className="flex items-center justify-center p-3 bg-black border-[3px] border-lime-400 text-lime-400 transform -skew-x-12 group-hover:bg-lime-400 group-hover:text-black shadow-[4px_4px_0_#a3e635] group-hover:shadow-[0_0_0_#a3e635] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300">
                                <svg width="36" height="28" viewBox="0 0 34 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="skew-x-12">
                                    <path d="M16 6H4V18H12V22H4V26H16V14H8V10H16V6Z" />
                                    <path d="M30 6H20V26H30V22H24V10H30V6Z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-white tracking-tighter leading-none group-hover:text-lime-400 transition-colors">
                                    SPORT<span className="text-lime-400 group-hover:text-white transition-colors">CITY</span>
                                </span>
                                <span className="text-[10px] text-zinc-500 tracking-[0.3em] mt-2">
                                    General Santos Division
                                </span>
                            </div>
                        </Link>
                        <p className="text-zinc-500 mb-10 leading-loose tracking-[0.2em] font-bold">
                            The hardcore, secure platform for executing community sports and managing aggressive amateur leagues.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="Facebook" className="w-14 h-14 bg-zinc-950 border-2 border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-lime-400 hover:border-lime-400 transition-all duration-300 transform md:-skew-x-[10deg]">
                                <Facebook className="w-6 h-6 md:skew-x-[10deg]" />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-14 h-14 bg-zinc-950 border-2 border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-lime-400 hover:border-lime-400 transition-all duration-300 transform md:-skew-x-[10deg]">
                                <Twitter className="w-6 h-6 md:skew-x-[10deg]" />
                            </a>
                            <a href="#" aria-label="Official Website" className="w-14 h-14 bg-zinc-950 border-2 border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-lime-400 hover:border-lime-400 transition-all duration-300 transform md:-skew-x-[10deg]">
                                <Globe className="w-6 h-6 md:skew-x-[10deg]" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 lg:col-span-2 lg:pl-10">
                        <h3 className="text-lime-400 mb-8 text-sm font-black tracking-[0.2em] border-l-4 border-lime-400 pl-4 py-1 bg-gradient-to-r from-lime-400/10 to-transparent">Links</h3>
                        <ul className="flex flex-col gap-5">
                            <li><a href="#features" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Arsenals</a></li>
                            <li><a href="#how-it-works" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Protocols</a></li>
                            <li><a href="#testimonials" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Intel</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Live Action</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1 lg:col-span-3">
                        <h3 className="text-lime-400 mb-8 text-sm font-black tracking-[0.2em] border-l-4 border-lime-400 pl-4 py-1 bg-gradient-to-r from-lime-400/10 to-transparent">Ops</h3>
                        <ul className="flex flex-col gap-5">
                            <li><a href="#" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Command HQ</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Rules of Engagement</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-white hover:translate-x-2 transition-all block">Security Clearance</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1 lg:col-span-3">
                        <h3 className="text-lime-400 mb-8 text-sm font-black tracking-[0.2em] border-l-4 border-lime-400 pl-4 py-1 bg-gradient-to-r from-lime-400/10 to-transparent">Comm Link</h3>
                        <ul className="flex flex-col gap-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 border border-zinc-800 bg-zinc-900 mt-1 shrink-0"><MapPin className="w-4 h-4 text-lime-400" /></div>
                                <span className="text-zinc-500 leading-loose">City Hall Base<br/>General Santos City, PH</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 border border-zinc-800 bg-zinc-900 shrink-0"><Phone className="w-4 h-4 text-lime-400" /></div>
                                <span className="text-zinc-500">+63 (83) 552-1234</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 border border-zinc-800 bg-zinc-900 shrink-0"><Mail className="w-4 h-4 text-lime-400" /></div>
                                <a href="mailto:ops@gensantos.gov.ph" className="text-zinc-500 hover:text-white transition-colors">ops@gensantos.gov.ph</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="h-px w-full bg-zinc-900 mb-8"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-600 tracking-[0.3em] font-black uppercase">
                    <p>&copy; {currentYear} General Santos. No Surrender.</p>
                    <div className="flex items-center gap-4 border border-zinc-800 px-4 py-2 bg-black">
                        <span>Status: Online</span>
                        <span className="w-2 h-2 bg-lime-400 animate-pulse"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
