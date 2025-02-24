import { type HTMLAttributes } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

import { Skeleton } from '@/astaria/components/Skeleton'

export const imageVariants = cva('', {
  defaultVariants: {
    cover: false,
    rounded: false,
  },
  variants: {
    cover: {
      true: 'aspect-square h-auto w-full border-solid object-cover object-center',
    },
    rounded: {
      false: '',
      full: 'rounded-full',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
  },
})

export interface ImageProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof imageVariants> {
  alt: string
  className?: string
  cover?: boolean
  height?: number
  rounded?: false | 'full' | 'md' | 'sm'
  skeleton?: boolean
  src?: string | null
  width?: number
}

export const Image = ({ alt, className, cover, height, rounded, skeleton, src, width, ...rest }: ImageProps) => {
  if (skeleton) {
    return (
      <Skeleton
        className={clsx(
          imageVariants({
            className,
            cover,
            rounded,
          }),
        )}
        rounded={rounded}
        {...rest}
      />
    )
  }

  if (!src) {
    return (
      <div
        className={clsx(
          'flex h-full w-full items-center justify-center border bg-background font-bold text-4xl',
          className,
        )}
        style={{ height, width }}
      >
        ?
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={clsx(
        'max-w-none',
        imageVariants({
          className,
          cover,
          rounded,
        }),
      )}
      height={height}
      src={src}
      width={width}
      {...rest}
    />
  )
}
