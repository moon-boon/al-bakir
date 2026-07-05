const EMAP_URL = "https://emap.pk/multi-garden-islamabad-map";

export default function EmapButton() {
  return (
    <a
      href={EMAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Multi Gardens Islamabad on eMap"
      className="glass-dark fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-black shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-bright" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
      eMap
    </a>
  );
}
