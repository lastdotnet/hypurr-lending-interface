import Image from 'next/image';

import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

import { type ERC20Asset, getERC20TokenByAddress } from 'assets';

const NO_IMAGE_CHARACTERS_OF_SYMBOL_TO_SHOW = 2;

export const sizeVariants = cva('shrink-0', {
  variants: {
    size: {
      lg: 'h-28 w-28 max-w-28',
      md: 'h-8 w-8 max-w-8',
      sm: 'h-5 w-5 max-w-5',
      xl: 'h-48 w-48 max-w-48',
    },
  },
});

const SIZES = {
  lg: 112,
  md: 32,
  sm: 20,
  xl: 192,
};

export const ERC20Image = ({
  className,
  erc20,
  priority,
  size = 'md',
  skeleton,
  ...rest
}: {
  className?: string;
  erc20: ERC20Asset | ERC20Asset | undefined;
  priority?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xl';
  skeleton?: boolean;
}) => {
  if (skeleton) {
    return (
      <div
        className={clsx(
          'animate-pulse bg-muted',
          sizeVariants({ className, size })
        )}
        {...rest}
      />
    );
  }
  if (!erc20) {
    return null;
  }

  const erc20Token = getERC20TokenByAddress({
    address: erc20.address,
  });

  if (!erc20Token) {
    return null;
  }

  const { logoURI, symbol } = erc20Token;

  if (!logoURI) {
    return (
      <div
        aria-hidden
        className={clsx(
          'flex select-none items-center justify-center rounded-full bg-muted font-bold text-foreground',
          sizeVariants({ className, size })
        )}
        {...rest}
      >
        {logoURI === null && symbol
          ? symbol
              .toUpperCase()
              .substring(0, NO_IMAGE_CHARACTERS_OF_SYMBOL_TO_SHOW)
          : '?'}
      </div>
    );
  }

  return (
    <Image
      alt={symbol}
      className={clsx(sizeVariants({ className, size }))}
      height={SIZES[size]}
      priority={priority}
      src={logoURI}
      width={SIZES[size]}
      {...rest}
    />
  );
};
