import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-up';
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
}

const animations = {
    'fade-up': {
        hidden: 'opacity-0 translate-y-12',
        visible: 'opacity-100 translate-y-0',
    },
    'fade-left': {
        hidden: 'opacity-0 translate-x-12',
        visible: 'opacity-100 translate-x-0',
    },
    'fade-right': {
        hidden: 'opacity-0 -translate-x-12',
        visible: 'opacity-100 translate-x-0',
    },
    'zoom-in': {
        hidden: 'opacity-0 scale-90',
        visible: 'opacity-100 scale-100',
    },
    'flip-up': {
        hidden: 'opacity-0 [transform:perspective(800px)_rotateX(20deg)]',
        visible: 'opacity-100 [transform:perspective(800px)_rotateX(0deg)]',
    },
};

export default function AnimateOnScroll({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 700,
    threshold = 0.15,
    once = true,
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, once]);

    const anim = animations[animation];

    return (
        <div
            ref={ref}
            className={`transition-all ${isVisible ? anim.visible : anim.hidden} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity',
            }}
        >
            {children}
        </div>
    );
}
