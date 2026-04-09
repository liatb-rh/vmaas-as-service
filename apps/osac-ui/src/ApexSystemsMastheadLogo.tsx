import { useId } from 'react'

/**
 * Demo mark for Tenant user shell — stylized “apex” peak + wordmark.
 * Uses currentColor so it follows PatternFly masthead text on light/dark themes.
 */
export function ApexSystemsMastheadLogo() {
  const gradId = `osac-apex-peak-${useId().replace(/:/g, '')}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 156 28"
      role="img"
      aria-label="Apex Systems"
      style={{
        display: 'block',
        height: 'var(--pf-v6-c-masthead__logo--MaxHeight, 2.375rem)',
        width: 'auto',
        maxHeight: '100%',
        color: 'var(--pf-t--global--text--color--regular)',
      }}
    >
      <title>Apex Systems</title>
      <defs>
        <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#006272" />
          <stop offset="100%" stopColor="#1ec8de" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradId})`} d="M0 26 L13 2 L26 26 Z" />
      <text
        x="32"
        y="19"
        fill="currentColor"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
      >
        Apex
      </text>
      <text
        x="68"
        y="19"
        fill="currentColor"
        fontSize="13"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        opacity={0.88}
      >
        Systems
      </text>
    </svg>
  )
}
