
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BusinessShowcase.module.css";

type Business = {
  id: string;
  title: string;
  image: string;
  description: string;
  secondary: string;
  website: string;
};

const businesses: Business[] = [
  {
    id: "vibhushanam",
    title: "Vibhushanam",
    image: "/images/home/services/Vibhushanam.png",
    description:
      "A luxury jewelry house inspired by timeless elegance. We craft high-quality pieces using the finest materials designed to celebrate beauty, confidence, and individuality. A luxury jewelry house inspired by timeless elegance. We craft high-quality pieces using the finest materials designed to celebrate beauty, confidence, and individuality.",
    secondary:
      "A luxury jewelry house inspired by timeless elegance. We craft high-quality pieces using the finest materials designed to celebrate beauty, confidence, and individuality. A luxury jewelry house inspired by timeless elegance. We craft high-quality pieces using the finest materials designed to celebrate beauty, confidence, and individuality.",
    website: "",
  },
  {
    id: "jagsome",
    title: "Jagsome",
    image: "/images/home/services/jagsome.jpg",
    description:
      "Powering everyday infrastructure through reliable electrical solutions. Jagsome Electricals specialises in manufacturing quality electrical panels, distribution boards, and essential components designed to support safe, efficient, and dependable electrical systems.",
    secondary:
      "With a focus on precision and performance, Jagsom Electricals delivers electrical products built around industry requirements. From essential components to specialised solutions, the company supports businesses with dependable manufacturing and consistent quality.",
    website: "",
  },
  {
    id: "quickcargo",
    title: "Quick Cargo",
    image: "/images/home/services/Quick Cargo.jpg",
    description:
      "Connecting destinations through dependable logistics solutions. Quick Cargo simplifies the movement of goods with efficient cargo transportation services, helping businesses manage deliveries, streamline operations, and move shipments with greater confidence.",
    secondary:
      "Built around reliability and timely delivery, Quick Cargo provides transportation solutions that keep businesses connected. From everyday shipments to larger cargo requirements, the company focuses on making logistics smoother, simpler, and more accessible.",
    website: "",
  },
  {
    id: "fastresponse",
    title: "Fast Response",
    image: "/images/home/services/Fast resp.jpg",
    description:
      "Making everyday home assistance easier and more accessible. Fast Response connects households with reliable professionals for essential services, helping customers find the right support for repairs, maintenance, and daily household requirements.",
    secondary:
      "From unexpected repairs to routine home maintenance, Fast Response brings convenience to your doorstep. With a focus on accessibility, dependable assistance, and efficient service, the platform makes managing household needs simpler.",
    website: "",
  },
  {
    id: "mps",
    title: "MPS",
    image: "/images/home/services/MPS.jpg",
    description:
      "Building practical skills for a stronger professional future. MPS provides industry-focused training programmes designed to equip individuals with hands-on knowledge, technical expertise, and the confidence needed to pursue rewarding career opportunities.",
    secondary:
      "Focused on learning through practical experience, MPS offers specialised courses across technical trades, including plumbing, solar technology, and welding. Its training approach helps learners develop relevant skills aligned with real-world industry requirements.",
    website: "",
  },
];

const clamp = (
  value: number,
  min = 0,
  max = 1
) => Math.min(max, Math.max(min, value));

const lerp = (
  start: number,
  end: number,
  progress: number
) => start + (end - start) * progress;

const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

/* ==========================================
   IMAGE POSITIONS
========================================== */

const POSITIONS = {
  left: {
    x: 324,
    y: 165,
    width: 180,
    height: 180,
  },

  center: {
    x: 528,
    y: 165,
    width: 384,
    height: 535,
  },

  right: {
    x: 936,
    y: 520,
    width: 180,
    height: 180,
  },
};

type Position = typeof POSITIONS.center;

function interpolatePosition(
  from: Position,
  to: Position,
  progress: number
): Position {
  return {
    x: lerp(from.x, to.x, progress),
    y: lerp(from.y, to.y, progress),
    width: lerp(from.width, to.width, progress),
    height: lerp(from.height, to.height, progress),
  };
}

/* ==========================================
   IMAGE POSITION ANIMATION
========================================== */

function getImagePosition(
  relative: number
): Position {
  if (relative >= -1 && relative <= 0) {
    return interpolatePosition(
      POSITIONS.left,
      POSITIONS.center,
      smoothstep(relative + 1)
    );
  }

  if (relative > 0 && relative <= 1) {
    return interpolatePosition(
      POSITIONS.center,
      POSITIONS.right,
      smoothstep(relative)
    );
  }

  return relative < -1
    ? POSITIONS.left
    : POSITIONS.right;
}

/* ==========================================
   CIRCULAR BUSINESS INDEX
========================================== */

function wrapIndex(index: number) {
  return (
    (index % businesses.length + businesses.length) %
    businesses.length
  );
}

export default function BusinessShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1);

  /* ==========================================
     RESPONSIVE CANVAS SCALE
  ========================================== */

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 767) {
        setCanvasScale(
          Math.min(width / 1440, height / 720)
        );
      } else {
        setCanvasScale(
          Math.min(1, width / 1440, height / 720)
        );
      }
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);

  /* ==========================================
     SCROLL PROGRESS

     DOWN SCROLL:
       FORWARD ANIMATION

     UP SCROLL:
       REVERSE ANIMATION

     NO SCROLL LOCK
     NO AUTOMATIC SCROLL JUMP
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const nextProgress = clamp(
        -rect.top / scrollDistance
      );

      if (
        Math.abs(
          nextProgress - progressRef.current
        ) > 0.0001
      ) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }
    };

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    updateProgress();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* ==========================================
     CURRENT SCROLL STATE
  ========================================== */

  const maxIndex = businesses.length - 1;

  const scrollPosition = progress * maxIndex;

  const activeIndex = Math.min(
    maxIndex,
    Math.floor(scrollPosition + 0.5)
  );

  const currentBusiness = businesses[activeIndex];

  /* ==========================================
     TEXT ANIMATION
  ========================================== */

  const getTextOpacity = (index: number) => {
    return clamp(
      1 - Math.abs(scrollPosition - index) * 2
    );
  };

  const getTextOffset = (index: number) => {
    return (index - scrollPosition) * 50;
  };

  /* ==========================================
     THREE VISIBLE IMAGES

     Previous -> Left Top
     Current  -> Center
     Next     -> Right Bottom

     First slide has no previous image.
     Last slide has no next image.
  ========================================== */

  const baseIndex = Math.floor(scrollPosition);
  const transitionProgress = scrollPosition - baseIndex;

  const visibleImages = [
    ...(baseIndex > 0
      ? [
          {
            key: `previous-${baseIndex}`,
            business:
              businesses[wrapIndex(baseIndex - 1)],
            position: POSITIONS.left,
            opacity:
              1 - smoothstep(transitionProgress),
            zIndex: 8,
          },
        ]
      : []),

    {
      key: `current-${baseIndex}`,
      business:
        businesses[wrapIndex(baseIndex)],
      position: getImagePosition(
        -transitionProgress
      ),
      opacity: 1,
      zIndex: 11,
    },

    /* =====================================
       NEXT IMAGE

       HIDE WHEN MPS IS ACTIVE
    ===================================== */

    ...(baseIndex < maxIndex
      ? [
          {
            key: `next-${baseIndex}`,
            business:
              businesses[wrapIndex(baseIndex + 1)],
            position: getImagePosition(
              1 - transitionProgress
            ),
            opacity: 1,
            zIndex: 12,
          },
        ]
      : []),

    /* =====================================
       UPCOMING IMAGE

       DO NOT SHOW AFTER LAST BUSINESS
    ===================================== */

    ...(baseIndex + 2 <= maxIndex
      ? [
          {
            key: `upcoming-${baseIndex}`,
            business:
              businesses[wrapIndex(baseIndex + 2)],
            position: POSITIONS.right,
            opacity: smoothstep(
              transitionProgress
            ),
            zIndex: 9,
          },
        ]
      : []),
  ];

  /* ==========================================
     RIGHT ARROW SVG
  ========================================== */

  const ArrowIcon = () => (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5.5H11.5M7 1L11.5 5.5L7 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className={styles.showcaseSection}
    >
      <div className={styles.stickyViewport}>
        <div
          className={styles.showcaseCanvas}
          style={{
            transform: `scale(${canvasScale})`,
          }}
        >

          {/* =====================================
              MAIN HEADING
          ===================================== */}

          <div className={styles.headingContainer}>
            {businesses.map((business, index) => (
              <h2
                key={business.id}
                className={styles.businessHeading}
                style={{
                  opacity:
                    getTextOpacity(index),
                  transform: `translateY(${
                    getTextOffset(index)
                  }px)`,
                }}
              >
                {business.title}
              </h2>
            ))}
          </div>

          {/* =====================================
              LEFT DESCRIPTION
          ===================================== */}

          <div className={styles.leftContent}>
            {businesses.map((business, index) => (
              <p
                key={business.id}
                className={styles.description}
                style={{
                  opacity:
                    getTextOpacity(index),
                  transform: `translateY(${
                    getTextOffset(index)
                  }px)`,
                }}
              >
                {business.description}
              </p>
            ))}
          </div>

          {/* =====================================
              VISIT WEBSITE BUTTON
          ===================================== */}

          <div className={styles.buttonWrapper}>
            {currentBusiness.website ? (
              <a
                href={currentBusiness.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitButton}
              >
                <span>Visit Website</span>

                <span className={styles.arrowCircle}>
                  <ArrowIcon />
                </span>
              </a>
            ) : (
              <div className={styles.visitButton}>
                <span>Visit Website</span>

                <span className={styles.arrowCircle}>
                  <ArrowIcon />
                </span>
              </div>
            )}
          </div>

          {/* =====================================
              ANIMATED BUSINESS IMAGES
          ===================================== */}

          <div className={styles.imagesLayer}>
            {visibleImages.map((item) => (
              <div
                key={item.key}
                className={styles.animatedImage}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  width: `${item.position.width}px`,
                  height: `${item.position.height}px`,
                  zIndex: item.zIndex,
                  opacity: item.opacity,
                }}
              >
                <Image
                  src={item.business.image}
                  alt={item.business.title}
                  fill
                  sizes="(max-width: 767px) 80vw, 384px"
                  className={styles.businessImage}
                />
              </div>
            ))}
          </div>

          {/* =====================================
              RIGHT DESCRIPTION
          ===================================== */}

          <div className={styles.rightContent}>
            {businesses.map((business, index) => (
              <p
                key={business.id}
                className={styles.description}
                style={{
                  opacity:
                    getTextOpacity(index),
                  transform: `translateY(${
                    -getTextOffset(index)
                  }px)`,
                }}
              >
                {business.secondary}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
