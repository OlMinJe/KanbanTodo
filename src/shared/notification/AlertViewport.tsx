import { AlertRow, useAlertStore } from '@/shared/notification'

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
