import './ColorLegend.css'

const LEGEND_ITEMS = [
  { className: "root", label: "root" },
  { className: "root bass", label: "root in the bass" },
  { className: "tone", label: "chord tone" },
  { className: "tone bass", label: "chord tone in the bass" },
  { className: "bass", label: "Bass" },
  { className: "tone extension", label: "7th (tone + extension)" },
  { className: "extension", label: "extension (9, 11, 13)" },
];

export function ColorLegend() {
  return (
    <div className="color-legend">
      <p>Legend</p>
      <ul>
        {LEGEND_ITEMS.map(({ className, label }) => (
          <li key={className}>
            <span className={`swatch ${className}`} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
