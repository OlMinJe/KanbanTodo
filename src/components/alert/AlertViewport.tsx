import AlertCard from '@/components/alert/AlertCard'

const AlertRow = () => {
  return (
    <div className="pointer-events-auto">
      <AlertCard type="info" title="title" message="메시지" />
    </div>
  )
}

export default function AlertViewport() {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[min(92vw,28rem)] flex-col gap-3">
      <AlertRow />
    </div>
  )
}
