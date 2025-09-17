import { type TODO } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import type { ReactNode } from 'react'

type Props = {
  todo: TODO
  renderMenu?: ReactNode
}

export default function Card({ todo, renderMenu }: Props) {
  return (
    <Shadcn.Card className="flex rounded-xl p-3">
      <Shadcn.CardHeader className="flex flex-row items-center justify-between p-0">
        <Shadcn.CardTitle
          className={['pr-2 text-sm font-semibold tracking-tight line-clamp-1 '].join(' ')}
          title={todo.title}
        >
          {todo.title}
        </Shadcn.CardTitle>
        {renderMenu}
      </Shadcn.CardHeader>

      <Shadcn.CardContent className="text-sm flex-1 flex flex-col gap-1 p-0">
        {todo.description ? (
          <p
            className="line-clamp-1 text-xs text-zinc-600 dark:text-zinc-400"
            title={todo.description}
          >
            {todo.description}
          </p>
        ) : (
          <div className="h-[12px]" />
        )}

        <div className="flex justify-between items-center">
          {/* {todo.tags?.length ? (
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
          )} */}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              태그 - 추후
            </span>
          </div>

          <span className="text-xs text-gray-500">{todo.priority}</span>
        </div>
      </Shadcn.CardContent>
    </Shadcn.Card>
  )
}
