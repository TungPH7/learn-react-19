import { useRef, useState, useEffect } from 'react'

// requestAnimationFrame: yêu cầu browser gọi callback function trước khi browser vẽ lại màn hình cho lần tiếp theo, đồng bộ với nhịp vẽ của trình duyệt, đồng bộ tần số quét của màn hình => Mượt mà
// setTimeout và setInterval: không đồng bộ với nhịp vẽ của trình duyệt, set 1 giá trị cố định => dễ gây giật.

export const RequestAnimationFramePage = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [isRunning, setIsRunning] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const requestIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) return

    const step = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      // progress / 2000: là tỷ lệ phần trăm thời gian đã chạy
      // progress / 2000 * 400: Nhân tỷ lệ đó với 400px để ra vị trí hiện tại
      const distance = Math.min((progress / 2000) * 400, 400)

      if (boxRef.current) {
        boxRef.current.style.left = distance + 'px'
      }

      if (distance < 400) {
        requestIdRef.current = requestAnimationFrame(step)
      } else {
        setIsRunning(false) // animation xong
      }
    }

    requestIdRef.current = requestAnimationFrame(step)

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
      }
    }
  }, [isRunning])

  const startAnimation = () => {
    // reset lại
    if (boxRef.current) {
      boxRef.current.style.left = '0px'
    }
    startTimeRef.current = null
    setIsRunning(true)
  }

  return (
    <div style={{ position: 'relative', height: '100px' }}>
      <button onClick={startAnimation}>Chạy animation</button>
      <div
        ref={boxRef}
        style={{
          width: '50px',
          height: '50px',
          background: 'limegreen',
          position: 'absolute',
          left: 0,
          top: '50px'
        }}
      />
    </div>
  )
}
