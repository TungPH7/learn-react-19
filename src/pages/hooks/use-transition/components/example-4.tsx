import React, { useMemo, useState } from 'react'

const DATA = Array.from({ length: 20000 }, (_, i) => `Item ${i}`)

function heavyWork(ms: number) {
  const end = performance.now() + ms
  while (performance.now() < end) {} // chặn main thread
}

export default function Search_NoTransition() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState(DATA)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value) // (1) urgent update cho input

    // ❌ VẤN ĐỀ NẰM Ở ĐÂY:
    //    Tác vụ nặng (lọc + heavyWork) chạy NGAY tại cùng độ ưu tiên với input,
    //    chặn main thread khiến con trỏ gõ bị lag.
    const filtered = DATA.filter((x) => x.includes(value)) // (2a) lọc nhiều phần tử
    heavyWork(200) // (2b) mô phỏng tính toán nặng ~200ms
    setList(filtered) // (3) cập nhật list (commit nặng)
  }

  // Render list cũng nặng
  const rendered = useMemo(() => list.map((x) => <li key={x}>{x}</li>), [list])

  return (
    <div style={{ padding: 16 }}>
      <h3>❌ Không dùng useTransition</h3>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <ul
        style={{ maxHeight: 320, overflow: 'auto', border: '1px solid #eee' }}
      >
        {rendered}
      </ul>
    </div>
  )
}
