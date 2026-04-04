import { Link } from '@inertiajs/react';
import { Zap } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-lime-400 selection:text-black overflow-hidden relative">

            {/* Back to Home Button */}
            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-lime-400 transition-colors group">
                <div className="w-8 h-8 border-2 border-zinc-800 flex items-center justify-center p-1 group-hover:border-lime-400 transition-colors transform -skew-x-[15deg]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className="skew-x-[15deg] group-hover:-translate-x-1 transition-transform">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </div>
                Return to Home
            </Link>

            {/* Blurry Background Picture Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80"
                    alt="Background"
                    className="w-full h-full object-cover grayscale opacity-40 blur-[10px] transform scale-110 animate-in fade-in duration-[1500ms] slide-in-from-bottom-8 ease-out"
                />
            </div>

            {/* Overlays to blend the image and add grit */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay animate-in fade-in duration-[2000ms]"></div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-black/40 to-transparent animate-in fade-in duration-[1500ms]"></div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-80"></div>

            {/* Centered Focus Box */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-24 zoom-in-[0.95] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] fill-mode-both">

                <div className="w-full bg-zinc-950/90 backdrop-blur-md border-4 border-zinc-900 p-8 shadow-[0px_0px_50px_rgba(0,0,0,0.8)] hover:shadow-[16px_16px_0_rgba(163,230,53,0.8)] transition-all duration-500 relative group focus-within:shadow-[16px_16px_0_rgba(163,230,53,1)] focus-within:-translate-y-2 focus-within:border-zinc-800 focus-within:bg-zinc-950">

                    {/* Corner Accent */}
                    <div className="absolute -top-[18px] -right-[18px] w-8 h-8 bg-black border-4 border-lime-400 transform rotate-45 select-none pointer-events-none group-focus-within:bg-lime-400 group-focus-within:animate-pulse transition-colors duration-300"></div>

                    <div className="flex flex-col items-center gap-8 mb-10">
                        <Link href="/" className="flex items-center gap-3 focus:outline-none">
                            <div className="flex items-center justify-center p-3 bg-black border-[3px] border-lime-400 text-lime-400 transform -skew-x-12 hover:bg-lime-400 hover:text-black shadow-[4px_4px_0_#a3e635] hover:shadow-[0_0_0_#a3e635] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                                <svg width="36" height="28" viewBox="0 0 34 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="skew-x-12">
                                    <path d="M16 6H4V18H12V22H4V26H16V14H8V10H16V6Z" />
                                    <path d="M30 6H20V26H30V22H24V10H30V6Z" />
                                </svg>
                            </div>
                        </Link>

                        <div className="space-y-3 text-center border-t border-zinc-800 pt-6 w-full relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-950 px-4 text-[10px] text-lime-400 font-bold uppercase tracking-[0.3em] whitespace-nowrap">System Auth</div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter text-white shrink-0 group-focus-within:text-lime-400 transition-colors duration-300">{title}</h1>
                            <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.1em]">{description}</p>
                        </div>
                    </div>

                    {/* Powerful global overrides to inject High-Energy theme into existing Radix UI forms without refactoring them entirely */}
                    <div className="
                        [&_label]:uppercase [&_label]:text-[10px] [&_label]:font-black [&_label]:tracking-[0.2em] [&_label]:text-zinc-500 
                        [&_input]:bg-black [&_input]:border-2 [&_input]:border-zinc-900 [&_input]:text-white [&_input]:rounded-none [&_input]:h-14 [&_input]:font-bold [&_input]:pr-4 [&_input:focus]:border-lime-400 [&_input:focus]:ring-4 [&_input:focus]:ring-lime-400/20 [&_input]:transition-all
                        [&_button[type=submit]]:rounded-none [&_button[type=submit]]:h-14 [&_button[type=submit]]:uppercase [&_button[type=submit]]:font-black [&_button[type=submit]]:tracking-[0.2em] [&_button[type=submit]]:bg-lime-400 [&_button[type=submit]]:text-black hover:[&_button[type=submit]]:bg-white [&_button[type=submit]]:border-none [&_button[type=submit]]:transition-all [&_button[type=submit]]:duration-300 [&_button[type=submit]]:shadow-[4px_4px_0_rgba(255,255,255,0.4)] hover:[&_button[type=submit]]:shadow-[6px_6px_0_#fff] hover:[&_button[type=submit]]:-translate-y-1
                        [&_a]:text-lime-400 [&_a]:text-[11px] [&_a]:font-bold [&_a]:tracking-[0.1em] [&_a]:uppercase [&_a]:underline-offset-8 [&_a:hover]:text-white [&_a]:transition-colors
                        [&_.text-muted-foreground]:text-zinc-500 [&_.text-muted-foreground]:font-bold [&_.text-muted-foreground]:uppercase [&_.text-muted-foreground]:text-[10px] [&_.text-muted-foreground]:tracking-[0.2em]
                        [&_button[role=checkbox]]:border-2 [&_button[role=checkbox]]:border-zinc-800 [&_button[role=checkbox]]:rounded-none [&_button[role=checkbox][data-state=checked]]:bg-lime-400 [&_button[role=checkbox][data-state=checked]]:border-lime-400 [&_button[role=checkbox][data-state=checked]]:text-black [&_button[role=checkbox]]:w-5 [&_button[role=checkbox]]:h-5
                        [&_svg.animate-spin]:text-black
                    ">
                        {children}
                    </div>
                </div>

                {/* Visual Glitch Elements */}
                <div className="absolute bottom-10 right-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-4 hidden xl:flex">
                    GENSAN OPERATIONS
                    <span className="w-12 h-px bg-zinc-600"></span>
                </div>
                <div className="absolute top-10 right-4 flex items-center gap-3 hidden xl:flex">
                    <span className="text-lime-400 font-bold uppercase tracking-[0.3em] text-xs">Auth Protocol Active</span>
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-ping"></span>
                </div>
            </div>
        </div>
    );
}
