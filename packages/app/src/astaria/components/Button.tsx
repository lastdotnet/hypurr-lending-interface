import { Slot } from '@radix-ui/react-slot';
import { IconLoader2 } from '@tabler/icons-react';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

export const buttonVariants = cva(
  'inline-flex items-center border text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
  {
    defaultVariants: {
      emphasis: 'high',
      fullWidth: false,
      isInMobileNavigation: false,
      noUppercase: false,
      rounded: 'sm',
      size: 'md',
    },
    variants: {
      disabledWithTooltip: {
        false: 'disabled:pointer-events-none',
      },
      emphasis: {
        fakeInput: 'bg-background text-primary',
        high: 'bg-primary tracking-widest text-primary-foreground hover:bg-background hover:text-primary',
        low: 'border-transparent text-primary hover:border-primary',
        medium:
          'bg-background text-primary hover:bg-primary hover:text-primary-foreground',
      },
      fullWidth: {
        true: 'w-full',
      },
      isInMobileNavigation: {
        false: 'justify-center focus-visible:ring-offset-2',
        true: 'flex-start',
      },
      noUppercase: {
        false: 'uppercase',
      },
      rounded: {
        dialog: 'rounded-bl-sm rounded-br-sm',
        false: '',
        sm: 'rounded-sm',
      },
      size: {
        icon: 'h-11 w-11',
        'icon-xs':
          'after:-l-3 after:-r-3 relative h-8 w-8 after:absolute after:top-1/2 after:h-full after:min-h-11 after:min-w-11 after:-translate-y-1/2 after:content-[""]',
        lg: 'h-13 min-w-11 gap-2 px-8',
        md: 'h-11 min-w-11 gap-2 px-5',
        'md-narrow': 'h-11 min-w-11 gap-0.5 px-2',
        xs: 'after:-l-3 after:-r-3 relative h-8 min-w-8 gap-0.5 px-2 after:absolute after:top-1/2 after:h-full after:min-h-11 after:min-w-11 after:-translate-y-1/2 after:content-[""]',
      },
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: ReactNode;
  loading?: boolean;
  noUppercase?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled,
      disabledWithTooltip,
      emphasis,
      fullWidth,
      isInMobileNavigation,
      loading,
      noUppercase,
      rounded,
      size,
      type,
      ...rest
    },
    ref
  ) => {
    const getType = () => {
      if (type) {
        return type;
      }
      if (asChild) {
        return undefined;
      }
      return 'button';
    };

    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={clsx(
          buttonVariants({
            className,
            emphasis,
            fullWidth,
            isInMobileNavigation,
            noUppercase,
            rounded,
            size,
          })
        )}
        disabled={disabled || disabledWithTooltip || loading}
        type={getType()}
        {...rest}
      >
        {loading ? (
          <>
            {children}
            <IconLoader2 className="h-5 w-5 animate-spin" />
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';
