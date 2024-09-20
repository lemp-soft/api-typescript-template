export const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) ?? 8
export const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'
