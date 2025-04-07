import { ReactNode } from "react"

import Callout from '../callout'

const InfoIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.562 4.5a.75.75 0 011.125 0l3 3a.75.75 0 11-1.06 1.06l-1.72-1.72V15a.75.75 0 01-1.5 0V9.09l-1.72 1.72a.75.75 0 01-1.06-1.06l3-3z"
      clipRule="evenodd"
    />
  </svg>
)

export const RemixPWAInfo = ({ children }: { children: ReactNode }) => {
  return (
    <Callout
      variant="info"
    >
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </Callout>
  )
}

const Info = RemixPWAInfo
export default Info
