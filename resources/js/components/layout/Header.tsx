import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SharedData } from '@/types';

export default function Header() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Facilities', href: '#features' },
        { name: 'Process', href: '#how-it-works' },
        { name: 'Community', href: '#testimonials' },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                isScrolled 
                    ? 'bg-black/90 backdrop-blur-xl border-b border-lime-400/20 py-4' 
                    : 'bg-transparent border-b border-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center uppercase tracking-widest text-sm">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-4 group focus:outline-none">
                            <div className="flex items-center justify-center p-2 bg-black border-[3px] border-lime-400 text-lime-400 transform -skew-x-12 group-hover:bg-lime-400 group-hover:text-black shadow-[4px_4px_0_#a3e635] group-hover:shadow-[0_0_0_#a3e635] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300">
                                <svg width="32" height="24" viewBox="0 0 34 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="skew-x-12">
                                    {/* Blocky 'S' */}
                                    <path d="M16 6H4V18H12V22H4V26H16V14H8V10H16V6Z" />
                                    {/* Blocky 'C' */}
                                    <path d="M30 6H20V26H30V22H24V10H30V6Z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-lime-400 transition-colors">
                                    SPORT<span className="text-lime-400 group-hover:text-white transition-colors">CITY</span>
                                </span>
                                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mt-1">
                                    General Santos City
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav aria-label="Main Navigation" className="hidden md:flex items-center justify-center gap-10 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="font-bold text-zinc-400 hover:text-lime-400 transition-colors relative group py-2 px-1 focus:outline-none focus:text-lime-400"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-bold text-zinc-300 hover:text-lime-400 transition-colors uppercase"
                            >
                                My Bookings
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-bold text-zinc-300 hover:text-lime-400 transition-colors uppercase"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-3 font-black text-black bg-lime-400 transform skew-x-[-10deg] hover:bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_#fff] shadow-[4px_4px_0_rgba(163,230,53,1)] transition-all duration-200 focus:outline-none"
                                >
                                    <div className="skew-x-[10deg]">Register Now</div>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle Navigation Menu"
                            className="p-2 text-zinc-300 hover:text-lime-400 transition-colors focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="h-8 w-8" aria-hidden="true" /> : <Menu className="h-8 w-8" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div 
                className={`md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-lime-400/20 transition-all duration-300 ease-in-out origin-top ${
                    mobileMenuOpen ? 'opacity-100 scale-y-100 shadow-2xl' : 'opacity-0 scale-y-0 shadow-none pointer-events-none'
                }`}
            >
                <div className="flex flex-col px-6 py-8 gap-4 uppercase tracking-widest text-sm font-bold">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-zinc-300 hover:text-black hover:bg-lime-400 py-4 px-6 border border-zinc-800 transition-all duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px w-full bg-zinc-800 my-4"></div>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-lime-400 hover:text-black hover:bg-lime-400 py-4 px-6 border border-lime-400/30 hover:border-lime-400 transition-all duration-300"
                        >
                            My Bookings
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link
                                href={route('login')}
                                className="text-center text-zinc-300 hover:text-lime-400 py-4 px-6 border border-zinc-800 hover:border-lime-400 transition-all duration-300"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="text-center py-5 font-black text-black bg-lime-400 transition-all duration-300 hover:bg-white"
                            >
                                Register Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
