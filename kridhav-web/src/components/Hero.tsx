"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import GheePour from "@/components/GheePour";
import { prefersReducedMotion } from "@/lib/format";

const WORDS = ["Slow-churned.", "Pure", "gold."];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const root = rootRef.current;
    if (!root) return;

    const wrap = particlesRef.current;
    if (wrap && !reduce) {
      wrap.innerHTML = "";
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        p.style.left = `${10 + Math.random() * 80}%`;
        p.style.animationDuration = `${14 + Math.random() * 10}s`;
        p.style.animationDelay = `${Math.random() * 8}s`;
        const size = 2 + Math.random() * 2.2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        wrap.appendChild(p);
      }
    }

    const brandEyebrow = root.querySelector(".hero-brand > span");
    const brandName = root.querySelector(".hero-brand-name");
    const words = root.querySelectorAll(".hero-headline .word");
    const sub = root.querySelector(".hero-sub");
    const cta = root.querySelector(".hero-cta");
    const hindi = root.querySelector(".hero-hindi");
    const bg = root.querySelector(".hero-bg-img");
    const flare = root.querySelector(".hero-flare");

    if (reduce) {
      gsap.set([brandEyebrow, brandName, words, sub, cta, hindi, bg, flare], {
        clearProps: "all",
        opacity: 1,
        y: 0,
      });
      return;
    }

    gsap.set(bg, { scale: 1.05, opacity: 0 });
    gsap.set(flare, { opacity: 0 });
    gsap.set(brandEyebrow, { opacity: 0, y: 12 });
    gsap.set(brandName, { opacity: 0, y: 32 });
    gsap.set(words, { opacity: 0, y: 20 });
    gsap.set(sub, { opacity: 0, y: 14 });
    gsap.set(cta, { opacity: 0, y: 12 });
    gsap.set(hindi, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(bg, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
      .to(flare, { opacity: 1, duration: 1.1 }, 0.12)
      .to(brandEyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to(
        brandName,
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
        0.4
      )
      .to(words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 }, 0.7)
      .to(sub, { opacity: 0.88, y: 0, duration: 0.6 }, 1)
      .to(cta, { opacity: 1, y: 0, duration: 0.55 }, 1.15)
      .to(hindi, { opacity: 0.55, duration: 0.7 }, 1.3);

    const magnetic = ctaWrapRef.current;
    const btn = ctaRef.current;
    if (
      magnetic &&
      btn &&
      !window.matchMedia("(pointer: coarse)").matches
    ) {
      const onMove = (e: MouseEvent) => {
        const r = magnetic.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "";
      };
      magnetic.addEventListener("mousemove", onMove);
      magnetic.addEventListener("mouseleave", onLeave);
      return () => {
        tl.kill();
        magnetic.removeEventListener("mousemove", onMove);
        magnetic.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Kridhav hero" ref={rootRef}>
      <div className="hero-bg" aria-hidden="true">
        <Image
          className="hero-bg-img"
          src="/assets/pasture-pitcher.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-bg-shade" />
      </div>
      <div className="hero-flare" aria-hidden="true" />
      <div
        className="particles"
        id="particles"
        ref={particlesRef}
        aria-hidden="true"
      />

      <GheePour />

      <div className="hero-content">
        <h1 className="hero-brand">
          <span>Est. for the modern Indian kitchen</span>
          <span className="hero-brand-name">Kridhav</span>
        </h1>
        <p className="hero-headline" id="heroHeadline">
          {WORDS.map((w) => (
            <span key={w} className="word">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="hero-sub">
          Bilona A2 Desi Cow Ghee — small-batch, wood-fire simmered, poured into
          glass. Heritage, without the noise.
        </p>
        <div className="hero-cta">
          <div className="magnetic" ref={ctaWrapRef}>
            <a
              className="btn btn-gold"
              href="#shop"
              id="magneticCta"
              ref={ctaRef}
            >
              Taste the Gold
            </a>
          </div>
          <a className="btn btn-ghost" href="#story">
            From pasture to jar
          </a>
        </div>
        <p className="hero-hindi">Shuddh. Sunehri. Sachha.</p>
      </div>
    </section>
  );
}
