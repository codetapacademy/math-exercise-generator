import React, { FC } from 'react'

type ButtonType = {
  label: string;
  onClick(): void;
  disabled?: boolean;
}

const Button: FC<ButtonType> = ({ label, onClick, disabled }: ButtonType ): any => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export { Button }
