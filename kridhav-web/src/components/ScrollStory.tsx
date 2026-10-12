"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_STEPS } from "@/data/products";
import { prefersReducedMotion } from "@/lib/format";

export default function ScrollStory() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = prefersReducedMotion();

    if (reduce) {
      setStep(5);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    const trigger = ScrollTrigger.create({
      trigger: "#storyPin",
      start: "top top",
      end: isMobile ? "+=1600" : "+=2800",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const n = Math.min(5, Math.floor(self.progress * 6));
        setStep(n);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="story section-dark" id="story" aria-labelledby="storyTitle">
      <div className="story-pin" id="storyPin">
        <div className="story-visual" id="storyVisual">
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
              <div
                key={s.title}
                className={`story-step${step === i ? " active" : ""}`}
                data-step={i}
                role="listitem"
              >
                <strong>{s.title}</strong>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
