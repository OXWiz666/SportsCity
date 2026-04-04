import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden antialiased">
            <Header />
            <main className="flex-grow flex flex-col relative w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
