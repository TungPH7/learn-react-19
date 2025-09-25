import { BrowserRouter, Route, Routes } from 'react-router'
import './global.css'
import { DefaultLayout } from './layout/default-layout'
import { UseLayoutEffectPage } from './pages/hooks/use-layout-effect'
import { RequestAnimationFramePage } from './pages/web-apis/request-animation-frame'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <div>Home page</div>
            </DefaultLayout>
          }
        />
        <Route
          path="hooks/use-state"
          element={
            <DefaultLayout>
              <div>useState page</div>
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
          path="/web-api/request-animation-frame"
          element={
            <DefaultLayout>
              <RequestAnimationFramePage />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
