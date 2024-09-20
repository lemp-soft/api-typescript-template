import { UserCreateDTO, UserUpdateDTO, UserDTO } from '../dtos/User.dto'
export abstract class UserRepositoryInterface {
  abstract findAll (): Promise<UserDTO[]>
  abstract findById (id: number): Promise<UserDTO | null>
  abstract findByEmail (email: string): Promise<UserDTO | null>
  abstract create (data: UserCreateDTO): Promise<UserDTO>
  abstract update (id: number, data: UserUpdateDTO): Promise<UserDTO>
  abstract delete (id: number): Promise<boolean>
}
