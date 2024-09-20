/* eslint-disable @typescript-eslint/return-await */
import { UserCreateDTO, UserDTO, UserUpdateDTO } from '../../domain/dtos/User.dto'
import { UserRepositoryInterface } from '../../domain/repo/User.repository'
import prisma from '@/core/infra/config/PrismaConfig'
export class UserRepositoryImpl extends UserRepositoryInterface {
  async findAll (): Promise<UserDTO[]> {
    return await prisma.user.findMany()
  }

  async findById (id: number): Promise<UserDTO | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail (email: string): Promise<UserDTO | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create (data: UserCreateDTO): Promise<UserDTO> {
    return await prisma.user.create({ data })
  }

  async update (id: number, data: UserUpdateDTO): Promise<UserDTO> {
    return await prisma.user.update({ where: { id }, data })
  }

  async delete (id: number): Promise<boolean> {
    await prisma.user.delete({ where: { id } })
    return true
  }
}
