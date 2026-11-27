export default function BrandIcon({ def, size = 14, className = "" }) {
  if (!def) return null;
  const [Icon, light, dark] = def;
  return (
    <Icon
      size={size}
      aria-hidden="true"
      className={`ti shrink-0 ${className}`}
      style={{ "--ic": light, "--icd": dark || light }}
    />
  );
}
