import { useState, useTransition } from 'react'
import { startTransition } from 'react'

export async function updateQuantity(newQuantity: number) {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(newQuantity)
    }, 2000)
  })
}

export function Item({
  action
}: {
  action: (newQuantity: number) => Promise<void>
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // To expose an action prop, await the callback in startTransition.
    startTransition(async () => {
      await action(Number(event.target.value))
    })
  }
  return (
    <div className="item flex items-center justify-between">
      <span>Eras Tour Tickets</span>
      <div>
        <label htmlFor="name">Quantity: </label>
        <input
          type="number"
          onChange={handleChange}
          defaultValue={1}
          min={1}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  )
}

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export function Total({
  quantity,
  isPending
}: {
  quantity: number
  isPending: boolean
}) {
  return (
    <div className="total flex items-center justify-between">
      <span>Total:</span>
      <span>
        {isPending ? '🌀 Updating...' : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  )
}

export const Example3 = () => {
  const [quantity, setQuantity] = useState(1)
  const [isPending, startTransition] = useTransition()

  const updateQuantityAction = async (newQuantity: number) => {
    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity)
      startTransition(() => {
        setQuantity(savedQuantity as number)
      })
    })
  }

  return (
    <div className="mt-4">
      <h1>Checkout</h1>
      <Item action={updateQuantityAction} />
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  )
}
