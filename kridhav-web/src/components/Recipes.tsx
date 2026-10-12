import Image from "next/image";
import { RECIPES } from "@/data/products";

export default function Recipes() {
  return (
    <section
      className="section section-cream"
      id="recipes"
      aria-labelledby="recipesTitle"
    >
      <div className="section-head">
        <p className="eyebrow">In the kitchen</p>
        <h2 className="section-title" id="recipesTitle">
          Where ghee belongs
        </h2>
        <p className="section-lead">
          Five everyday rituals — elevated with a spoon of gold.
        </p>
      </div>
      <div
        className="recipe-rail"
        tabIndex={0}
        aria-label="Recipe cards, scroll horizontally"
      >
        {RECIPES.map((r) => (
          <article className="recipe-card" key={r.title}>
            <Image
              src={r.image}
              alt=""
              fill
              loading="lazy"
              sizes="280px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="recipe-meta">
              <h3>{r.title}</h3>
              <p>{r.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
