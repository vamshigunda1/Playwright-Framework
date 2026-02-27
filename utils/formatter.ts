// utility to format strings or data used in tests
export const formatter = {
  timestamp: (): string => new Date().toISOString().replace(/[:.]/g, '-')
};