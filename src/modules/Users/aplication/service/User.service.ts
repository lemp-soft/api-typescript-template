import { UserCreateDTO, UserUpdateDTO, UserDTO } from '../../domain/dtos/User.dto'
import { UserRepositoryInterface } from '../../domain/repo/User.repository'
export class UserService {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async findAll (): Promise<UserDTO[]> {
    return await this.userRepository.findAll()
  }

  async findById (id: number): Promise<UserDTO | null> {
    return await this.userRepository.findById(id)
  }

  async findByEmail (email: string): Promise<UserDTO | null> {
    return await this.userRepository.findByEmail(email)
  }

  async create (data: UserCreateDTO): Promise<UserDTO> {
    return await this.userRepository.create(data)
  }

  async update (id: number, data: UserUpdateDTO): Promise<UserDTO> {
    return await this.userRepository.update(id, data)
  }

  async delete (id: number): Promise<boolean> {
    return await this.userRepository.delete(id)
  }
}
