import type { SVGProps } from "react";

/** Small inline icon set (24px grid, 2px stroke). Decorative by default: aria-hidden. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);
export const IconHome = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M10 21v-6h4v6" />
  </Base>
);
export const IconMap = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M7.2 6h9.6M6.2 7.9l4.6 8.2M17.8 7.9l-4.6 8.2" />
  </Base>
);
export const IconCards = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="14" height="15" rx="2.5" />
    <path d="M7 3h11.5A2.5 2.5 0 0 1 21 5.5V17" />
  </Base>
);
export const IconBook = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z" />
    <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3" />
    <path d="M8 7.5h8M8 11h6" />
  </Base>
);
export const IconColumns = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M12 4v16" />
  </Base>
);
export const IconPrinter = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 9V3h10v6" />
    <rect x="3" y="9" width="18" height="8" rx="2" />
    <path d="M7 14h10v7H7z" />
  </Base>
);
export const IconSheet = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M15 3v4h4M9 12h7M9 16h7M9 8h3" />
  </Base>
);
export const IconFlame = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p} strokeWidth={1.8} fill={filled ? "currentColor" : "none"}>
    <path
      d="M12 2.5c.6 3.2 4.8 5.4 4.8 10.1A4.8 4.8 0 0 1 12 17.4a4.8 4.8 0 0 1-4.8-4.8c0-2 .9-3.3 2-4.4.2 1.4.9 2.4 2 2.9-.6-3.1.3-6.2.8-8.6z"
      transform="translate(0 2.5)"
    />
  </Base>
);
export const IconSun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);
export const IconMoon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
  </Base>
);
export const IconMonitor = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Base>
);
export const IconBookmark = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M6 3.5h12v17l-6-4-6 4z" />
  </Base>
);
export const IconArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);
export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const IconChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" />
  </Base>
);
export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);
export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
export const IconAlert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 2.5 20h19z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </Base>
);
export const IconHelp = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.8M12 17.5h.01" />
  </Base>
);
export const IconQuote = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20.5V18a6 6 0 0 1 6-6V5H4v7M14 20.5V18a6 6 0 0 1 6-6V5h-6v7" />
  </Base>
);
export const IconBulb = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" />
  </Base>
);
export const IconShuffle = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.8 0 3-1.6 4.1-3.6M13.4 9.6C14.5 8 15.7 7 17.5 7H21" />
    <path d="m18 4 3 3-3 3M18 14l3 3-3 3" />
  </Base>
);
export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 4.5v15l12-7.5z" />
  </Base>
);
export const IconRestart = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
    <path d="M4 4v4.5h4.5" />
  </Base>
);
export const IconDownload = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Base>
);
export const IconUpload = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 16V5M7 10l5-5 5 5M5 20h14" />
  </Base>
);
export const IconList = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" />
    <circle cx="4.5" cy="12" r="1" />
    <circle cx="4.5" cy="18" r="1" />
  </Base>
);
export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);
export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);
export const IconFit = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Base>
);
export const IconExternal = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
  </Base>
);
export const IconLink = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Base>
);
export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
  </Base>
);
