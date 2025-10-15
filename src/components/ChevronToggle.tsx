import { ChevronDown, ChevronRight } from 'lucide-react'

interface ChevronToggleProps {
  isExpanded: boolean
  size?: number
}

export const ChevronToggle = ({ isExpanded, size = 16 }: Readonly<ChevronToggleProps>) => {
  const Icon = isExpanded ? ChevronDown : ChevronRight
  return <Icon size={size} />
}
