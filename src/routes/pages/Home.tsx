import { useCountStore } from '@/store/count'

export default function Home() {
  const count = useCountStore((state) => state.count)
  const { increase, decrease } = useCountStore((state) => state.actions)
  return (
    <div>
      <h1>Home</h1>
      <h2>{count}</h2>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  )
}
