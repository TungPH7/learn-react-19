import { NavLink } from 'react-router'

export function MenuLink({
  to,
  label,
  className,
  trailing
}: {
  to?: string
  label: string
  className?: string
  trailing?: React.ReactNode
}) {
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            className,
            'block whitespace-nowrap',
            isActive ? 'bg-slate-900 text-white hover:bg-slate-900' : ''
          ]
            .filter(Boolean)
            .join(' ')
        }
      >
        <span className="flex items-center justify-between gap-3">
          {label}
          {trailing}
        </span>
      </NavLink>
    )
  }

  return (
    <span
      className={['block whitespace-nowrap', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
      {trailing}
    </span>
  )
}
