
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

type MenuItem = {
  label: string;
  href: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    label: "HOME",
    href: "/",
    image: "/images/menu/Home.png",
  },
  {
    label: "ABOUT",
    href: "/about",
    image: "/images/menu/About.png",
  },
  {
    label: "BUSINESSES",
    href: "/businesses",
    image: "/images/menu/Businesses.jpg",
  },
  {
    label: "NEWS & INSIGHTS",
    href: "/news",
    image: "/images/menu/News.jpg",
  },
  {
    label: "CAREERS",
    href: "/careers",
    image: "/images/menu/Careers.jpg",
  },
  {
    label: "CONTACT",
    href: "/contact",
    image: "/images/menu/Contact.jpg",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ==========================================
     NAVBAR COLOR BASED ON ROUTE

     ABOUT   = BLACK
     CAREERS = BLACK
     OTHERS  = WHITE
  ========================================== */

  const isDarkNavbar =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/careers" ||
    pathname.startsWith("/careers/");

  /* ==========================================
     CLOSE MENU ON ROUTE CHANGE
  ========================================== */

  useEffect(() => {
    setIsOpen(false);

    const currentIndex = menuItems.findIndex(
      (item) => item.href === pathname
    );

    setActiveIndex(
      currentIndex >= 0 ? currentIndex : 0
    );
  }, [pathname]);

  /* ==========================================
     LOCK BODY SCROLL
  ========================================== */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  /* ==========================================
     ESCAPE KEY CLOSE
  ========================================== */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  /* ==========================================
     OPEN MENU
  ========================================== */

  const openMenu = () => {
    const currentIndex = menuItems.findIndex(
      (item) => item.href === pathname
    );

    setActiveIndex(
      currentIndex >= 0 ? currentIndex : 0
    );

    setIsOpen(true);
  };

  /* ==========================================
     CLOSE MENU
  ========================================== */

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav
        className={`${styles.navbar} ${
          isDarkNavbar ? styles.navbarDark : ""
        }`}
      >
        <div className={styles.navContainer}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Merxenta Home"
          >
            MERXENTA
          </Link>

          <button
            type="button"
            className={styles.menuButton}
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="merxenta-menu"
          >
            <span className={styles.menuLabel}>
              Menu
            </span>

            <span
              className={styles.hamburger}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      {/* ======================================
          FULL SCREEN MENU OVERLAY
      ====================================== */}

      <div
        id="merxenta-menu"
        className={`${styles.menuOverlay} ${
          isOpen ? styles.menuOpen : ""
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className={styles.overlayContainer}>
          {/* ==================================
              OVERLAY HEADER
          ================================== */}

          <div className={styles.overlayHeader}>
            <Link
              href="/"
              className={styles.overlayLogo}
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
            >
              MERXENTA
            </Link>

            <button
              type="button"
              className={styles.closeButton}
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              aria-label="Close navigation menu"
            >
              <span className={styles.closeText}>
                Close
              </span>

              <span
                className={styles.closeIcon}
                aria-hidden="true"
              >
                <span />
                <span />
              </span>
            </button>
          </div>

          {/* ==================================
              MENU BODY
          ================================== */}

          <div className={styles.menuBody}>
            {/* ==================================
                LEFT IMAGE
            ================================== */}

            <div className={styles.menuImageWrapper}>
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`${styles.menuImageLayer} ${
                    activeIndex === index
                      ? styles.imageActive
                      : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={`${item.label} preview`}
                    fill
                    sizes="(max-width: 767px) 90vw, 395px"
                    className={styles.menuImage}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* ==================================
                RIGHT NAVIGATION LINKS
            ================================== */}

            <div className={styles.menuLinks}>
              {menuItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.menuLink} ${
                    activeIndex === index
                      ? styles.menuLinkActive
                      : ""
                  }`}
                  onMouseEnter={() =>
                    setActiveIndex(index)
                  }
                  onFocus={() =>
                    setActiveIndex(index)
                  }
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
