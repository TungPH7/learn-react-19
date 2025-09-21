import { BrowserRouter, Route, Routes } from 'react-router'
import './global.css'
import { DefaultLayout } from './layout/default-layout'

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
          path="hooks/use-effect"
          element={
            <DefaultLayout>
              <div>useEffect page</div>
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
