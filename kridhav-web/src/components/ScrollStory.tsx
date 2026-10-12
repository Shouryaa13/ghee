"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_STEPS } from "@/data/products";
import { prefersReducedMotion } from "@/lib/format";

export default function ScrollStory() {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = prefersReducedMotion();

    if (reduce) {
      setStep(STORY_STEPS.length - 1);
      return;
    }

    const mobile = window.matchMedia("(max-width: 899px)").matches;

    if (mobile) {
      const observers: IntersectionObserver[] = [];
      const ratios = new Map<number, number>();

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            ratios.set(i, entry.isIntersecting ? entry.intersectionRatio : 0);
            let best = 0;
            let bestRatio = -1;
            ratios.forEach((r, idx) => {
              if (r > bestRatio) {
                bestRatio = r;
                best = idx;
              }
            });
            if (bestRatio > 0.35) setStep(best);
          },
          {
            root: null,
            rootMargin: "-42% 0px -38% 0px",
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        );
        obs.observe(el);
        observers.push(obs);
      });

      return () => observers.forEach((o) => o.disconnect());
    }

    const trigger = ScrollTrigger.create({
      trigger: "#storyPin",
      start: "top top",
      end: "+=2800",
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const n = Math.min(
          STORY_STEPS.length - 1,
          Math.floor(self.progress * STORY_STEPS.length)
        );
        setStep(n);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  const goToStep = (i: number) => {
    setStep(i);
    if (!isMobile) return;
    const el = stepRefs.current[i];
    if (!el) return;
    const navH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 72;
    const stickyH = visualRef.current?.offsetHeight ?? 200;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      (navH + stickyH + 12);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      className={`story section-dark${isMobile ? " is-mobile" : ""}`}
      id="story"
      aria-labelledby="storyTitle"
    >
      <div className="story-pin" id="storyPin">
        <div className="story-visual" id="storyVisual" ref={visualRef}>
          {STORY_STEPS.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt={s.alt}
              data-step={i}
              className={step === i ? "active" : undefined}
              fill
              sizes="(max-width: 900px) 100vw, 460px"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={i === 0}
            />
          ))}
          <div className="story-progress" aria-hidden="true">
            {STORY_STEPS.map((_, i) => (
              <span
                key={i}
                className={`story-dot${step === i ? " active" : ""}`}
              />
            ))}
          </div>
          <p className="story-visual-label">{STORY_STEPS[step].title}</p>
        </div>

        <div className="story-copy">
          <p className="eyebrow">The bilona path</p>
          <h2 className="section-title" id="storyTitle">
            From Pasture to Jar
          </h2>
          <p className="section-lead">
            Six quiet steps. No shortcuts. The same rhythm our dairies have
            trusted for generations — now bottled for your table.
          </p>
          <div className="story-steps" id="storySteps" role="list">
            {STORY_STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`story-step${step === i ? " active" : ""}`}
                data-step={i}
                role="listitem"
                aria-current={step === i ? "step" : undefined}
                onClick={() => goToStep(i)}
              >
                <span className="story-step-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="story-step-body">
                  <strong>{s.title}</strong>
                  <p>{s.copy}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
