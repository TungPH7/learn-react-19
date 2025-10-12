import { BrowserRouter, Route, Routes } from 'react-router'
import './global.css'
import { DefaultLayout } from './layout/default-layout'
import { UseLayoutEffectPage } from './pages/hooks/use-layout-effect'
import { RequestAnimationFramePage } from './pages/web-apis/request-animation-frame'
import { UseTransitionPage } from './pages/hooks/use-transition/use-transition'
import Home from './pages/home/home'
import ServerFunctions from './pages/react-server-components/server-functions'
import UseState from './pages/hooks/use-state'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="hooks/use-state"
          element={
            <DefaultLayout>
              <UseState />
            </DefaultLayout>
          }
        />
        <Route
          path="hooks/use-layout-effect"
          element={
            <DefaultLayout>
              <UseLayoutEffectPage />
            </DefaultLayout>
          }
        />
        <Route
          path="hooks/use-transition"
          element={
            <DefaultLayout>
              <UseTransitionPage />
            </DefaultLayout>
          }
        />

        <Route
          path="/web-api/request-animation-frame"
          element={
            <DefaultLayout>
              <RequestAnimationFramePage />
            </DefaultLayout>
          }
        />

        <Route
          path="/rsc/server-functions"
          element={
            <DefaultLayout>
              <ServerFunctions />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
