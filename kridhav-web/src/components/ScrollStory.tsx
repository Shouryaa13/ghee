"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { STORY_STEPS } from "@/data/products";
import { prefersReducedMotion } from "@/lib/format";

const SHORT = ["Pasture", "Milk", "Curd", "Bilona", "Fire", "Gold"] as const;
const N = STORY_STEPS.length;
const STEP_ANGLE = 360 / N;

function clampStep(i: number) {
  return ((i % N) + N) % N;
}

function angleToStep(deg: number) {
  // 0° at top, clockwise
  const normalized = ((deg % 360) + 360) % 360;
  return clampStep(Math.round(normalized / STEP_ANGLE) % N);
}

export default function ScrollStory() {
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reduce, setReduce] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const pointerId = useRef<number | null>(null);
  const lastAngle = useRef(0);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  const goTo = useCallback((i: number) => {
    setStep(clampStep(i));
  }, []);

  const pointerAngle = (clientX: number, clientY: number) => {
    const el = dialRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rad = Math.atan2(clientY - cy, clientX - cx);
    // convert: 0 at top, clockwise positive
    return ((rad * 180) / Math.PI + 90 + 360) % 360;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".ritual-node")) return;
    pointerId.current = e.pointerId;
    dialRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    const a = pointerAngle(e.clientX, e.clientY);
    lastAngle.current = a;
    setStep(angleToStep(a));
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId || !dragging) return;
    const a = pointerAngle(e.clientX, e.clientY);
    const next = angleToStep(a);
    if (next !== step) setStep(next);
    lastAngle.current = a;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    setDragging(false);
    try {
      dialRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (reduce) return;
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("story");
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight - 80) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(step + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(step - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, reduce, step]);

  const rotation = step * STEP_ANGLE;
  const progress = ((step + 1) / N) * 100;
  const active = STORY_STEPS[step];
  const circumference = 2 * Math.PI * 46; // svg viewBox circle r=46
  const dash = (progress / 100) * circumference;

  return (
    <section
      className={`ritual${dragging ? " is-dragging" : ""}${reduce ? " is-reduce" : ""}`}
      id="story"
      aria-labelledby="storyTitle"
    >
      <div className="ritual-aurora" aria-hidden="true" />
      <div className="ritual-inner">
        <header className="ritual-head">
          <p className="eyebrow">The bilona chakra</p>
          <h2 className="section-title" id="storyTitle">
            Spin the ritual
          </h2>
          <p className="section-lead">
            Six stations. One circle. Drag the dial — or tap a node — and watch
            pasture become gold.
          </p>
        </header>

        <div className="ritual-stage">
          <div
            className="ritual-dial"
            ref={dialRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="group"
            aria-label="Bilona ritual dial"
          >
            <svg className="ritual-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle className="ritual-ring-track" cx="50" cy="50" r="46" />
              <circle
                className="ritual-ring-fill"
                cx="50"
                cy="50"
                r="46"
                style={{
                  strokeDasharray: `${dash} ${circumference}`,
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
              <circle className="ritual-ring-glow" cx="50" cy="50" r="40" />
            </svg>

            <div
              className="ritual-spoke"
              style={{ transform: `rotate(${rotation}deg)` }}
              aria-hidden="true"
            >
              <span className="ritual-spoke-tip" />
            </div>

            <div className="ritual-core">
              {STORY_STEPS.map((s, i) => (
                <Image
                  key={s.image}
                  src={s.image}
                  alt=""
                  className={step === i ? "active" : undefined}
                  fill
                  sizes="(max-width: 700px) 55vw, 280px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority={i === 0}
                />
              ))}
              <div className="ritual-core-veil" />
              <div className="ritual-pour" aria-hidden="true">
                <span key={step} className="ritual-pour-beam" />
              </div>
              <div className="ritual-core-meta">
                <span className="ritual-count">
                  {String(step + 1).padStart(2, "0")}
                  <em>/{String(N).padStart(2, "0")}</em>
                </span>
              </div>
            </div>

            <div className="ritual-nodes">
              {STORY_STEPS.map((s, i) => {
                const ang = i * STEP_ANGLE;
                return (
                  <button
                    key={s.title}
                    type="button"
                    className={`ritual-node${step === i ? " active" : ""}${i < step ? " done" : ""}`}
                    style={{
                      // place on circle, counter-rotate label
                      transform: `rotate(${ang}deg) translateY(calc(-1 * var(--ritual-r))) rotate(${-ang}deg)`,
                    }}
                    aria-label={`${SHORT[i]}: ${s.title}`}
                    aria-current={step === i ? "step" : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="ritual-node-orb">
                      <span>{String(i + 1)}</span>
                    </span>
                    <span className="ritual-node-label">{SHORT[i]}</span>
                  </button>
                );
              })}
            </div>

            <div className="ritual-orbit" aria-hidden="true">
              <span
                className="ritual-drop"
                style={{ transform: `rotate(${rotation * 1.2}deg)` }}
              />
            </div>
          </div>

          <aside className="ritual-card" aria-live="polite">
            <p className="ritual-card-kicker">Station {step + 1}</p>
            <h3>{active.title}</h3>
            <p>{active.copy}</p>
            <div className="ritual-nav">
              <button
                type="button"
                className="ritual-nav-btn"
                onClick={() => goTo(step - 1)}
                aria-label="Previous station"
              >
                ←
              </button>
              <div className="ritual-pips" aria-hidden="true">
                {STORY_STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`ritual-pip${step === i ? " active" : ""}`}
                    onClick={() => goTo(i)}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <button
                type="button"
                className="ritual-nav-btn"
                onClick={() => goTo(step + 1)}
                aria-label="Next station"
              >
                →
              </button>
            </div>
            <p className="ritual-hint">Drag the circle · tap a gold node</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
