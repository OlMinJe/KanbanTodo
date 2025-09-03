import { type TODO } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import { Ellipsis } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  todo: TODO
  renderMenu?: ReactNode
}

export default function Card({ todo, renderMenu }: Props) {
  return (
    <Shadcn.Card className="flex shadow-md rounded-xl p-5">
      <Shadcn.CardHeader className="flex flex-row items-center justify-between p-0">
        <Shadcn.CardTitle className="text-sm font-semibold">{todo.title}</Shadcn.CardTitle>
        {renderMenu ?? (
          <button type="button" className="opacity-60">
            <Ellipsis width={18} height={18} />
          </button>
        )}
      </Shadcn.CardHeader>

      <Shadcn.CardContent className="text-sm flex-1 flex flex-col gap-1 p-0">
        {todo.description && <p className="text-xs text-gray-700 mb-2">{todo.description}</p>}

        <div className="flex justify-between items-center">
          {todo.tags?.length ? (
            <div className="flex flex-wrap gap-1">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}

          <span className="text-xs text-gray-500">P{todo.priority}</span>
        </div>
      </Shadcn.CardContent>
    </Shadcn.Card>
  )
}
