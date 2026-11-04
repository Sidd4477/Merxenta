
"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import Image from "next/image";
import styles from "./Reveal.module.css";

type RevealStage = {
  title: string;
  images: [string, string, string, string];
};

const stages: RevealStage[] = [
  {
    title: "Craft",
    images: ["V-1.png", "V-2.png", "V-3.png", "V-4.png"],
  },
  {
    title: "Power",
    images: ["P-1.png", "P-2.png", "P-3.png", "P-4.png"],
  },
  {
    title: "Connect",
    images: ["C-1.png", "C-2.png", "C-3.png", "C-4.png"],
  },
  {
    title: "Serve",
    images: ["S-1.png", "S-2.png", "S-3.png", "S-4.png"],
  },
  {
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

/* ==========================================
   ANIMATION SETTINGS
========================================== */

const ANIMATION_DURATION = 1200;

const INITIAL_STAGE = -1;
const LAST_STAGE = stages.length - 1;

const WORD_START_Y = 55;
const IMAGE_ENTER_START = 0.5;

const clamp = (value: number) =>
  Math.max(0, Math.min(1, value));

const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export default function Reveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fixedWeRef = useRef<HTMLDivElement>(null);

  const stageRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  const currentStageRef = useRef(INITIAL_STAGE);

  const animationFrameRef = useRef(0);
  const animationStartRef = useRef(0);

  const animatingRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const completedRef = useRef(false);

  const lastScrollYRef = useRef(0);
  const skipReverseRef = useRef(false);

  /* ==========================================
     RENDER STAGES
  ========================================== */

  const renderStages = (
    fromStage: number,
    toStage: number,
    rawProgress: number
  ) => {
    const progress = clamp(rawProgress);

    const exitProgress = smoothstep(progress);

    const enterProgress = smoothstep(
      (progress - IMAGE_ENTER_START) /
        (1 - IMAGE_ENTER_START)
    );

    let weVisible = 0;

    if (fromStage === -1 && toStage === 0) {
      weVisible = progress > 0 ? 1 : 0;
    } else if (
      fromStage === 0 &&
      toStage === -1
    ) {
      weVisible = progress < 1 ? 1 : 0;
    } else if (
      fromStage >= 0 ||
      toStage >= 0
    ) {
      weVisible = 1;
    }

    fixedWeRef.current?.style.setProperty(
      "--we-reveal",
      String(weVisible)
    );

    const visibleWordStage =
      fromStage === toStage
        ? toStage
        : progress < IMAGE_ENTER_START
          ? fromStage
          : toStage;

    stageRefs.current.forEach(
      (stageElement, stageIndex) => {
        if (!stageElement) return;

        let imageReveal = 0;
        let imageExit = 0;
        let imageOpacity = 0;

        if (fromStage === toStage) {
          if (stageIndex === toStage) {
            imageReveal = 1;
            imageOpacity = 1;
          }
        } else {
          /*
           * OLD IMAGES EXIT
           */
          if (stageIndex === fromStage) {
            imageReveal = 1;
            imageExit = exitProgress;

            imageOpacity =
              1 -
              smoothstep(
                (progress - 0.5) / 0.5
              );
          }

          /*
           * NEXT IMAGES ENTER
           */
          if (stageIndex === toStage) {
            imageReveal = enterProgress;
            imageExit = 0;
            imageOpacity = enterProgress;
          }
        }

        /*
         * FIRST ENTRANCE
         */
        if (
          fromStage === -1 &&
          toStage === 0 &&
          stageIndex === 0
        ) {
          imageReveal = smoothstep(progress);
          imageExit = 0;
          imageOpacity = smoothstep(progress);
        }

        /*
         * REVERSE FIRST ENTRANCE
         */
        if (
          fromStage === 0 &&
          toStage === -1 &&
          stageIndex === 0
        ) {
          imageReveal = 1;
          imageExit = smoothstep(progress);
          imageOpacity =
            1 - smoothstep(progress);
        }

        if (reducedMotionRef.current) {
          imageReveal =
            stageIndex === toStage ? 1 : 0;

          imageExit = 0;

          imageOpacity =
            stageIndex === toStage ? 1 : 0;
        }

        const wordVisible =
          stageIndex === visibleWordStage;

        const imageVisible =
          imageOpacity > 0.000001;

        stageElement.style.visibility =
          wordVisible || imageVisible
            ? "visible"
            : "hidden";

        stageElement.style.opacity = "1";

        stageElement.style.zIndex = String(
          stageIndex + 2
        );

        stageElement.setAttribute(
          "aria-hidden",
          String(!wordVisible)
        );

        /*
         * IMAGE ANIMATION
         */
        const images =
          stageElement.querySelectorAll<HTMLElement>(
            "[data-reveal-image]"
          );

        images.forEach((image) => {
          image.style.setProperty(
            "--reveal",
            String(clamp(imageReveal))
          );

          image.style.setProperty(
            "--exit",
            String(clamp(imageExit))
          );

          image.style.setProperty(
            "--image-opacity",
            String(clamp(imageOpacity))
          );
        });

        /*
         * WORD ANIMATION
         */
        const heading =
          stageElement.querySelector<HTMLElement>(
            "[data-reveal-heading]"
          );

        if (heading) {
          heading.style.visibility =
            wordVisible ? "visible" : "hidden";

          heading.style.opacity =
            wordVisible ? "1" : "0";

          let wordY = 0;

          if (
            fromStage !== toStage &&
            stageIndex === toStage
          ) {
            wordY =
              WORD_START_Y *
              (1 - enterProgress);
          }

          if (
            fromStage === -1 &&
            toStage === 0 &&
            stageIndex === 0
          ) {
            wordY =
              WORD_START_Y *
              (1 - smoothstep(progress));
          }

          if (reducedMotionRef.current) {
            wordY = 0;
          }

          heading.style.setProperty(
            "--word-offset",
            `${wordY}px`
          );
        }
      }
    );
  };

  /* ==========================================
     ANIMATE ONE STAGE
  ========================================== */

  const animateToStage = (
    nextStage: number
  ) => {
    if (animatingRef.current) return;
    if (completedRef.current) return;

    const currentStage =
      currentStageRef.current;

    if (nextStage === currentStage) return;

    if (
      nextStage < INITIAL_STAGE ||
      nextStage > LAST_STAGE
    ) {
      return;
    }

    animatingRef.current = true;
    animationStartRef.current = 0;

    cancelAnimationFrame(
      animationFrameRef.current
    );

    if (reducedMotionRef.current) {
      currentStageRef.current = nextStage;

      renderStages(
        nextStage,
        nextStage,
        1
      );

      animatingRef.current = false;
      return;
    }

    const animate = (time: number) => {
      if (!animationStartRef.current) {
        animationStartRef.current = time;
      }

      const elapsed =
        time - animationStartRef.current;

      const progress = clamp(
        elapsed / ANIMATION_DURATION
      );

      renderStages(
        currentStage,
        nextStage,
        progress
      );

      if (progress < 1) {
        animationFrameRef.current =
          requestAnimationFrame(animate);
      } else {
        currentStageRef.current =
          nextStage;

        animatingRef.current = false;

        renderStages(
          nextStage,
          nextStage,
          1
        );
      }
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  /* ==========================================
     IMAGE ORIGINS + EXIT DIRECTIONS
  ========================================== */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateImageOrigins = () => {
      const canvasWidth =
        canvas.clientWidth;

      const canvasHeight =
        canvas.clientHeight;

      const centerX =
        canvasWidth / 2;

      const centerY =
        canvasHeight / 2;

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

        image.style.setProperty(
          "--start-x",
          `${centerX - imageCenterX}px`
        );

        image.style.setProperty(
          "--start-y",
          `${centerY - imageCenterY}px`
        );

        const directionX =
          imageCenterX < centerX ? -1 : 1;

        const directionY =
          imageCenterY < centerY ? -1 : 1;

        const exitX =
          directionX < 0
            ? -image.offsetLeft -
              image.offsetWidth -
              80
            : canvasWidth -
              image.offsetLeft +
              80;

        const exitY =
          directionY < 0
            ? -image.offsetTop -
              image.offsetHeight -
              80
            : canvasHeight -
              image.offsetTop +
              80;

        image.style.setProperty(
          "--exit-x",
          `${exitX}px`
        );

        image.style.setProperty(
          "--exit-y",
          `${exitY}px`
        );
      });
    };

    updateImageOrigins();

    const observer =
      new ResizeObserver(
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

  /* ==========================================
     REDUCED MOTION
  ========================================== */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const update = () => {
      reducedMotionRef.current =
        media.matches;
    };

    update();

    media.addEventListener(
      "change",
      update
    );

    return () => {
      media.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  /* ==========================================
     SCROLL CONTROL
     DEVELOP EXIT FIX
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    lastScrollYRef.current =
      window.scrollY;

    const getSectionPositions = () => {
      const rect =
        section.getBoundingClientRect();

      const sectionTop =
        window.scrollY + rect.top;

      const sectionBottom =
        sectionTop + section.offsetHeight;

      return {
        rect,
        sectionTop,
        sectionBottom,
      };
    };

    const isSectionActive = () => {
      const rect =
        section.getBoundingClientRect();

      return (
        rect.top <= 0 &&
        rect.bottom >=
          window.innerHeight
      );
    };

    /*
     * NEW:
     * After Develop finishes,
     * skip unused sticky distance
     * on the very next down scroll.
     */
    const moveToNextSection = (
      deltaY: number
    ) => {
      const {
        sectionBottom,
      } = getSectionPositions();

      const destination =
        sectionBottom -
        window.innerHeight +
        Math.max(1, Math.abs(deltaY));

      window.scrollTo({
        top: destination,
        behavior: "instant",
      });

      completedRef.current = true;

      lastScrollYRef.current =
        window.scrollY;
    };

    /*
     * Existing reverse scroll fix.
     */
    const skipExtraReverseDistance = () => {
      if (skipReverseRef.current) return;

      const {
        rect,
        sectionTop,
      } = getSectionPositions();

      const currentY =
        window.scrollY;

      const movingUp =
        currentY <
        lastScrollYRef.current;

      if (
        completedRef.current &&
        movingUp &&
        rect.bottom > 0 &&
        rect.bottom <=
          window.innerHeight +
          section.offsetHeight &&
        currentY > sectionTop
      ) {
        skipReverseRef.current = true;

        window.scrollTo({
          top: sectionTop,
          behavior: "instant",
        });

        requestAnimationFrame(() => {
          lastScrollYRef.current =
            window.scrollY;

          skipReverseRef.current = false;
        });
      }

      if (
        rect.top >
          window.innerHeight &&
        movingUp
      ) {
        completedRef.current = false;

        currentStageRef.current =
          INITIAL_STAGE;

        cancelAnimationFrame(
          animationFrameRef.current
        );

        animatingRef.current = false;

        renderStages(
          INITIAL_STAGE,
          INITIAL_STAGE,
          1
        );
      }

      lastScrollYRef.current =
        window.scrollY;
    };

    const onScroll = () => {
      const { rect } =
        getSectionPositions();

      if (
        rect.bottom <=
          window.innerHeight &&
        currentStageRef.current ===
          LAST_STAGE
      ) {
        completedRef.current = true;
      }

      skipExtraReverseDistance();
    };

    const onWheel = (
      event: WheelEvent
    ) => {
      const direction =
        Math.sign(event.deltaY);

      if (direction === 0) return;

      /*
       * Reverse animation disabled.
       */
      if (direction < 0) return;

      if (!isSectionActive()) return;

      if (completedRef.current) return;

      const currentStage =
        currentStageRef.current;

      /*
       * NEW FIX:
       * Develop finished.
       * Immediately go to next section.
       */
      if (
        currentStage === LAST_STAGE &&
        !animatingRef.current
      ) {
        event.preventDefault();

        moveToNextSection(
          event.deltaY
        );

        return;
      }

      event.preventDefault();

      if (animatingRef.current) return;

      animateToStage(
        currentStage + 1
      );
    };

    window.addEventListener(
      "wheel",
      onWheel,
      { passive: false }
    );

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        onWheel
      );

      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  /* ==========================================
     INITIAL STATE
  ========================================== */

  useEffect(() => {
    renderStages(
      INITIAL_STAGE,
      INITIAL_STAGE,
      1
    );

    return () => {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.revealSection}
      aria-label="What drives Merxenta"
    >
      <div
        className={styles.stickyViewport}
      >
        <div
          ref={canvasRef}
          className={styles.revealCanvas}
        >
          {/* FIXED WE */}
          <div
            ref={fixedWeRef}
            className={styles.fixedHeading}
            style={
              {
                "--we-reveal": 0,
              } as CSSProperties
            }
          >
            <span
              className={styles.scriptText}
            >
              We
            </span>
          </div>

          {/* ANIMATED STAGES */}
          {stages.map(
            (stage, stageIndex) => (
              <div
                key={stage.title}
                ref={(element) => {
                  stageRefs.current[
                    stageIndex
                  ] = element;
                }}
                className={styles.stage}
                style={{
                  opacity: 1,
                  visibility: "hidden",
                  zIndex:
                    stageIndex + 2,
                }}
                aria-hidden={true}
              >
                {/* FOUR IMAGES */}
                {stage.images.map(
                  (file, imageIndex) => (
                    <div
                      key={file}
                      data-reveal-image
                      className={`${
                        styles.revealImage
                      } ${
                        imagePositions[
                          imageIndex
                        ]
                      }`}
                      style={
                        {
                          "--reveal": 0,
                          "--exit": 0,
                          "--image-opacity": 0,
                          "--start-x": "0px",
                          "--start-y": "0px",
                          "--exit-x": "0px",
                          "--exit-y": "0px",
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
                        className={
                          styles.image
                        }
                        priority={
                          stageIndex === 0
                        }
                      />
                    </div>
                  )
                )}

                {/* WORD REVEAL */}
                <div
                  className={
                    styles.wordWindow
                  }
                >
                  <h2
                    data-reveal-heading
                    className={
                      styles.mainHeading
                    }
                    style={
                      {
                        "--word-offset":
                          "0px",
                        visibility:
                          "hidden",
                        opacity: 0,
                      } as CSSProperties
                    }
                  >
                    <span
                      className={
                        styles.normalText
                      }
                    >
                      {stage.title}
                    </span>
                  </h2>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
