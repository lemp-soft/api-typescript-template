import { UserCreateDTO, UserDTO } from '@/modules/Users/domain/dtos/User.dto'
import { UserRepositoryInterface } from '@/modules/Users/domain/repo/User.repository'
import { UserService } from '@/modules/Users/aplication/service/User.service'
export class UserToAuthAdapter {
  private readonly userService: UserService
  constructor (private readonly userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
    this.userService = new UserService(this.userRepository)
  }

  async create (data: UserCreateDTO): Promise<UserDTO> {
    return await this.userService.create(data)
  }

  async findByEmail (email: string): Promise<UserDTO | null> {
    return await this.userService.findByEmail(email)
  }

  async findById (id: number): Promise<UserDTO | null> {
    return await this.userService.findById(id)
  }
}
