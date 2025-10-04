import { Example1 } from './components/example-1'
import { Example2 } from './components/example-2'
import { Example3 } from './components/example-3'
import Example4 from './components/example-4'
import Example5 from './components/example-5'

export const UseTransitionPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">UseTransitionPage</h1>
      <p className="font-semibold">Example 1: Search with large list</p>
      <Example1 />
      <br />
      <hr />
      <p className="font-semibold">
        Example 2: Search with large list (using Debounce and Skeleton UI)
      </p>
      <Example2 />
      <br />
      <hr />
      <p className="font-semibold">
        Example 3: Updating the quantity in an Action
      </p>
      <Example3 />
      <br />
      <hr />
      <p className="font-semibold">Example 4.1: Search_NoTransition</p>
      <Example4 />
      <br />
      <hr />
      <p className="font-semibold">
        Example 5: Search_WithTransition - useTransition comes to save the day
      </p>
      <Example5 />
      <br />
      <hr />
    </div>
  )
}
