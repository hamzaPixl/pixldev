type PixlMarkProps = {
  className?: string;
  title?: string;
};

export function PixlMark({ className, title }: PixlMarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      className={className}
      viewBox="0 0 448 550"
      role={labelled ? "img" : undefined}
      aria-label={title}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <path
        className="pixl-mark-frame"
        fill="currentColor"
        fillRule="evenodd"
        d="M51 0h346v51h51v346h-51v51H210L99 550H0V51h51V0Zm39 90v343l70-73h198V90H90Z"
      />
      <rect className="pixl-mark-pixel" x="178" y="174" width="93" height="93" rx="8" fill="currentColor" />
    </svg>
  );
}

export function PixlWordmark({ className, title }: PixlMarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      className={className}
      viewBox="520 40 760 370"
      role={labelled ? "img" : undefined}
      aria-label={title}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" d="M750.6 169.17c-7.53-16-18.1-28.8-31.58-38.32s-29.6-14.27-48.09-14.27a80.37 80.37 0 0 0-33 6.74 86.55 86.55 0 0 0-27.74 20.35v-18a5.3 5.3 0 0 0-5.29-5.28h-46.41a7.86 7.86 0 0 0-7.93 7.92v264.42a5.21 5.21 0 0 0 5.28 5.29h54.31a5.3 5.3 0 0 0 5.28-5.29v-86.94a89.23 89.23 0 0 0 25.77 17 74.17 74.17 0 0 0 29.73 5.81c18.49 0 34.48-4.76 48.09-14.27s24.05-22.33 31.58-38.18 11.49-33.83 11.49-53.52-3.83-37.34-11.49-53.46Zm-68.31 89.32c-8.19 7.8-17 11.63-26.95 11.63a37.23 37.23 0 0 1-18.9-5c-5.94-3.17-10.83-8.46-14.53-15.33s-5.68-16-5.68-26.82 1.71-19.82 5.41-26.82 8.59-12.16 14.67-15.73a38.52 38.52 0 0 1 19-5.41c9.91 0 18.76 4.09 26.95 11.89s12.16 19.68 12.16 35.8-4.07 28-12.13 35.79Z" />
      <path fill="currentColor" d="M851.41 120.42H797a5.3 5.3 0 0 0-5.29 5.28v193.83a5.3 5.3 0 0 0 5.29 5.29h54.43a5.3 5.3 0 0 0 5.29-5.29V125.7a5.3 5.3 0 0 0-5.31-5.28ZM1191 52h-55.09a5.3 5.3 0 0 0-5.29 5.29v262.24a5.3 5.3 0 0 0 5.29 5.29H1191a5.22 5.22 0 0 0 5.29-5.29V57.26A5.22 5.22 0 0 0 1191 52Z" />
      <path fill="currentColor" d="m1093.87 316.49-64.48-93.15-32.24-46.51-37.66-54.17a5.31 5.31 0 0 0-4.35-2.24h-57.48a5.25 5.25 0 0 0-4.36 8.19l61.44 88.92a5.18 5.18 0 0 1 .13 5.81l-60.12 93.29a5.29 5.29 0 0 0 4.36 8.19h55a5.33 5.33 0 0 0 4.62-2.64l27.35-47a5.26 5.26 0 0 1 8.86-.27l32.9 47.57a5.28 5.28 0 0 0 4.36 2.38h57.34a5.28 5.28 0 0 0 4.33-8.37Z" />
      <rect fill="currentColor" x="1019.29" y="120.34" width="62.64" height="62.64" rx="5.29" />
      <rect fill="currentColor" x="1217.36" y="263.59" width="62.64" height="62.64" rx="5.29" />
    </svg>
  );
}
