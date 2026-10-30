
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Expertise.module.css";

/* ==========================================
   MERXENTA - EXPERTISE IMAGES
========================================== */

const images = [
  {
    src: "/images/home/diversified/1.png",
    alt: "Merxenta jewellery collection",
    className: styles.imageOne,
  },
  {
    src: "/images/home/diversified/2.png",
    alt: "Merxenta logistics operations",
    className: styles.imageTwo,
  },
  {
    src: "/images/home/diversified/3.png",
    alt: "Merxenta business collaboration",
    className: styles.imageThree,
  },
  {
    src: "/images/home/diversified/4.png",
    alt: "Merxenta professional services",
    className: styles.imageFour,
  },
  {
    src: "/images/home/diversified/5.png",
    alt: "Merxenta industrial solutions",
    className: styles.imageFive,
  },
  {
    src: "/images/home/diversified/6.png",
    alt: "Merxenta technology solutions",
    className: styles.imageSix,
  },
];

/* ==========================================
   HELPERS
========================================== */

const clamp = (
  value: number,
  min: number,
  max: number
) => Math.min(max, Math.max(min, value));

/* ==========================================
   EXPERTISE COMPONENT
========================================== */

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const maxScrollRef = useRef(0);

  const animationFrameRef = useRef(0);
  const resizeFrameRef = useRef(0);

  /* ==========================================
     HORIZONTAL SCROLL EFFECT
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let destroyed = false;
    let previousTime = 0;

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    /* ==========================================
       CALCULATE SCROLL POSITION
    ========================================== */

    const updateTarget = () => {
      if (window.innerWidth <= 767) return;

      const sectionTop =
        window.scrollY +
        section.getBoundingClientRect().top;

      const scrollDistance =
        maxScrollRef.current;

      const verticalProgress = clamp(
        window.scrollY - sectionTop,
        0,
        scrollDistance
      );

      targetRef.current = verticalProgress;
    };

    /* ==========================================
       CALCULATE SECTION DIMENSIONS
    ========================================== */

    const calculateDimensions = () => {
      const isMobile = window.innerWidth <= 767;

      if (isMobile) {
        section.style.height = "auto";

        track.style.transform = "none";

        maxScrollRef.current = 0;
        targetRef.current = 0;
        currentRef.current = 0;

        return;
      }

      const viewportWidth =
        section.clientWidth;

      const contentWidth =
        track.scrollWidth;

      const maxScroll = Math.max(
        0,
        contentWidth - viewportWidth
      );

      maxScrollRef.current = maxScroll;

      /*
       * The vertical scroll distance is
       * equal to the horizontal travel.
       *
       * Once horizontal movement ends,
       * the next section scrolls normally.
       */
      section.style.height = `${
        maxScroll + window.innerHeight
      }px`;

      updateTarget();

      currentRef.current =
        targetRef.current;

      track.style.transform =
        `translate3d(${-currentRef.current}px, 0, 0)`;
    };

    /* ==========================================
       SMOOTH ANIMATION LOOP
    ========================================== */

    const animate = (time: number) => {
      if (destroyed) return;

      const delta = previousTime
        ? Math.min(
            time - previousTime,
            50
          )
        : 16.67;

      previousTime = time;

      if (window.innerWidth > 767) {
        const current =
          currentRef.current;

        const target =
          targetRef.current;

        const difference =
          target - current;

        if (
          media.matches ||
          Math.abs(difference) < 0.05
        ) {
          currentRef.current = target;
        } else {
          /*
           * Smooth and responsive easing.
           */
          const easing =
            1 - Math.exp(-delta / 55);

          currentRef.current =
            current + difference * easing;
        }

        track.style.transform =
          `translate3d(${-currentRef.current}px, 0, 0)`;
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    /* ==========================================
       SCROLL HANDLER
    ========================================== */

    const onScroll = () => {
      updateTarget();
    };

    /* ==========================================
       RESIZE HANDLER
    ========================================== */

    const onResize = () => {
      cancelAnimationFrame(
        resizeFrameRef.current
      );

      resizeFrameRef.current =
        requestAnimationFrame(
          calculateDimensions
        );
    };

    /* ==========================================
       INITIALIZE
    ========================================== */

    calculateDimensions();

    animationFrameRef.current =
      requestAnimationFrame(animate);

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    /* ==========================================
       CLEANUP
    ========================================== */

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrameRef.current
      );

      cancelAnimationFrame(
        resizeFrameRef.current
      );

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      section.style.height = "";
      track.style.transform = "";
    };
  }, []);

  /* ==========================================
     JSX
  ========================================== */

  return (
    <section
      ref={sectionRef}
      className={styles.expertiseSection}
      aria-label="Diversified Expertise Unified Vision"
    >
      <div className={styles.stickyViewport}>
        <div
          ref={trackRef}
          className={styles.horizontalTrack}
        >
          <div className={styles.designCanvas}>

            {/* ==================================
                MAIN HEADING
            ================================== */}

            <h2 className={styles.mainHeading}>
              <span className={styles.headingLine}>
                <span className={styles.scriptText}>
                  Diversified
                </span>

                <span className={styles.normalText}>
                  Expertise
                </span>
              </span>

              <span className={styles.headingLine}>
                <span className={styles.normalText}>
                  Unified
                </span>

                <span className={styles.scriptText}>
                  Vision
                </span>
              </span>
            </h2>

            {/* ==================================
                LEFT CONTENT
            ================================== */}

            <p className={styles.leftContent}>
              Merxenta brings together diverse
              businesses across jewellery,
              electrical solutions, logistics,
              household services and technical
              training. Each business serves a
              different need, united by a shared
              ambition to create meaningful value
              and build opportunities for the
              future.
            </p>

            {/* ==================================
                CTA BUTTON
            ================================== */}

            <a
              href="#our-services"
              className={styles.ctaButton}
            >
              <span className={styles.ctaText}>
                Discover Merxenta
              </span>

              <span className={styles.ctaCircle}>
                <svg
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5.5H12M12 5.5L7.5 1M12 5.5L7.5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            {/* ==================================
                RIGHT CONTENT
            ================================== */}

            <p className={styles.rightContent}>
              Merxenta is driven by a belief that
              progress comes from diverse ideas,
              skilled people and dependable
              solutions. By bringing different
              industries together, we aim to build
              lasting relationships, respond to
              evolving needs and create
              opportunities that make a difference
              for businesses, individuals and
              communities.
            </p>

            {/* ==================================
                SIX IMAGES
            ================================== */}

            {images.map((image, index) => (
              <div
                key={image.src}
                className={`${styles.imageWrapper} ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 90vw, 400px"
                  className={styles.image}
                  priority={index < 2}
                />
              </div>
            ))}

            {/* ==================================
                SECOND HEADING
            ================================== */}

            <h2 className={styles.secondHeading}>
              {/* <span className={styles.secondScript}>
                Milestones
              </span>

              <span className={styles.secondNormal}>
                Shaping Tomorrow
              </span> */}
            </h2>

          </div>
        </div>
      </div>
    </section>
  );
}
