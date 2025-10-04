import { useEffect, useRef, useState, useTransition } from 'react'
import { useDebouncedValue } from '../../../../custom-hooks/use-debounced-value'

function SkeletonItem() {
  return (
    <li
      aria-hidden="true"
      style={{
        height: 18,
        margin: '10px 0',
        background: 'linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)',
        backgroundSize: '400% 100%',
        animation: 'skeleton 1.2s ease-in-out infinite',
        borderRadius: 6
      }}
    />
  )
}

export const Example2 = () => {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 500) // ⏱️ debounce
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()
  const abortRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false) // loading network

  useEffect(() => {
    if (!debounced) {
      startTransition(() => setResults([]))
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(debounced)}`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((data) => {
        // xử lý nặng + set state dưới dạng non-urgent
        startTransition(() => {
          const normalized = (data?.products ?? [])
            .map((p) => ({ id: p.id, name: p.title, price: p.price }))
            .sort((a, b) => a.name.localeCompare(b.name))
          setResults(normalized)
        })
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          console.error(e)
          startTransition(() => setResults([]))
        }
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [debounced])

  const showSkeleton = isLoading || isPending

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '24px auto',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <style>
        {`@keyframes skeleton {
            0% { background-position: 100% 50% }
            100% { background-position: 0 50% }
          }`}
      </style>

      <h2>Tìm sản phẩm (useTransition + debounce + skeleton)</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)} // urgent update
        placeholder="Nhập từ khoá (vd: phone, laptop, ...)"
        aria-label="Ô tìm kiếm sản phẩm"
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: '1px solid #ddd',
          outline: 'none'
        }}
      />

      {showSkeleton && (
        <p style={{ opacity: 0.7, marginTop: 10 }}>Đang tải & xử lý kết quả…</p>
      )}

      <ul style={{ marginTop: 12, padding: 0, listStyle: 'none' }}>
        {showSkeleton
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonItem key={i} />)
          : results.map((r) => (
              <li
                key={r.id}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <strong>{r.name}</strong>
                <span>${r.price}</span>
              </li>
            ))}
      </ul>

      {!showSkeleton && debounced && results.length === 0 && (
        <p role="status" aria-live="polite">
          Không có kết quả.
        </p>
      )}
    </div>
  )
}
