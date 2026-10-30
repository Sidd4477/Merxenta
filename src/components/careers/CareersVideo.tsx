
import styles from "./CareersVideo.module.css";

/* ==========================================
   MERXENTA - CAREERS VIDEO SECTION
========================================== */

export default function Video() {
  return (
    <section
      className={styles.videoSection}
      aria-label="Life at Merxenta video"
    >
      <div className={styles.videoContainer}>

        {/* ==================================
            AUTO PLAY BACKGROUND VIDEO
        ================================== */}

        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
        >
          <source
            src="/images/careers/video/Meeting%20Office.webm"
            type="video/webm"
          />

          Your browser does not support video playback.
        </video>

        {/* ==================================
            DARK OVERLAY
        ================================== */}

        <div
          className={styles.videoOverlay}
          aria-hidden="true"
        />

      </div>
    </section>
  );
}
