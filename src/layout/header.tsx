import { Link, NavLink } from 'react-router'
import { TopLevelItem } from './components/top-level-item'
import ReactLogo from '../assets/react.svg'
import { MENU } from './menu-config'

export type MenuNode = {
  id: string
  label: string
  path?: string // optional for non-link headings
  children?: MenuNode[]
}

export function Header({ menu = MENU }: { menu?: MenuNode[] }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3 gap-4">
        <div className="flex gap-2">
          <Link to="/">
            <img src={ReactLogo} className="h-6 w-6" alt="React logo" />
          </Link>
          <NavLink to="/" className="text-xl font-bold tracking-tight">
            React 19
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            {menu.map((node) => (
              <li key={node.id} className="group relative">
                <TopLevelItem node={node} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile placeholder (optional) */}
        <div className="md:hidden text-sm text-slate-500">Menu</div>
      </div>
    </header>
  )
}
