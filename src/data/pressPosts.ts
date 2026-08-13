export interface PressPost {
  slug: string;
  title: string;
  kicker: string;
  categories: string[];
  displayDate: string;
  excerpt: string;
  image: string;
  sourceLabel?: string;
  sourceUrl?: string;
  // Paragraphs of body copy. A line starting with "> " renders as a
  // pull-quote. **word** renders as bold within a line.
  content: string[];
}

export const pressPosts: PressPost[] = [
  {
    slug: "boeing-india-partners-with-wilton-weavers-to-strengthen-aerospace-skilling",
    title: "Boeing India Partners with Wilton Weavers to Strengthen Aerospace Skilling",
    kicker:
      "First cohort of 15 women with disabilities graduates into mainstream aviation manufacturing jobs.",
    categories: ["News", "Partnerships"],
    displayDate: "29 January 2026",
    excerpt:
      "Boeing India's Kaushal skilling program and Wilton Weavers' Ameyaa initiative come together to bring people from disadvantaged backgrounds, including those with disabilities, into mainstream aviation manufacturing jobs.",
    image: "/images/press-center/boeing-news.jpg",
    sourceLabel: "Boeing India",
    sourceUrl:
      "https://www.boeing.co.in/news/2026/boeing-india-partners-with-wilton-weavers-to-strengthen-aerospace-skilling",
    content: [
      "Hyderabad, India, January 29, 2026: Boeing India today announced a partnership with Indian supply chain partner Wilton Weavers that is helping build a skilled workforce as part of India's growing aerospace manufacturing ecosystem. The Boeing India supply chain skilling initiative, **Kaushal**, and the Wilton Weavers' **Ameyaa** program will come together to provide opportunities to people from disadvantaged backgrounds including those with disabilities, to join mainstream aviation manufacturing jobs. The partnership will advance supplier capability and is a model that can be replicated across the aerospace industry.",
      "The Wilton Weavers' Ameyaa program brings women with disabilities into carpet manufacturing through training and stable employment. By adding on the Boeing Kaushal skilling program, their skills are being further enhanced to meet global aerospace standards for aviation carpet manufacturing, which involves high precision and stringent quality and safety standards to be met.",
      "> “Building strong supplier capability and a skilled workforce is essential for the long-term growth of India's aerospace ecosystem,” said Ashwani Bhargava, senior director, India Supply Chain, Boeing. “Through the Kaushal program, we are working with our partners to develop structured training pathways that support sustainable employment and deepen indigenous aerospace manufacturing capability.”",
      "> “Ameyaa is guided by our core philosophy of mindful manufacturing, where excellence in products must go hand-in-hand with responsibility to people and the planet,” said Malini Gautham, CEO, Wilton Weavers. “Our collaboration with Boeing's Kaushal skilling program has strengthened this approach by embedding structured trainings and global standards into our operations, helping build a skilled inclusive workforce that contributes to India's aerospace supply chain.”",
      "The first cohort of 15 women with disabilities has successfully graduated as a result of this partnership. They are now employed in Wilton Weavers' aviation manufacturing operations, making aviation-grade products for global aerospace customers.",
    ],
  },
];

export function getPressPost(slug: string): PressPost | undefined {
  return pressPosts.find((post) => post.slug === slug);
}
