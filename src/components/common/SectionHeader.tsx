interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="sectionHeader">
      {eyebrow && <span className="pill">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p className="muted">{description}</p>}
    </div>
  );
}
