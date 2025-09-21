import type { MenuNode } from '../header'
import { MenuLink } from './menulink'
import { ChevronRight } from './chevron-right'

export function DropdownItem({
  node,
  level
}: {
  node: MenuNode
  level: number
}) {
  const hasChildren = (node.children?.length ?? 0) > 0

  const base = (
    <MenuLink
      to={node.path}
      label={node.label}
      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
      trailing={
        hasChildren ? <ChevronRight className="h-4 w-4 shrink-0" /> : null
      }
    />
  )

  if (!hasChildren) return base

  return (
    <>
      {base}
      {/* Nested flyout: positions to the right of the parent item */}
      <div
        role="menu"
        className="invisible absolute left-full top-0 min-w-48 translate-x-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition duration-150 ease-out group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100 focus-within:visible focus-within:translate-x-0 focus-within:opacity-100"
      >
        <ul className="flex flex-col gap-1">
          {node.children!.map((child) => (
            <li key={child.id} className="relative group/sub">
              <DropdownItem node={child} level={level + 1} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
