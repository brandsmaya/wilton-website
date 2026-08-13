import { notFound } from "next/navigation";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import PageLogo from "@/components/PageLogo";
import Footer from "@/components/Footer";
import PressRichText from "@/components/PressRichText";
import { pressPosts, getPressPost } from "@/data/pressPosts";

export async function generateStaticParams() {
  return pressPosts.map((post) => ({ slug: post.slug }));
}

export default async function PressArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPressPost(slug);

  if (!post) {
    notFound();
  }

  const related = pressPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <div className="w-full px-6 pt-4 pb-4 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full">
            <PageLogo />
          </div>
        </div>
        <article className="relative z-30 w-full pt-12 md:pt-16 pb-20 md:pb-28 px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full">
            <Link
              href="/press-center"
              className="body-small text-brand-grey hover:text-brand-dark transition-colors duration-300 inline-block mb-10 select-none"
            >
              ← Back to Press Center
            </Link>

            <div className="max-w-[900px]">
              <h1 className="big-heading mb-6 select-none">{post.title}</h1>
              <div className="flex items-center gap-4 body-small text-brand-grey mb-10 pb-6 border-b border-brand-dark/10 select-none">
                <span>{post.categories.join(", ")}</span>
                <span className="w-1 h-1 rounded-full bg-brand-grey/50" />
                <span>{post.displayDate}</span>
              </div>
            </div>

            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-12 md:mb-16">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="max-w-[800px]">
              <p className="sub-heading text-brand-dark mb-8 select-none">
                {post.kicker}
              </p>
              <PressRichText paragraphs={post.content} />

              {post.sourceUrl && (
                <p className="body-small text-brand-grey mt-4">
                  Source:{" "}
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-brand-dark transition-colors duration-300"
                  >
                    {post.sourceLabel ?? post.sourceUrl}
                  </a>
                </p>
              )}

              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-brand-dark/10">
                <span className="body-small text-brand-grey select-none">
                  Share
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://wiltonweavers.com/press-center/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-small text-brand-dark hover:text-brand-grey transition-colors duration-300"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://wiltonweavers.com/press-center/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-small text-brand-dark hover:text-brand-grey transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="relative z-30 w-full bg-white pb-20 md:pb-28 px-6 md:px-16">
            <div className="max-w-[1440px] mx-auto w-full">
              <h2 className="sub-heading mb-8 select-none">
                Related articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/press-center/${r.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col justify-between p-6">
                      <div className="flex items-center justify-between gap-4 body-small text-white/80">
                        <span>{r.categories.join(", ")}</span>
                        <span>{r.displayDate}</span>
                      </div>
                      <h3 className="body-large text-white select-none">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
