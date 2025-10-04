import React, { useMemo, useState, useTransition } from 'react'

const DATA = Array.from({ length: 20000 }, (_, i) => `Item ${i}`)

function heavyWork(ms: number) {
  const end = performance.now() + ms
  while (performance.now() < end) {}
}

export default function Search_WithTransition() {
  const [query, setQuery] = useState('')
  const [filterKey, setFilterKey] = useState('')
  const [isPending, startTransition] = useTransition()

  console.log('query --', query)
  console.log('filterKey --', filterKey)
  console.log('isPending --', isPending)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setQuery(v) // urgent: input mượt
    // chỉ schedule state ưu tiên thấp, KHÔNG làm việc nặng tại đây
    startTransition(() => {
      console.log('===========================')
      console.log('startTransition --')
      setFilterKey(() => {
        console.log('setstate...', v)
        return v
      })
    })
  }

  // Tính nặng chuyển sang pha render của cập nhật ưu tiên thấp
  const filtered = useMemo(() => {
    console.log('useMemo --')

    // (giả lập nặng) — nếu thực tế quá nặng, xem Cách 3 bên dưới
    const list = DATA.filter((x) => x.includes(filterKey))
    heavyWork(200)
    return list
  }, [filterKey])

  return (
    <div>
      <h3>✅ Transition đúng cách (không tính nặng trong handler)</h3>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Type..."
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      {isPending && <p>⏳ Đang cập nhật...</p>}
      <ul style={{ maxHeight: 320, overflow: 'auto' }}>
        {filtered.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
