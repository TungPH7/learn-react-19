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
        id: 'use-layout-effect',
        label: 'useLayoutEffect',
        path: '/hooks/use-layout-effect'
      }
    ]
  },
  {
    id: 'web-api',
    label: 'Web APIs',
    children: [
      {
        id: 'request-animation-frame',
        label: 'requestAnimationFrame',
        path: '/web-api/request-animation-frame'
      }
    ]
  }
]

// useState
// useReducer

// useContext

// useRef
// useImperativeHandle

// useEffect
// useLayoutEffect
// useInsertionEffect

// useCallback
// useMemo

// useTransition
// useDeferredValue
// useActionState
// useOptimistic

// useDebugValue
// useId
// useSyncExternalStore
