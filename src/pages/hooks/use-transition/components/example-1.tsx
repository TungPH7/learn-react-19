import { useEffect, useRef, useState, useTransition } from 'react'

export const Example1 = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<
    { id: number; name: string; price: number }[]
  >([])
  const [isPending, startTransition] = useTransition()
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!query) {
      // clear nhanh khi xoá query
      startTransition(() => setResults([]))
      return
    }

    // Hủy request trước đó nếu còn đang chạy
    if (abortRef.current) (abortRef.current as AbortController).abort()
    const controller = new AbortController()
    abortRef.current = controller

    // Giả lập API chậm bằng endpoint công khai (hoặc thay bằng API của bạn)
    // Ở đây thêm delay phía server (nếu có) → hoặc bạn có thể setTimeout để demo.
    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
      {
        signal: controller.signal
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Xử lý nặng (ví dụ sort/filter/normalize) + set state
        // Đánh dấu là non-urgent để input không lag
        startTransition(() => {
          const normalized = (data?.products ?? [])
            .map((p) => ({ id: p.id, name: p.title, price: p.price }))
            .sort((a, b) => a.name.localeCompare(b.name)) // ví dụ sort tốn thời gian

          setResults(normalized)
        })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err)
          startTransition(() => setResults([]))
        }
      })

    // Cleanup: hủy nếu query đổi nhanh hoặc unmount
    return () => controller.abort()
  }, [query])

  return (
    <div
      style={{ maxWidth: 560, margin: '24px auto', fontFamily: 'sans-serif' }}
    >
      <h2>Tìm sản phẩm (demo useTransition)</h2>

      <input
        value={query}
        onChange={(e) => {
          // Urgent update: phản hồi input ngay
          setQuery(e.target.value)
        }}
        placeholder="Nhập từ khoá (vd: phone, laptop, ...)"
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          border: '1px solid #ccc'
        }}
      />

      {/* Phần trạng thái kết quả (non-urgent) */}
      {isPending && (
        <p style={{ opacity: 0.7, marginTop: 12 }}>
          Đang tải & xử lý kết quả...
        </p>
      )}

      <ul style={{ marginTop: 12 }}>
        {results.map((r) => (
          <li
            key={r.id}
            style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}
          >
            <strong>{r.name}</strong> — ${r.price}
          </li>
        ))}
      </ul>

      {!isPending && query && results.length === 0 && <p>Không có kết quả.</p>}
    </div>
  )
}
