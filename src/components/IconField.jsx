/** Form field with a leading icon that lights up on focus. */
export default function IconField({ Icon, top = false, children }) {
  return (
    <div className="group relative">
      <Icon
        size={16}
        aria-hidden="true"
        className={`pointer-events-none absolute left-3 text-ink-ghost transition-colors duration-150 group-focus-within:text-link ${
          top ? "top-3.5" : "top-1/2 -translate-y-1/2"
        }`}
      />
      {children}
    </div>
  );
}
