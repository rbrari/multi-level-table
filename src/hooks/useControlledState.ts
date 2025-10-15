import { useCallback, useState } from 'react'

export function useControlledState<T>(
  controlledValue: T | undefined,
  onChange: ((value: T) => void) | undefined,
  defaultValue: T,
): [T, (updaterOrValue: T | ((old: T) => T)) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const setValue = useCallback(
    (updaterOrValue: T | ((old: T) => T)) => {
      const newValue =
        typeof updaterOrValue === 'function'
          ? (updaterOrValue as (old: T) => T)(currentValue)
          : updaterOrValue

      if (isControlled && onChange) {
        onChange(newValue)
      } else {
        setInternalValue(newValue)
      }
    },
    [isControlled, onChange, currentValue],
  )

  return [currentValue, setValue]
}
