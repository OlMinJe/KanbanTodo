import { AlertCard, type ALERT_ITEM } from '@/shared/notification'
import { useEffect } from 'react'

export type ALERT_ROW_PROPS = { item: ALERT_ITEM; onClose: (id: string) => void }

export default function AlertRow({ item, onClose }: ALERT_ROW_PROPS) {
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
