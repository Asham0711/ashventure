import React from 'react'

const HighlightText = ({ text }: { text: string | undefined }) => {
  return (
    <span className="bg-linear-to-r from-[#FF003C] via-primary-brand to-primary-brand-active bg-clip-text text-transparent">
        {text}
    </span>
  )
}

export default HighlightText