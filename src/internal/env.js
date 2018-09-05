export const isProd = !!(
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV === 'production'
)

export const isDev = !isProd
