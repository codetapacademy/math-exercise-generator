import React, { FC } from 'react'

type ButtonType = {
  label: string;
  onClick(): void;
  disabled?: boolean;
  forwardedRef?: any;
}

const Button: FC<ButtonType> = ({ label, onClick, disabled, forwardedRef }: ButtonType ): any => {
  return (
    <button
      tabIndex={0}
      ref={forwardedRef}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export { Button }
