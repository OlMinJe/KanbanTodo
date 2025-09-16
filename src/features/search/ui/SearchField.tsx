type PROPS = {
  value: string
  onChange: (v: string) => void
  onSubmit?: () => void
  onClear?: () => void
  placeholder?: string
  className?: string
}

export default function SearchField(props: PROPS) {
  const { value, onChange, onSubmit, onClear, placeholder = '제목/설명 검색', className } = props
  return (
    <div className={className}>
      <input
        className="w-full rounded-md border px-2 py-1 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.()
          if (e.key === 'Escape') onClear?.()
        }}
      />
    </div>
  )
}
