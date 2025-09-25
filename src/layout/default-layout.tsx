import React from 'react'
import { Header } from './header'

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
    </div>
  )
}
