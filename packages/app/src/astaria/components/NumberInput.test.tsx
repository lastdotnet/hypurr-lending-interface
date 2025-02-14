// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NumberInput } from '@/astaria/components/NumberInput'
import { NumberInputForTesting } from '@/astaria/components/NumberInputForTesting'

describe('NumberInput', () => {
  it('should handle 18 decimal places with a string input', async () => {
    const user = userEvent.setup()
    render(<NumberInput decimals={18} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '0.123456789123456789')

    expect(input.value).toBe('0.123456789123456789')
  })
  it('should show thousand separators', async () => {
    render(<NumberInput decimals={18} value={123456} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input.value).toBe('123,456')
  })
  it('should execute the onChange handler', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput decimals={18} onChange={onChange} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '0.100')

    expect(input.value).toBe('0.100')
    expect(onChange).toHaveBeenCalledWith(0.1)
  })
  it('should show a default value of 0', () => {
    render(<NumberInput decimals={18} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input.value).toBe('0')
  })
  it('should handle decimals', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput decimals={18} onChange={onChange} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '.12345')

    expect(input.value).toBe('.12345')
    expect(onChange).toHaveBeenCalledWith(0.12345)
  })
  it('should handle decimals with zeros after the decimal point', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput decimals={18} onChange={onChange} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '.00012345')

    expect(input.value).toBe('.00012345')
    expect(onChange).toHaveBeenCalledWith(0.00012345)
  })
  it('should handle decimals with zeros after the decimal point when wrapped in react-hook-form', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInputForTesting decimals={18} onChange={onChange} value={0} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '.00012345')

    expect(input.value).toBe('0.00012345')
    expect(onChange).toHaveBeenCalledWith(0.00012345)
  })
  it('should return undefined when cleared while showing nothing in the input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput decimals={18} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '1')
    await user.clear(input)

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(undefined)
  })
  it('should return undefined when cleared while showing nothing in the input when wrapped in react-hook-form with defaultValues', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInputForTesting decimals={18} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)
    await user.type(input, '1')
    await user.clear(input)

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(undefined)
  })
  it('should return undefined when contents are removed while showing nothing in the input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput decimals={18} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)

    await user.type(input, '1')
    await user.type(input, '{backspace}')

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(undefined)
  })
  it('should return undefined when contents are removed while showing nothing in the input when wrapped in react-hook-form with defaultValues', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInputForTesting decimals={18} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)

    await user.type(input, '1')
    await user.type(input, '{backspace}')

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(undefined)
  })
})
