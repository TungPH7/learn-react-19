import React from 'react'
import { Header } from './header'

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
