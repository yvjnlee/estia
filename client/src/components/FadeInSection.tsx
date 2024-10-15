import React, { useEffect, useRef } from "react";

interface FadeInSectionProps {
    children: React.ReactNode;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
    const fadeInRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is in view
            }
        );

        if (fadeInRef.current) {
            observer.observe(fadeInRef.current);
        }

        return () => {
            if (fadeInRef.current) {
                observer.unobserve(fadeInRef.current);
            }
        };
    }, []);

    return (
        <div className="fade-in" ref={fadeInRef}>
            {children}
        </div>
    );
};
