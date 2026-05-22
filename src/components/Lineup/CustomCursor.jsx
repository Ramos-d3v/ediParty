import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorFollowerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = cursorFollowerRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            
            // Fast Dot
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            // Slower Follower Ring
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.7, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
        };

        // Hover effect for interactive elements
        const onMouseEnterLink = () => {
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: "rgba(168, 85, 247, 0.1)",
                borderColor: "rgba(168, 85, 247, 0.5)",
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 0,
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 255, 255, 0.2)",
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Track interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .organizer-card-wrapper');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnterLink);
            el.addEventListener('mouseleave', onMouseLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            
            // Critical Cleanup: Remove listeners from interactive elements to prevent memory leaks
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <>
            {/* Hidden on mobile (md:block) to prevent touch interaction bugs */}
            <div 
                ref={cursorRef}
                className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div 
                ref={cursorFollowerRef}
                className="hidden md:block fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
            />
        </>
    );
};

export default CustomCursor;
