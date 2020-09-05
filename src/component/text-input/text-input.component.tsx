import React, { useEffect, useRef } from 'react'

const TextInput = ({ index, addToList, onKeyDown }: any) => {
  const inputRef: any = useRef()
  const style = {
    width: '60px'
  }

  useEffect(() => {
    console.log(inputRef.current)
    addToList(index, inputRef)
  }, [])

  return (
    <input
      type="number"
      ref={inputRef}
      data-id={index}
      onKeyDown={onKeyDown}
      style={{...style}}
    />
  )
}

export { TextInput }
