import AlertCard from '@/components/alert/AlertCard'
import { useAlertStore } from '@/store/alert'
import type { ALERT_ROW_PROPS } from '@/types/alert'
import { useEffect } from 'react'

const AlertRow = ({ item, onClose }: ALERT_ROW_PROPS) => {
  useEffect(() => {
    const t = window.setTimeout(() => onClose(item.id), 4000)
    return () => window.clearTimeout(t)
  }, [item.id, onClose])

  return (
    <div className="pointer-events-auto">
      <AlertCard
        type={item.type}
        title={item.title}
        message={item.message}
        onClose={() => onClose(item.id)}
      />
    </div>
  )
}

export default function AlertViewport() {
  const items = useAlertStore((s) => s.items)
  const remove = useAlertStore((s) => s.remove)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[min(92vw,28rem)] flex-col gap-3">
      {items.map((it) => (
        <AlertRow key={it.id} item={it} onClose={remove} />
      ))}
    </div>
  )
}
