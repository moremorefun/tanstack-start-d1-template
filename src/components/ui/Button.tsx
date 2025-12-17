import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: ReactNode
}

/**
 * Button Component
 *
 * A flexible button component with multiple variants and sizes.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" asChild><a href="/link">Link</a></Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',

        // Variants
        {
          // Primary
          'bg-brand-primary hover:bg-brand-primary-light focus:ring-brand-primary text-white':
            variant === 'primary',
          // Secondary
          'bg-brand-secondary focus:ring-brand-secondary text-white hover:opacity-90':
            variant === 'secondary',
          // Outline
          'border-brand-primary text-brand-primary hover:bg-brand-primary focus:ring-brand-primary border-2 hover:text-white':
            variant === 'outline',
          // Ghost
          'text-gray-700 hover:bg-gray-100 focus:ring-gray-300': variant === 'ghost',
          // Destructive
          'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500': variant === 'destructive',
        },

        // Sizes
        {
          'h-8 rounded-md px-3 text-sm': size === 'sm',
          'h-10 rounded-lg px-4 text-sm': size === 'md',
          'h-12 rounded-lg px-6 text-base': size === 'lg',
        },

        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  )
}
