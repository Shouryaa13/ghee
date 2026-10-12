const items = [
  {
    title: "Bilona Method",
    sub: "Hand-churned curd to makkhan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v18M7 8c2 2 8 2 10 0M7 16c2-2 8-2 10 0" />
      </svg>
    ),
  },
  {
    title: "No Preservatives",
    sub: "Just milk, culture, time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Glass Jar",
    sub: "See the gold you buy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 4h8v2l2 3v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9l2-3V4z" />
      </svg>
    ),
  },
  {
    title: "Made in India",
    sub: "For Indian kitchens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <div className="trust" role="list">
      {items.map((item) => (
        <div className="trust-item" role="listitem" key={item.title}>
          {item.icon}
          <strong>{item.title}</strong>
          <span>{item.sub}</span>
        </div>
      ))}
    </div>
  );
}
