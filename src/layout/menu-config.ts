import type { MenuNode } from './header'

export const MENU: MenuNode[] = [
  {
    id: 'hooks',
    label: 'Hooks',
    children: [
      {
        id: 'use-state',
        label: 'useState',
        path: '/hooks/use-state'
      },
      {
        id: 'use-effect',
        label: 'useEffect',
        path: '/hooks/use-effect'
      }
    ]
  }
]
