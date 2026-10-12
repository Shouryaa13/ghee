"use client";

import { useState } from "react";
import Image from "next/image";

const cues = {
  grain: [
    "Fine, even crystals that catch the light — a bilona hallmark.",
    "Mixed grain — some grit, some oddly smooth patches.",
    "Waxy-smooth surface. Little to no natural granulation.",
  ],
  aroma: [
    "Warm, nutty, faintly caramel — never greasy or chemical.",
    "Milder scent; a faint oiliness creeps in.",
    "Flat or vaguely chemical — missing the kitchen warmth of pure ghee.",
  ],
  melt: [
    "Softens cleanly at room warmth; leaves a clear golden pool.",
    "Melts unevenly; pool looks slightly cloudy.",
    "Stays oddly firm or turns cloudy — visual cue to be cautious.",
  ],
};

export default function GoldenTest() {
  const [value, setValue] = useState(0);
  const tier = value < 33 ? 0 : value < 66 ? 1 : 2;

  return (
    <section
      className="section section-cream"
      id="golden-test"
      aria-labelledby="testTitle"
    >
      <div className="section-head">
        <p className="eyebrow">Education</p>
        <h2 className="section-title" id="testTitle">
          The Golden Test
        </h2>
        <p className="section-lead">
          Drag the slider. See how pure bilona ghee differs from adulterated fats
          — by look, melt, and aroma cues. Educational only.
        </p>
      </div>
      <div className="test-widget">
        <div className="test-visual" id="testVisual">
          <Image
            className="pure"
            src="/assets/texture-closeup.jpg"
            alt="Granular texture of pure bilona ghee"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <Image
            className="adulterated"
            src="/assets/lifestyle-kitchen.jpg"
            alt="Smoother looking fat for comparison"
            id="adulteratedImg"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: value / 100,
            }}
          />
        </div>
        <div className="test-cues">
          <div className="slider-wrap">
            <label htmlFor="puritySlider">
              <span>Pure</span>
              <span>Adulterated</span>
            </label>
            <input
              type="range"
              id="puritySlider"
              min={0}
              max={100}
              value={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-label="Compare pure ghee versus adulterated"
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
          <div className="cue">
            <strong>Granularity (danedaar)</strong>
            <p id="cueGrain">{cues.grain[tier]}</p>
          </div>
          <div className="cue">
            <strong>Aroma</strong>
            <p id="cueAroma">{cues.aroma[tier]}</p>
          </div>
          <div className="cue">
            <strong>Melt</strong>
            <p id="cueMelt">{cues.melt[tier]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
