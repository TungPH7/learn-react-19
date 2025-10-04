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
      },
      {
        id: 'use-useTransition',
        label: 'useTransition',
        path: '/hooks/use-transition'
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

// ======== React 16.8 ========
// useState
// useReducer

// useContext

// useRef
// useImperativeHandle

// useEffect
// useLayoutEffect

// useCallback
// useMemo

// useDebugValue

// ======== React 18 ========
// useTransition
// useDeferredValue

// useInsertionEffect
// useId
// useSyncExternalStore

// ======== React 19 ========
// useOptimistic
// useActionState
