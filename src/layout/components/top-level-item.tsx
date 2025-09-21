import type { MenuNode } from '../header'
import { DropdownItem } from './dropdown-item'
import { MenuLink } from './menulink'

export function TopLevelItem({ node }: { node: MenuNode }) {
  const hasChildren = node.children && node.children.length > 0

  const baseLink = (
    <MenuLink
      to={node.path}
      className="px-3 py-2 text-sm font-medium rounded-xl hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
      label={node.label}
    />
  )

  if (!hasChildren) return baseLink

  return (
    <>
      <button
        type="button"
        className="px-3 py-2 text-sm font-medium rounded-xl hover:bg-slate-100 focus:bg-slate-100 focus:outline-none aria-expanded:rounded-b-none"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        {node.label}
      </button>

      {/* First level dropdown */}
      <div
        role="menu"
        className="invisible absolute left-0 top-full min-w-48 translate-y-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 focus-within:visible focus-within:translate-y-0 focus-within:opacity-100"
      >
        <ul className="flex flex-col gap-1">
          {node.children!.map((child) => (
            <li key={child.id} className="relative group/sub">
              <DropdownItem node={child} level={1} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
