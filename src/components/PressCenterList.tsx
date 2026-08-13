"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { pressPosts, type PressPost } from "@/data/pressPosts";

const ALL = "All";

function FeaturedCard({ post }: { post: PressPost }) {
  return (
    <Link
      href={`/press-center/${post.slug}`}
      className="group relative block w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden"
    >
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
        <div className="flex items-center justify-between gap-4 body-small text-white/80">
          <span>{post.categories.join(", ")}</span>
          <span>{post.displayDate}</span>
        </div>
        <h3 className="sub-heading md:main-heading text-white max-w-[800px] select-none">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: PressPost }) {
  return (
    <Link
      href={`/press-center/${post.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden"
    >
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-4 body-small text-white/80">
          <span>{post.categories.join(", ")}</span>
          <span>{post.displayDate}</span>
        </div>
        <h3 className="body-large text-white select-none">{post.title}</h3>
      </div>
    </Link>
  );
}

export default function PressCenterList() {
  const categories = useMemo(() => {
    const set = new Set<string>();
    pressPosts.forEach((post) => post.categories.forEach((c) => set.add(c)));
    return [ALL, ...Array.from(set)];
  }, []);

  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL
      ? pressPosts
      : pressPosts.filter((post) => post.categories.includes(active));

  const [featured, ...rest] = visible;

  return (
    <section
      id="press-list"
      className="relative z-30 w-full bg-white py-20 md:py-28 px-6 md:px-16"
    >
      {/* Padding lives on the section (outside the cap), matching the
          Footer's own container pattern, so content stays aligned to the
          same left edge as the footer nav at every viewport width — not
          just below the 1440px cap where padding-inside-cap looks the same. */}
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header (left-aligned, matching the hero intro on Home/About/Team
            so it shares the logo's exact left edge rather than the centered
            "Why Wilton" section-header style used further down the site) */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <span className="sub-heading block mb-3 select-none">
            Press Center
          </span>
          <h2 className="big-heading mb-6 max-w-[1200px] select-none">
            Announcements, partnerships and recognition from Wilton Weavers.
          </h2>
          <p className="body-large max-w-[700px] select-none">
            The latest news from the loom to the world stage &mdash;
            partnerships, milestones and the people behind them.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`body-small px-4 py-2 border rounded-full transition-colors duration-300 cursor-pointer select-none ${
                active === c
                  ? "border-brand-dark text-brand-dark"
                  : "border-brand-dark/20 text-brand-grey hover:border-brand-dark/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-12">
          {featured ? (
            <FeaturedCard post={featured} />
          ) : (
            <p className="body-large text-center text-brand-grey py-20 select-none">
              No articles in this category yet.
            </p>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
