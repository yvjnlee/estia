import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Initialize Locomotive Scroll
export const initializeScroll = ({ scrollElement }: { scrollElement: HTMLDivElement | null }) => {
    if (scrollElement) {
        const locomotiveScroll = new LocomotiveScroll({
            el: scrollElement,
            smooth: true,
            getDirection: true,
        });

        return () => {
            locomotiveScroll.destroy();
        };
    }
};

// Scrollbar animations
export const animateScroll = () => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", "true");
            const scrollerInner = scroller.querySelector(".scroller__inner");

            if (scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true) as Element;
                    duplicatedItem.setAttribute("aria-hidden", "true");
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        });
    }
};

// Scroll bar component
export const LocomotiveScrollBar: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollElement = scrollRef.current;

    // Reinitialize scrolling effect on auth change
    useEffect(() => {
        initializeScroll({ scrollElement }); // Ensure scrolling is reinitialized on logout
    }, []);

    useEffect(() => {
        animateScroll();
    }, []);

    return (
        <div className="scroller" data-speed="slow">
            <ul className="tag-list scroller__inner">
                <li>Backend Programming</li>
                <li>Angular</li>
                <li>TypeScript</li>
                <li>Databases</li>
                <li>Game Development</li>
                <li>Hosting</li>
                <li>Blockchain</li>
                <li>UI/UX</li>
            </ul>
        </div>
    );
};
