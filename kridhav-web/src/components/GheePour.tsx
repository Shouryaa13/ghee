"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/format";

export default function GheePour() {
  const rootRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = prefersReducedMotion();
    const streams = root.querySelectorAll<SVGGeometryElement>(".gp-stream-path");
    const fill = root.querySelector<SVGRectElement>(".gp-fill");
    const wave = root.querySelector<SVGGElement>(".gp-wave");
    const splash = root.querySelectorAll<SVGElement>(".gp-splash");
    const glow = root.querySelector<SVGElement>(".gp-glow");
    const jar = root.querySelector<SVGGElement>(".gp-jar");
    const shine = root.querySelectorAll<SVGElement>(".gp-shine");
    const stage = root.querySelector<SVGGElement>(".gp-stage");

    const prepStreams = (full: boolean) => {
      streams.forEach((el) => {
        const len = el.getTotalLength?.() ?? 300;
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = full ? "0" : `${len}`;
      });
    };

    if (reduce) {
      prepStreams(true);
      gsap.set([jar, glow, shine, wave, stage], { opacity: 1, clearProps: "transform" });
      if (fill) {
        fill.setAttribute("y", "188");
        fill.setAttribute("height", "112");
      }
      gsap.set(splash, { opacity: 0 });
      return;
    }

    prepStreams(false);
    gsap.set(stage, { opacity: 0, y: 24, scale: 0.96, transformOrigin: "50% 60%" });
    gsap.set(glow, { opacity: 0, scale: 0.75, transformOrigin: "110px 250px" });
    gsap.set(fill, { attr: { y: 300, height: 0 } });
    gsap.set(wave, { opacity: 0, y: 8 });
    gsap.set(splash, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" });
    gsap.set(shine, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(stage, { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 0.15)
      .to(glow, { opacity: 1, scale: 1, duration: 1.1 }, 0.2)
      .to(
        streams,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.07,
        },
        0.35
      )
      .to(
        fill,
        {
          attr: { y: 188, height: 112 },
          duration: 1.65,
          ease: "power2.out",
        },
        1.05
      )
      .to(wave, { opacity: 1, y: 0, duration: 0.5 }, 1.55)
      .to(
        splash,
        {
          opacity: 0.95,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(2)",
        },
        1.5
      )
      .to(splash, { opacity: 0, y: -8, duration: 0.55, stagger: 0.04 }, 2.05)
      .to(shine, { opacity: 1, duration: 0.75, stagger: 0.08 }, 1.75);

    const shimmer = gsap.to(streams[streams.length - 1], {
      opacity: 0.4,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2.3,
    });

    const waveMotion = gsap.to(wave, {
      x: 4,
      duration: 2.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2,
    });

    return () => {
      tl.kill();
      shimmer.kill();
      waveMotion.kill();
    };
  }, []);

  const ghee = `gp-ghee-${uid}`;
  const gheeSoft = `gp-hi-${uid}`;
  const glass = `gp-glass-${uid}`;
  const lid = `gp-lid-${uid}`;
  const clipJar = `gp-clip-${uid}`;
  const blur = `gp-blur-${uid}`;
  const glowF = `gp-glowf-${uid}`;

  return (
    <div className="pour-wrap" aria-hidden="true">
      <svg
        ref={rootRef}
        className="pour-svg"
        viewBox="0 0 220 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={ghee} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF8D0" />
            <stop offset="28%" stopColor="#F2C84F" />
            <stop offset="62%" stopColor="#E8B13A" />
            <stop offset="100%" stopColor="#B87A0E" />
          </linearGradient>
          <linearGradient id={gheeSoft} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F8E08A" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="40%" stopColor="rgba(251,244,228,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.16)" />
          </linearGradient>
          <linearGradient id={lid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6D56A" />
            <stop offset="100%" stopColor="#9A6A0C" />
          </linearGradient>
          <filter id={blur} x="-60%" y="-40%" width="220%" height="180%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id={glowF} x="-40%" y="-20%" width="180%" height="150%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={clipJar}>
            <path d="M64 168 C64 168 62 270 110 300 C158 270 156 168 156 168 Z" />
          </clipPath>
        </defs>

        <g className="gp-stage">
          <ellipse
            className="gp-glow"
            cx="110"
            cy="240"
            rx="86"
            ry="100"
            fill="#E8B13A"
            opacity="0.28"
            filter={`url(#${blur})`}
          />

          {/* Stream bloom */}
          <path
            className="gp-stream-path"
            d="M110 4 C122 40 96 78 112 112 C124 140 104 156 110 164"
            stroke={`url(#${ghee})`}
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.3"
            filter={`url(#${blur})`}
          />
          <path
            className="gp-stream-path"
            d="M110 2 C118 38 100 74 110 110 C120 138 104 154 110 162"
            stroke={`url(#${ghee})`}
            strokeWidth="11"
            strokeLinecap="round"
            filter={`url(#${glowF})`}
          />
          <path
            className="gp-stream-path"
            d="M105 8 C110 42 98 78 106 112 C112 136 102 152 106 160"
            stroke={`url(#${ghee})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.55"
          />

          <circle className="gp-splash" cx="94" cy="172" r="3.5" fill="#FFF4B8" />
          <circle className="gp-splash" cx="128" cy="168" r="2.8" fill="#E8B13A" />
          <circle className="gp-splash" cx="112" cy="158" r="2.2" fill="#F8E08A" />

          <g className="gp-jar">
            {/* Lid */}
            <rect x="74" y="148" width="72" height="14" rx="3.5" fill={`url(#${lid})`} />
            <rect x="80" y="141" width="60" height="10" rx="3" fill="#E8B13A" />
            <rect
              x="86"
              y="143"
              width="22"
              height="3.5"
              rx="1.2"
              fill="rgba(255,255,255,0.45)"
            />

            {/* Neck */}
            <rect
              x="82"
              y="160"
              width="56"
              height="10"
              fill="rgba(251,244,228,0.2)"
              stroke="rgba(251,244,228,0.35)"
              strokeWidth="1"
            />

            {/* Solid glass silhouette for readability */}
            <path
              d="M64 168 C64 168 62 270 110 300 C158 270 156 168 156 168 Z"
              fill="rgba(15,26,20,0.35)"
            />
            <path
              d="M64 168 C64 168 62 270 110 300 C158 270 156 168 156 168 Z"
              fill={`url(#${glass})`}
              stroke="rgba(251,244,228,0.55)"
              strokeWidth="2"
            />

            <g clipPath={`url(#${clipJar})`}>
              <rect
                className="gp-fill"
                x="62"
                y="300"
                width="96"
                height="0"
                fill={`url(#${ghee})`}
              />
              <g className="gp-wave">
                <path
                  d="M62 196
                     C78 188 94 204 110 196
                     C126 188 142 204 158 196
                     V310 H62 Z"
                  fill="#F4D06A"
                  opacity="0.45"
                />
                <path
                  d="M62 194
                     C80 202 96 186 110 194
                     C124 202 140 186 158 194"
                  stroke="#FFF8D0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </g>
            </g>

            <path
              className="gp-shine"
              d="M72 178 C76 220 82 258 110 280"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              className="gp-shine"
              d="M148 180 C144 222 138 256 122 276"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <rect
              x="82"
              y="214"
              width="56"
              height="38"
              rx="4"
              fill="#FBF4E4"
            />
            <text
              x="110"
              y="231"
              textAnchor="middle"
              fontSize="8"
              fontFamily="Georgia, serif"
              fill="#0F1A14"
              fontWeight="700"
            >
              KRIDHAV
            </text>
            <text
              x="110"
              y="243"
              textAnchor="middle"
              fontSize="4.5"
              fontFamily="system-ui, sans-serif"
              fill="#6B7A70"
              letterSpacing="1.2"
            >
              PURE GOLD
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
