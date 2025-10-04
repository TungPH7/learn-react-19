Rõ rồi 👍 mình sẽ tóm tắt đầy đủ phần lý thuyết của **`useTransition`** bằng gạch đầu dòng, sau đó đưa ví dụ thực tế dễ hiểu.

---

## 📘 Lý thuyết `useTransition`

- **Mục đích**: giúp bạn đánh dấu **một số update state** là _“không gấp”_ (non-urgent).
  → React có thể **ưu tiên render các update quan trọng trước** (ví dụ input đang gõ) và xử lý phần còn lại sau.

- **Cách dùng**:

  ```js
  const [isPending, startTransition] = useTransition()
  ```

  - `startTransition(callback)` → gọi mọi update state bên trong callback là **non-urgent**.
  - `isPending` (boolean) → cho biết transition đó đang chạy (UI đang “pending” để update).

- **Khi nào dùng**:
  - Khi có **hai loại update state**:
    1. **Gấp/urgent**: phản hồi ngay (nhập text, click nút).
    2. **Không gấp/non-urgent**: render danh sách lớn, filter, fetch dữ liệu.

  - Giúp UI mượt mà, không bị lag khi user tương tác.

- **Đặc điểm quan trọng**:
  - Không hoãn lại event handler → event chạy ngay, chỉ hoãn update state bên trong `startTransition`.
  - Nếu người dùng tiếp tục thao tác, transition trước có thể bị **bỏ qua** (React bỏ render cũ để render cái mới).
  - `isPending` thường dùng để hiển thị loading spinner hoặc skeleton UI.

---

## 🟢 Ví dụ thực tế: Search với danh sách lớn

### Code

```jsx
import { useState, useTransition } from 'react'

const ITEMS = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState(ITEMS)
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value) // urgent update (input phản hồi ngay)

    startTransition(() => {
      // non-urgent update (lọc danh sách lớn)
      const filtered = ITEMS.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      setList(filtered)
    })
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={handleChange}
      />
      {isPending && <p>Đang lọc dữ liệu...</p>}
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 🔍 Giải thích

- Khi nhập vào ô search:
  - `setQuery(value)` update ngay → input phản hồi tức thì.
  - `setList(filtered)` nằm trong `startTransition` → React coi là update _không gấp_, render sau khi input đã hiển thị xong.

- Nếu danh sách 10.000 items rất nặng, UI vẫn không bị đứng.
- `isPending` cho biết filter đang chạy → hiển thị text “Đang lọc dữ liệu…”.

---

👉 Bạn có muốn mình làm thêm **ví dụ fetch API chậm** với `useTransition` (ví dụ search từ server, loading spinner rõ ràng hơn) để thấy sự khác biệt không?
