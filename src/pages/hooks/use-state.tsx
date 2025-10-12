import { useEffect, useState } from 'react'

const Profile = ({
  user
}: {
  user: { name: string; age: number; bankAccount: { balance: number } }
}) => {
  useEffect(() => {
    console.log('user?.bankAccount?.balance', user?.bankAccount?.balance)
  }, [user])

  return (
    <div>
      <div>User in Profile Component: {user.name}</div>
      <div>User in Profile Component: {user.age}</div>
      <div>User in Profile Component: {user.bankAccount.balance}</div>
    </div>
  )
}

const UseState = () => {
  const [user, setUser] = useState({
    name: 'John',
    age: 20,
    bankAccount: { balance: 1000 }
  })

  return (
    <div className="flex gap-4">
      <div className="border-r">
        <div>
          setState và deps useEffect (so sánh địa chỉ vùng nhớ reference)
        </div>
        <div>
          shallow copy chỉ copy các thuộc tính ở cấp độ đầu tiên của object
        </div>
        <div>
          so sánh 2 object khác reference
          <div>+ dùng isEqual của lodash</div>
          <div>+ tự viết hàm (có đệ quy) để so sánh</div>
        </div>
      </div>

      <div className="flex-1">
        <br />
        <Profile user={user} />

        <button
          className="border"
          onClick={() => setUser({ ...user, age: user.age + 1 })}
        >
          Increment age
        </button>

        <button
          className="border"
          onClick={() =>
            setUser({
              ...user,
              bankAccount: {
                ...user.bankAccount,
                balance: user.bankAccount.balance + 1
              }
            })
          }
        >
          Increment balance
        </button>
      </div>
    </div>
  )
}

export default UseState
