import { ETHER_DECIMALS } from 'common'
import { describe, expect, it } from 'vitest'

import { formatPercent } from '@/astaria/utils/formatPercent'

describe('formatPercent', () => {
  describe('number', () => {
    it('should have 1 equal to 100%', () => {
      const percent = 1
      expect(formatPercent({ percent })).toEqual({
        content: '100%',
        trigger: '100%',
      })
    })
    it('should handle 0%', () => {
      const percent = 0
      expect(formatPercent({ percent })).toEqual({
        content: '0%',
        trigger: '0%',
      })
    })
    it('should handle a decimal', () => {
      const percent = 1.23
      expect(formatPercent({ percent })).toEqual({
        content: '123%',
        trigger: '123%',
      })
    })
    it('should add commas', () => {
      const percent = 1234.56789
      expect(formatPercent({ percent })).toEqual({
        content: '123,456.79%',
        trigger: '123,456.79%',
      })
    })
    it('should handle 0.00001%', () => {
      const percent = 0.00001
      expect(formatPercent({ percent })).toEqual({
        content: '<0.01%',
        trigger: '<0.01%',
      })
    })
    it('should handle 0.01%', () => {
      const percent = 0.000123456789012
      expect(formatPercent({ percent })).toEqual({
        content: '0.01%',
        trigger: '0.01%',
      })
    })
    it('should handle 0.1%', () => {
      const percent = 0.001234
      expect(formatPercent({ percent })).toEqual({
        content: '0.12%',
        trigger: '0.12%',
      })
    })
    it('should handle 0.99%', () => {
      const percent = 0.00999999
      expect(formatPercent({ percent })).toEqual({
        content: '1%',
        trigger: '1%',
      })
    })
    it('should handle 1%', () => {
      const percent = 0.012345678901234
      expect(formatPercent({ percent })).toEqual({
        content: '1.23%',
        trigger: '1.23%',
      })
    })
    it('should handle 5%', () => {
      const percent = 0.054567891234567
      expect(formatPercent({ percent })).toEqual({
        content: '5.46%',
        trigger: '5.46%',
      })
    })
    it('should handle 100%', () => {
      const percent = 1.008956789123456
      expect(formatPercent({ percent })).toEqual({
        content: '100.9%',
        trigger: '100.9%',
      })
    })
    it('should handle 133%', () => {
      const percent = 1.339956789123456
      expect(formatPercent({ percent })).toEqual({
        content: '134%',
        trigger: '134%',
      })
    })
  })
  describe('bigint', () => {
    it('should have 1e17 equal to 10%', () => {
      const percent = 100000000000000000n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '10%',
        trigger: '10%',
      })
    })
    it('should have 1e18 equal to 100%', () => {
      const percent = 1000000000000000000n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '100%',
        trigger: '100%',
      })
    })
    it('should handle 0%', () => {
      const percent = 0n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '0%',
        trigger: '0%',
      })
    })
    it('should add commas', () => {
      const percent = 12345678900000000000n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '1,234.57%',
        trigger: '1,234.57%',
      })
    })
    it('should handle 0.00001%', () => {
      const percent = 123456789012n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '<0.01%',
        trigger: '<0.01%',
      })
    })
    it('should handle 0.01%', () => {
      const percent = 123456789012345n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '0.01%',
        trigger: '0.01%',
      })
    })
    it('should handle 0.1%', () => {
      const percent = 1234000000000000n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '0.12%',
        trigger: '0.12%',
      })
    })
    it('should handle 0.99%', () => {
      const percent = 9999990000000000n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '1%',
        trigger: '1%',
      })
    })
    it('should handle 1%', () => {
      const percent = 12345678901234567n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '1.23%',
        trigger: '1.23%',
      })
    })
    it('should handle 5%', () => {
      const percent = 54567891234567890n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '5.46%',
        trigger: '5.46%',
      })
    })
    it('should handle 100%', () => {
      const percent = 1008956789123456789n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '100.9%',
        trigger: '100.9%',
      })
    })
    it('should handle 133%', () => {
      const percent = 1339956789123456789n
      expect(formatPercent({ decimals: ETHER_DECIMALS, percent })).toEqual({
        content: '134%',
        trigger: '134%',
      })
    })
    it('should display dash for 0 if configured', () => {
      const percent = 0n
      expect(
        formatPercent({
          decimals: ETHER_DECIMALS,
          percent,
          useDashForZero: true,
        }),
      ).toEqual({
        content: '—%',
        trigger: '—%',
      })
    })
  })
})
