import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with clsx
 *
 * Combines clsx for conditional classes with tailwind-merge
 * to handle conflicting Tailwind classes properly.
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('bg-red-500', condition && 'bg-blue-500') // conditional class
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
