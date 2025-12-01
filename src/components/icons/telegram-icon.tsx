import * as React from "react"
import { SVGProps } from "react"

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2 L11 13" />
      <path d="M22 2 L15 22 L11 13 L2 9 L22 2 Z" />
    </svg>
  )
}
