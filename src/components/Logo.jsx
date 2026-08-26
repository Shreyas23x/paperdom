// Paperdome wordmark's dome logo — a clean, monochrome observatory-style dome
// on a base, drawn inline so it stays crisp at any size and inherits the
// design-system greys. Used in the navbar and footer.
export default function Logo({ className = '', size = 34 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="#18181b" />
      <rect x="12" y="41" width="40" height="4.4" rx="2.2" fill="#fff" />
      <g
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 42a17 17 0 0 1 34 0" />
        <path d="M23.5 42a8.5 17 0 0 1 17 0" />
        <line x1="32" y1="24.5" x2="32" y2="42" />
      </g>
      <circle cx="32" cy="22" r="2.4" fill="#fff" />
    </svg>
  )
}
