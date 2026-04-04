import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';

export default function Welcome() {
    return (
        <>
            <Head title="Sportscity - Home of the Champion">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap" rel="stylesheet" />
                <meta name="description" content="The ultimate platform for managing community sports, facility bookings, and amateur leagues." />
            </Head>
            <Layout>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <CTASection />
            </Layout>
        </>
    );
}
