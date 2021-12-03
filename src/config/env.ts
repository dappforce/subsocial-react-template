export const nodeEnv = getEnv('NODE_ENV')

export const isProdMode = nodeEnv === 'production'
export const isDevMode = !isProdMode

function getEnv (varName: string): string | undefined {
  const env = process.env
  return env[varName]
}
