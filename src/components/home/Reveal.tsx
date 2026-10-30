
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import styles from "./Reveal.module.css";

type RevealStage = {
  title: string;
  prefix: string;
  images: [string, string, string, string];
};

const stages: RevealStage[] = [
  {
    prefix: "We",
    title: "Craft",
    images: ["V-1.png", "V-2.png", "V-3.png", "V-4.png"],
  },
  {
    prefix: "We",
    title: "Power",
    images: ["P-1.png", "P-2.png", "P-3.png", "P-4.png"],
  },
  {
    prefix: "We",
    title: "Connect",
    images: ["C-1.png", "C-2.png", "C-3.png", "C-4.png"],
  },
  {
    prefix: "We",
    title: "Serve",
    images: ["S-1.png", "S-2.png", "S-3.png", "S-4.png"],
  },
  {
    prefix: "We",
    title: "Develop",
    images: ["D-1.png", "D-2.png", "D-3.png", "D-4.png"],
  },
];

const imagePositions = [
  styles.imageTopLeft,
  styles.imageTopRight,
  styles.imageBottomLeft,
  styles.imageBottomRight,
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

const TOTAL_STAGES = stages.length;

export default function Reveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lastScrollYRef = useRef(0);
  const maxProgressRef = useRef(0);

  const compactRef = useRef(false);
  const completedRef = useRef(false);
  const adjustingRef = useRef(false);

  const targetProgressRef = useRef(0);
  const displayedProgressRef = useRef(0);

  const animationFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  /*
   * Update stage visuals directly.
   * Avoid React re-rendering every animation frame.
   */
  const renderProgress = (value: number) => {
    const progress = clamp(value);
    const scaledProgress = progress * TOTAL_STAGES;

    stageRefs.current.forEach((stageElement, stageIndex) => {
      if (!stageElement) return;

      const stageProgress = clamp(
        scaledProgress - stageIndex
      );

      const isLast =
        stageIndex === TOTAL_STAGES - 1;

      const isActive =
        scaledProgress >= stageIndex &&
        (scaledProgress < stageIndex + 1 ||
          (isLast && progress === 1));

      /*
       * Original stage timing preserved.
       *
       * Enter: 0.00 - 0.22
       * Hold:  0.22 - 0.84
       * Exit:  0.84 - 1.00
       */
      const enter = smoothstep(
        stageProgress / 0.22
      );

      const exit = isLast
        ? 1
        : 1 -
          smoothstep(
            (stageProgress - 0.84) / 0.16
          );

      const reveal = reducedMotionRef.current
        ? isActive
          ? 1
          : 0
        : Math.min(enter, exit);

      const visibility = reveal > 0 ? 1 : 0;

      stageElement.style.opacity =
        String(visibility);

      stageElement.style.visibility =
        visibility > 0 ? "visible" : "hidden";

      stageElement.style.zIndex =
        isActive ? "3" : "2";

      stageElement.setAttribute(
        "aria-hidden",
        String(!isActive)
      );

      const revealValue = String(reveal);

      const elements =
        stageElement.querySelectorAll<HTMLElement>(
          "[data-reveal-element]"
        );

      elements.forEach((element) => {
        element.style.setProperty(
          "--reveal",
          revealValue
        );
      });
    });
  };

  /*
   * Calculate image origins.
   * Original image positions remain unchanged.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateImageOrigins = () => {
      const canvasCenterX =
        canvas.clientWidth / 2;

      const canvasCenterY =
        canvas.clientHeight / 2;

      const images =
        canvas.querySelectorAll<HTMLElement>(
          "[data-reveal-image]"
        );

      images.forEach((image) => {
        const imageCenterX =
          image.offsetLeft +
          image.offsetWidth / 2;

        const imageCenterY =
          image.offsetTop +
          image.offsetHeight / 2;

        const originX =
          canvasCenterX - imageCenterX;

        const originY =
          canvasCenterY - imageCenterY;

        image.style.setProperty(
          "--start-x",
          `${originX}px`
        );

        image.style.setProperty(
          "--start-y",
          `${originY}px`
        );
      });
    };

    updateImageOrigins();

    const observer = new ResizeObserver(
      updateImageOrigins
    );

    observer.observe(canvas);

    window.addEventListener(
      "resize",
      updateImageOrigins
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateImageOrigins
      );
    };
  }, []);

  /*
   * Respect reduced-motion preferences.
   */
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);

      renderProgress(
        displayedProgressRef.current
      );
    };

    updateMotion();

    media.addEventListener(
      "change",
      updateMotion
    );

    return () => {
      media.removeEventListener(
        "change",
        updateMotion
      );
    };
  }, []);

  /*
   * Smooth frame-rate-independent animation.
   *
   * Faster response to small scroll movements.
   * No React state update on every frame.
   */
  useEffect(() => {
    let previousTime = 0;

    const animate = (time: number) => {
      const delta = previousTime
        ? Math.min(time - previousTime, 50)
        : 16.67;

      previousTime = time;

      const current =
        displayedProgressRef.current;

      const target =
        targetProgressRef.current;

      const difference = target - current;

      if (Math.abs(difference) > 0.000001) {
        /*
         * Responsive exponential smoothing.
         * Smaller time constant reduces lag.
         */
        const easing =
          1 - Math.exp(-delta / 45);

        const next =
          current + difference * easing;

        displayedProgressRef.current = next;

        renderProgress(next);
      } else if (current !== target) {
        displayedProgressRef.current = target;

        renderProgress(target);
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    renderProgress(
      displayedProgressRef.current
    );

    animationFrameRef.current =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    };
  }, []);

  /*
   * Original section behavior preserved.
   * Scroll progress responds to tiny movements.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let frame = 0;

    lastScrollYRef.current = window.scrollY;

    const getSectionStart = () => {
      const rect =
        section.getBoundingClientRect();

      return window.scrollY + rect.top;
    };

    const getViewportHeight = () => {
      return window.innerHeight;
    };

    const getCompactHeight = () => {
      return getViewportHeight();
    };

    const setAnimationProgress = (
      value: number,
      immediate = false
    ) => {
      const next = clamp(value);

      targetProgressRef.current = next;

      if (immediate) {
        displayedProgressRef.current = next;
        renderProgress(next);
      }
    };

    /*
     * Existing compact-section behavior.
     */
    const collapseSection = () => {
      if (compactRef.current) return;

      const oldHeight =
        section.offsetHeight;

      const newHeight =
        getCompactHeight();

      const removedHeight =
        oldHeight - newHeight;

      if (removedHeight <= 0) return;

      const currentY = window.scrollY;

      adjustingRef.current = true;
      compactRef.current = true;

      section.style.height =
        `${newHeight}px`;

      section.classList.add(
        styles.compactSection
      );

      maxProgressRef.current = 1;

      setAnimationProgress(1, true);

      const targetY = Math.max(
        0,
        currentY - removedHeight
      );

      window.scrollTo({
        top: targetY,
        behavior: "instant",
      });

      lastScrollYRef.current =
        window.scrollY;

      requestAnimationFrame(() => {
        adjustingRef.current = false;
      });
    };

    const resetSection = () => {
      if (!compactRef.current) return;

      adjustingRef.current = true;

      compactRef.current = false;
      completedRef.current = false;

      maxProgressRef.current = 0;

      section.style.height = "";

      section.classList.remove(
        styles.compactSection
      );

      setAnimationProgress(0, true);

      lastScrollYRef.current =
        window.scrollY;

      requestAnimationFrame(() => {
        adjustingRef.current = false;
      });
    };

    const updateScroll = () => {
      if (adjustingRef.current) return;

      const currentY = window.scrollY;

      const previousY =
        lastScrollYRef.current;

      const scrollingUp =
        currentY < previousY - 0.01;

      lastScrollYRef.current =
        currentY;

      const start =
        getSectionStart();

      if (compactRef.current) {
        setAnimationProgress(1);

        if (currentY < start - 2) {
          resetSection();
        }

        return;
      }

      const distance =
        section.offsetHeight -
        getViewportHeight();

      if (distance <= 0) return;

      const end = start + distance;

      const nextProgress = clamp(
        (currentY - start) / distance
      );

      if (nextProgress >= 0.999) {
        completedRef.current = true;
      }

      if (
        scrollingUp &&
        completedRef.current &&
        currentY > start &&
        currentY <=
          end + getViewportHeight()
      ) {
        collapseSection();
        return;
      }

      maxProgressRef.current = Math.max(
        maxProgressRef.current,
        nextProgress
      );

      /*
       * Small scroll movements now update
       * the animation target immediately.
       */
      setAnimationProgress(nextProgress);

      if (
        scrollingUp &&
        currentY < start - 2 &&
        !completedRef.current
      ) {
        maxProgressRef.current = 0;

        setAnimationProgress(0, true);
      }
    };

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScroll();
      });
    };

    const onResize = () => {
      if (compactRef.current) {
        section.style.height =
          `${getCompactHeight()}px`;
      }

      onScroll();
    };

    const initialize = () => {
      const start =
        getSectionStart();

      const distance =
        section.offsetHeight -
        getViewportHeight();

      if (distance <= 0) return;

      const initialProgress = clamp(
        (window.scrollY - start) /
          distance
      );

      maxProgressRef.current =
        initialProgress;

      completedRef.current =
        initialProgress >= 0.999;

      setAnimationProgress(
        initialProgress,
        true
      );

      lastScrollYRef.current =
        window.scrollY;
    };

    initialize();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      section.style.height = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.revealSection}
      aria-label="What drives Merxenta"
    >
      <div className={styles.stickyViewport}>
        <div
          ref={canvasRef}
          className={styles.revealCanvas}
        >
          {stages.map((stage, stageIndex) => (
            <div
              key={stage.title}
              ref={(element) => {
                stageRefs.current[stageIndex] =
                  element;
              }}
              className={styles.stage}
              style={{
                opacity: 0,
                visibility: "hidden",
                zIndex: 2,
              }}
              aria-hidden={true}
            >
              {stage.images.map(
                (file, imageIndex) => (
                  <div
                    key={file}
                    data-reveal-image
                    data-reveal-element
                    className={`${
                      styles.revealImage
                    } ${
                      imagePositions[imageIndex]
                    }`}
                    style={
                      {
                        "--reveal": 0,
                        "--start-x": "0px",
                        "--start-y": "0px",
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={`/images/home/reveal/${file}`}
                      alt={`${stage.title} visual ${
                        imageIndex + 1
                      }`}
                      fill
                      sizes="(max-width: 767px) 130px, 236px"
                      className={styles.image}
                      priority={stageIndex === 0}
                    />
                  </div>
                )
              )}

              <h2
                data-reveal-element
                className={styles.mainHeading}
                style={
                  {
                    "--reveal": 0,
                  } as CSSProperties
                }
              >
                <span className={styles.scriptText}>
                  {stage.prefix}
                </span>

                <span className={styles.normalText}>
                  {stage.title}
                </span>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
