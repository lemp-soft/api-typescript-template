import { User } from '../entitys/User.entity'
import { z } from 'zod'
export type UserCreateDTO = Omit<User, 'id'>
export const UserCreateSchemaDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})
export type UserUpdateDTO = Partial<Omit<User, 'id'>>
export const UserUpdateSchemaDTO = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional()
})
export type UserNotSensitiveDTO = Omit<User, 'password'>
export type UserDTO = User
