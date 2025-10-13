// import { useEffect, useState } from 'react';

// interface UseParallaxOptions {
//   speed?: number;
//   offset?: number;
// }

// export const useParallax = (options: UseParallaxOptions = {}) => {
//   const { speed = 0.5, offset = 0 } = options;
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const transform = `translateY(${(scrollY - offset) * speed}px)`;

//   return { transform, scrollY };
// };

// export const useScrollFade = (threshold = 0.1) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [opacity, setOpacity] = useState(0);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             const ratio = entry.intersectionRatio;
//             setOpacity(Math.min(ratio / threshold, 1));
//           } else {
//             setIsVisible(false);
//             setOpacity(0);
//           }
//         });
//       },
//       {
//         threshold: Array.from({ length: 100 }, (_, i) => i / 100),
//         rootMargin: '0px 0px -20% 0px'
//       }
//     );

//     const elements = document.querySelectorAll('[data-fade-observer]');
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, [threshold]);

//   return { isVisible, opacity };
// };

// export default useParallax;