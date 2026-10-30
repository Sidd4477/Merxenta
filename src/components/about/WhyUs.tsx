
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import styles from "./WhyUs.module.css";

/* ==========================================
   WHY US CARD DATA
========================================== */

type WhyUsCard = {
  title: string;
  description: string;
  image: string;
};

const cards: WhyUsCard[] = [
  {
    title: "Think In Decades",
    description:
      "We look beyond quarterly cycles, making disciplined decisions that strengthen our businesses, create enduring value, and serve generations to come.",
    image: "/images/about/why-us/Frame 2147226377.png",
  },
  {
    title: "Lead With Clarity",
    description:
      "We set a clear direction, communicate with purpose, and give exceptional people the trust and autonomy to move ideas forward.",
    image: "/images/about/why-us/Frame 2147226378.png",
  },
  {
    title: "Grow Responsibly",
    description:
      "We pursue growth with intention, balancing commercial ambition with a lasting commitment to people, communities, and the environments.",
    image: "/images/about/why-us/Frame 2147226379.png",
  },
  {
    title: "Act With Courage",
    description:
      "We make thoughtful decisions, embrace conviction, and move forward with purpose while building resilient businesses.",
    image: "/images/about/why-us/Frame 2147226380.png",
  },
  {
    title: "Pursue Excellence",
    description:
      "We pursue excellence in everything we do, continuously improving our work and raising the standards we set.",
    image: "/images/about/why-us/Frame 2147226381.png",
  },
  {
    title: "Empower People",
    description:
      "People are at the heart of our progress. We build trust, create opportunity, and empower individuals to grow and succeed.",
    image: "/images/about/why-us/magnificent-abstract-paper-background.png",
  },
];

/* ==========================================
   ANIMATION CONFIGURATION
========================================== */

const CARD_WIDTH = 384;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

const SCROLL_PER_CARD = 420;

/* ==========================================
   COMPONENT
========================================== */

export default function WhyUs() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const cardRefs =
    useRef<(HTMLElement | null)[]>([]);

  const progressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  const frameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* ==========================================
     SCROLL ANIMATION
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const maxProgress = cards.length - 1;

    let currentActive = -1;
    let isMobile = window.innerWidth <= 767;

    /* ========================================
       UPDATE SCROLL PROGRESS
    ======================================== */

    const updateProgress = () => {
      if (isMobile) return;

      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollDistance <= 0) {
        progressRef.current = 0;
        return;
      }

      const scrolled = Math.max(
        0,
        Math.min(-rect.top, scrollDistance)
      );

      const normalized =
        scrolled / scrollDistance;

      progressRef.current =
        normalized * maxProgress;
    };

    /* ========================================
       APPLY CARD ANIMATION
    ======================================== */

    const animate = () => {
      if (isMobile) {
        frameRef.current =
          requestAnimationFrame(animate);
        return;
      }

      const target = progressRef.current;

      const difference =
        target - smoothProgressRef.current;

      if (reducedMotion.matches) {
        smoothProgressRef.current = target;
      } else {
        smoothProgressRef.current +=
          difference * 0.16;
      }

      if (
        Math.abs(
          target - smoothProgressRef.current
        ) < 0.001
      ) {
        smoothProgressRef.current = target;
      }

      const progress =
        smoothProgressRef.current;

      /* ======================================
         HORIZONTAL MOVEMENT ONLY
      ====================================== */

      const translateX =
        progress * CARD_STEP;

      track.style.transform =
        `translate3d(${-translateX}px, 0, 0)`;

      /* ======================================
         ACTIVE CARD
      ====================================== */

      const nextActive = Math.min(
        maxProgress,
        Math.max(0, Math.round(progress))
      );

      if (nextActive !== currentActive) {
        currentActive = nextActive;
        setActiveIndex(nextActive);
      }

      /* ======================================
         CARD EXPANSION
      ====================================== */

      cardRefs.current.forEach(
        (card, index) => {
          if (!card) return;

          const distance = Math.abs(
            progress - index
          );

          const influence = Math.max(
            0,
            1 - distance
          );

          const eased =
            influence *
            influence *
            (3 - 2 * influence);

          card.style.setProperty(
            "--expand",
            eased.toFixed(4)
          );
        }
      );

      frameRef.current =
        requestAnimationFrame(animate);
    };

    /* ========================================
       SECTION HEIGHT
    ======================================== */

    const updateSectionHeight = () => {
      isMobile = window.innerWidth <= 767;

      if (isMobile) {
        section.style.height = "auto";
        track.style.transform = "none";

        cardRefs.current.forEach((card) => {
          card?.style.removeProperty("--expand");
        });

        return;
      }

      const viewportHeight =
        window.innerHeight;

      const totalScroll =
        maxProgress * SCROLL_PER_CARD;

      section.style.height =
        `${viewportHeight + totalScroll}px`;

      updateProgress();
    };

    updateSectionHeight();
    updateProgress();

    frameRef.current =
      requestAnimationFrame(animate);

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateSectionHeight
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateSectionHeight
      );

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

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
      className={styles.whyUsSection}
      aria-labelledby="why-us-heading"
    >
      <div className={styles.stickyViewport}>

        <div className={styles.container}>

          {/* ==================================
              FIXED HEADING AREA
          ================================== */}

          <div className={styles.headingWrapper}>
            <h2
              id="why-us-heading"
              className={styles.mainHeading}
            >
              <span className={styles.normalText}>
                Why
              </span>

              <span className={styles.scriptText}>
                Us
              </span>
            </h2>
          </div>

          {/* ==================================
              FIXED CARDS AREA
          ================================== */}

          <div className={styles.cardsViewport}>

            <div
              ref={trackRef}
              className={styles.cardsTrack}
            >
              {cards.map((card, index) => (
                <article
                  key={card.title}
                  ref={(element) => {
                    cardRefs.current[index] =
                      element;
                  }}
                  className={`${styles.card} ${
                    index === activeIndex
                      ? styles.activeCard
                      : ""
                  }`}
                  style={
                    {
                      "--expand":
                        index === 0 ? 1 : 0,
                    } as React.CSSProperties
                  }
                >

                  {/* IMAGE */}

                  <div
                    className={styles.imageWrapper}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 767px) 90vw, 344px"
                      className={styles.cardImage}
                      priority={index === 0}
                    />
                  </div>

                  {/* CONTENT */}

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      {card.title}
                    </h3>

                    <p className={styles.cardDescription}>
                      {card.description}
                    </p>
                  </div>

                </article>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
