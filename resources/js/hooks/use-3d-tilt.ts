import { useRef, useCallback, useState } from 'react';

interface TiltState {
    rotateX: number;
    rotateY: number;
    scale: number;
    glareX: number;
    glareY: number;
}

export function use3DTilt(maxTilt = 15, scale = 1.02) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState<TiltState>({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        glareX: 50,
        glareY: 50,
    });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setTilt({
                rotateX: (0.5 - y) * maxTilt,
                rotateY: (x - 0.5) * maxTilt,
                scale,
                glareX: x * 100,
                glareY: y * 100,
            });
        },
        [maxTilt, scale],
    );

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 });
    }, []);

    const style: React.CSSProperties = {
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
        transition: 'transform 0.15s ease-out',
    };

    const glareStyle: React.CSSProperties = {
        background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(163,230,53,0.15) 0%, transparent 60%)`,
        position: 'absolute' as const,
        inset: 0,
        pointerEvents: 'none' as const,
        zIndex: 10,
        transition: 'background 0.15s ease-out',
    };

    return { ref, style, glareStyle, handleMouseMove, handleMouseLeave, tilt };
}
