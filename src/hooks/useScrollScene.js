import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 121;
const FRAME_PATH = "/frames/frame_";
const FRAME_EXT = ".jpg";
const FALLBACK_BG = "#0C0B09";

export default function useScrollScene({
  canvasRef,
  scrollContainerRef,
  heroRef,
  canvasWrapRef,
  darkOverlayRef,
  marqueeRef,
  onReady,
}) {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const FRAME_SPEED = 2.5; // Video completes at ~40% scroll (before mission)
    const IMAGE_SCALE = isMobile ? 0.92 : 0.86;
    const FRAME_STEP = isMobile ? 2 : 1;

    const frames = [];
    let currentFrame = 1;
    // Always use the brand dark background so edges and body stay consistent
    // (no green tint bleeding in from the garden/foliage in the video frames).
    const bgColor = FALLBACK_BG;
    let killed = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Bg sampling intentionally removed — we keep a constant #0C0B09 everywhere so
    // the page background matches the darkest parts of the video without picking
    // up greens from the foliage at the top of each frame.
    document.documentElement.style.setProperty("--sampled-bg", FALLBACK_BG);

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (frames[currentFrame]) drawFrame(currentFrame);
    }

    function drawFrame(index) {
      const img = frames[index];
      if (!img) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      // Edge feathering
      const feather = 40;
      const top = ctx.createLinearGradient(0, 0, 0, feather);
      top.addColorStop(0, bgColor);
      top.addColorStop(1, "transparent");
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, cw, feather);

      const bot = ctx.createLinearGradient(0, ch - feather, 0, ch);
      bot.addColorStop(0, "transparent");
      bot.addColorStop(1, bgColor);
      ctx.fillStyle = bot;
      ctx.fillRect(0, ch - feather, cw, feather);

      const left = ctx.createLinearGradient(0, 0, feather, 0);
      left.addColorStop(0, bgColor);
      left.addColorStop(1, "transparent");
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, feather, ch);

      const right = ctx.createLinearGradient(cw - feather, 0, cw, 0);
      right.addColorStop(0, "transparent");
      right.addColorStop(1, bgColor);
      ctx.fillStyle = right;
      ctx.fillRect(cw - feather, 0, feather, ch);
    }

    function framePath(i) {
      return FRAME_PATH + String(i).padStart(4, "0") + FRAME_EXT;
    }

    function loadImage(index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => { frames[index] = img; resolve(img); };
        img.onerror = () => resolve(null);
        img.src = framePath(index);
      });
    }

    async function preloadFrames() {
      const framesToLoad = [];
      for (let i = 1; i <= FRAME_COUNT; i += FRAME_STEP) framesToLoad.push(i);
      const total = framesToLoad.length;
      let loaded = 0;

      const tick = () => {
        loaded++;
        if (!killed) setLoadProgress(Math.round((loaded / total) * 100));
      };

      // Phase 1: first 10 sequentially for fast first paint
      const first = framesToLoad.slice(0, 10);
      for (const i of first) {
        if (killed) return;
        await loadImage(i);
        tick();
      }
      if (!killed && frames[framesToLoad[0]]) {
        drawFrame(framesToLoad[0]);
        currentFrame = framesToLoad[0];
      }

      // Phase 2: remaining in parallel batches
      const remaining = framesToLoad.slice(10);
      const batch = isMobile ? 10 : 20;
      for (let s = 0; s < remaining.length; s += batch) {
        if (killed) return;
        const slice = remaining.slice(s, s + batch);
        await Promise.all(slice.map((i) => loadImage(i).then(tick)));
      }
    }

    // Initialize
    resizeCanvas();
    // Debounced resize: re-size canvas + ask ScrollTrigger to recompute its
    // positions. Important on mobile (URL bar hide/show) and when using
    // Chrome dev tools to switch between device sizes.
    let resizeTimer = null;
    const onResize = () => {
      resizeCanvas();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try { ScrollTrigger.refresh(); } catch (e) { /* noop */ }
      }, 180);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    let lenis = null;
    let lenisRaf = null;
    const triggers = [];

    (async () => {
      // Safety net: if preload is still running after 12s (slow mobile networks),
      // proceed anyway so the page isn't stuck on the loader forever. Frames
      // that haven't arrived yet will just be skipped during scroll playback.
      const MAX_PRELOAD_MS = 12000;
      let timedOut = false;
      const timeoutId = setTimeout(() => { timedOut = true; }, MAX_PRELOAD_MS);
      await Promise.race([
        preloadFrames(),
        new Promise((resolve) => setTimeout(resolve, MAX_PRELOAD_MS)),
      ]);
      clearTimeout(timeoutId);
      if (killed) return;
      if (timedOut) console.warn("[useScrollScene] Preload timeout — continuing with frames loaded so far");

      setLoaded(true);
      if (onReady) onReady();

      // Lenis smooth scroll
      lenis = new Lenis({
        duration: isMobile ? 1.2 : 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: isMobile ? 1.6 : 1,
        wheelMultiplier: isMobile ? 1 : 0.75,
      });
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;

      // Guarantee the scroll-driven page starts at the top. Some browsers
      // (esp. after React strict-mode double-mount or a refresh at mid-scroll)
      // will restore a saved position the instant the 1300vh scroll-container
      // renders. Force Lenis + the window back to zero immediately.
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);

      // Scroll container trigger: frame playback + bg sampling
      const scrollEl = scrollContainerRef.current;
      if (!scrollEl) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: scrollEl,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
            let index = Math.max(
              1,
              Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT)
            );
            if (FRAME_STEP > 1) {
              index = Math.round((index - 1) / FRAME_STEP) * FRAME_STEP + 1;
              index = Math.max(1, Math.min(index, FRAME_COUNT));
            }
            if (index !== currentFrame && frames[index]) {
              currentFrame = index;
              requestAnimationFrame(() => drawFrame(currentFrame));
            }
          },
        })
      );

      // Hero circle-wipe reveal
      const hero = heroRef.current;
      const canvasWrap = canvasWrapRef.current;
      if (hero && canvasWrap) {
        triggers.push(
          ScrollTrigger.create({
            trigger: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              hero.style.opacity = Math.max(0, 1 - p * 15);
              const wipe = Math.min(1, Math.max(0, (p - 0.005) / 0.06));
              const r = wipe * 90;
              canvasWrap.style.clipPath = `circle(${r}% at 50% 50%)`;
            },
          })
        );
      }

      // Dark overlay fade (stats section, 65-73%)
      const overlay = darkOverlayRef.current;
      if (overlay) {
        const enter = 0.65;
        const leave = 0.73;
        const fade = 0.03;
        triggers.push(
          ScrollTrigger.create({
            trigger: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              let o = 0;
              if (p >= enter - fade && p <= enter) o = 0.9 * ((p - (enter - fade)) / fade);
              else if (p > enter && p < leave) o = 0.9;
              else if (p >= leave && p <= leave + fade) o = 0.9 * (1 - (p - leave) / fade);
              overlay.style.opacity = o;
            },
          })
        );
      }

      // Marquee slide + fade
      const marquee = marqueeRef.current;
      if (marquee) {
        const text = marquee.querySelector(".marquee-text");
        if (text) {
          triggers.push(
            ScrollTrigger.create({
              trigger: scrollEl,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                gsap.set(text, { xPercent: self.progress * -25 });
                const p = self.progress;
                let o = 0;
                // Marquee appears during final moments of video reveal,
                // building drama just before the mission statement (42%).
                if (p > 0.28 && p < 0.42) {
                  const fin = Math.min(1, (p - 0.28) / 0.05);
                  const fout = Math.min(1, (0.42 - p) / 0.04);
                  o = Math.min(fin, fout);
                }
                marquee.style.opacity = o;
              },
            })
          );
        }
      }

      // Section animations
      const sections = document.querySelectorAll(".scroll-section");
      sections.forEach((section) => {
        const type = section.dataset.animation;
        const persist = section.dataset.persist === "true";
        const enter = parseFloat(section.dataset.enter) / 100;
        const leave = parseFloat(section.dataset.leave) / 100;
        const children = section.querySelectorAll(
          ".section-label, .section-heading, .section-body, .section-note, .cta-button, .stat, .service-subrow, .team-member, .mission-text, .section-foot"
        );

        const tl = gsap.timeline({ paused: true });
        switch (type) {
          case "fade-up":
            // Snappier than other reveals — the mission statement uses this,
            // and the big quote is the important element so we reverse the
            // stagger direction so it hits first, label trailing after.
            tl.from(children, {
              y: 30,
              opacity: 0,
              stagger: { each: 0.05, from: "end" },
              duration: 0.5,
              ease: "power2.out",
            });
            break;
          case "slide-left":
            tl.from(children, { x: -80, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
            break;
          case "slide-right":
            tl.from(children, { x: 80, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
            break;
          case "scale-up":
            tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.1, duration: 1.0, ease: "power2.out" });
            break;
          case "stagger-up":
            tl.from(children, { y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" });
            break;
          case "clip-reveal":
            tl.from(children, {
              clipPath: "inset(100% 0 0 0)",
              opacity: 0,
              stagger: 0.12,
              duration: 1.1,
              ease: "power4.inOut",
            });
            break;
          default:
            tl.from(children, { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
        }

        let active = false;
        let entered = false;

        triggers.push(
          ScrollTrigger.create({
            trigger: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              const show = p >= enter && p <= leave;
              if (show && !active) {
                active = true;
                entered = true;
                section.classList.add("is-active");
                tl.play();
              } else if (!show && active) {
                if (persist && p > leave) return;
                active = false;
                section.classList.remove("is-active");
                tl.reverse();
              }
              if (persist && entered && p > leave) section.classList.add("is-active");
            },
          })
        );
      });

      // Counter animations for stats
      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        let played = false;

        triggers.push(
          ScrollTrigger.create({
            trigger: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              // Plays ONCE per page load. Once animated, stays at its final
              // value for the rest of the session — no re-trigger on scroll-back.
              if (p >= 0.66 && p <= 0.72 && !played) {
                played = true;
                gsap.fromTo(
                  el,
                  { textContent: 0 },
                  {
                    textContent: target,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: decimals === 0 ? 1 : 0.01 },
                    onUpdate: function () {
                      const v = parseFloat(el.textContent);
                      const formatted =
                        decimals === 0
                          ? Math.round(v).toLocaleString()
                          : v.toFixed(decimals);
                      el.textContent = prefix + formatted + suffix;
                    },
                  }
                );
              }
            },
          })
        );
      });

      ScrollTrigger.refresh();
    })();

    // Cleanup
    cleanupRef.current = () => {
      killed = true;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearTimeout(resizeTimer);
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadProgress, loaded };
}
