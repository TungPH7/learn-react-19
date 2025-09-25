import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const UseLayoutEffectPage = () => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const renderCountRef = useRef(0)

  useEffect(() => {
    // render ui: 4 và 0 liên tiếp (dẫn đến hiện tượng flicker số 4)
    // nguyên nhân: JS thực hiện heavy task (vòng lặp), browser sẽ trì hoãn việc repaint (số 4) screen.

    // Solution: split with setTimeout(0) alone (simple, usually enough
    // if (count > 3) {
    //   console.log('current count', count)
    //   setTimeout(() => {
    //     // heavy work after yielding to the event loop
    //     for (let i = 0; i < 10_000; i++) {}
    //     setCount(0)
    //   }, 0)
    // }

    if (count > 3) {
      console.log('current count', count)
      for (let i = 0; i < 10_000; i++) {
        console.log('i', i)
      }
      setCount(0)
    }

    return () => {
      console.log('prev count', count)
    }
  }, [count])

  useLayoutEffect(() => {
    if (count2 > 3) {
      console.log('current count2', count2)
      for (let i = 0; i < 10_000; i++) {
        console.log('i', i)
      }
      setCount2(0)
    }

    return () => {
      console.log('prev count2', count2)
    }
  }, [count2])

  const handleClick = () => {
    setCount(count + 1)
  }

  const handleClick2 = () => {
    setCount2(count2 + 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  const handleReset2 = () => {
    setCount2(0)
  }

  console.log('render', ++renderCountRef.current)

  return (
    <div className="flex gap-4">
      <div>
        <h1 className="text-2xl font-bold">UseLayoutEffectPage</h1>
        <br />
        <b>useEffect</b>
        <p>1. Cập nhật lại state</p>
        <p>2. Cập nhật DOM (mutated)</p>
        <p>3. Render lại UI</p>
        <p>4. Gọi cleanup nếu deps thay đối</p>
        <p>5. Gọi useEffect callback</p>
        <br />

        <b>useLayoutEffect</b>
        <p>1. Cập nhật lại state</p>
        <p>2. Cập nhật DOM (mutated)</p>
        <p>3. Gọi cleanup nếu deps thay đổi (sync)</p>
        <p>4. Gọi useLayoutEffect callback (sync)</p>
        <p>5. Render lại UI</p>
      </div>
      <div className="w-[1px] bg-black"></div>
      <div>
        <p className="text-2xl font-bold">useEffect Count: {count}</p>
        <button
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
          onClick={handleClick}
        >
          Increment
        </button>
        <button
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div>
        <p className="text-2xl font-bold">useLayoutEffect Count: {count2}</p>
        <button
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
          onClick={handleClick2}
        >
          Increment
        </button>
        <button
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
          onClick={handleReset2}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
