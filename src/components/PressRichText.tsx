function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-brand-dark">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function PressRichText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col">
      {paragraphs.map((text, idx) =>
        text.startsWith("> ") ? (
          <blockquote
            key={idx}
            className="border-l-2 border-brand-dark/20 pl-6 my-8 body-large text-brand-dark italic"
          >
            <BoldText text={text.slice(2)} />
          </blockquote>
        ) : (
          <p key={idx} className="body-large mb-6 leading-relaxed">
            <BoldText text={text} />
          </p>
        )
      )}
    </div>
  );
}
