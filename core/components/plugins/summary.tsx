import { type ReactNode, type JSX } from "react"

export const RemixPWASummary = ({
  children,
  title,
}: {
  title: string
  children: ReactNode | JSX.Element
}) => {
  return (
    <details className="prose prose-slate -mt-0 mb-6 rounded-xl border border-border px-6 py-3 open:pb-5">
      <summary className="cursor-pointer select-none font-medium text-foreground">
        {title}
      </summary>
      {children}
    </details>
  )
}

const Summary = RemixPWASummary
export default Summary
