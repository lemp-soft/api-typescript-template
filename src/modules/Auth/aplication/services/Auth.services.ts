import { UserToAuthAdapter } from '@/modules/Users/aplication/adapters/UserToAuth.adapter'
import { UserRepositoryInterface } from '@/modules/Users/domain/repo/User.repository'
import { UserCreateDTO, UserDTO } from '@/modules/Users/domain/dtos/User.dto'
import bcrypt from 'bcryptjs'
import { BCRYPT_SALT_ROUNDS } from '@/core/infra/config/constans'
export class AuthService {
  private readonly userToAuthAdapter: UserToAuthAdapter
  constructor (private readonly userRepository: UserRepositoryInterface) {
    this.userToAuthAdapter = new UserToAuthAdapter(this.userRepository)
  }

  async Register (data: UserCreateDTO): Promise<UserDTO> {
    const user = await this.userToAuthAdapter.findByEmail(data.email)
    if (user != null) {
      throw new Error('User already exists')
    }
    const password = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
    return await this.userToAuthAdapter.create({ ...data, password })
  }

  async Login (email: string, password: string): Promise<UserDTO | null> {
    const user = await this.userToAuthAdapter.findByEmail(email)
    if (user == null) {
      return null
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return null
    }
    return user
  }

  async FindById (id: number): Promise<UserDTO | null> {
    return await this.userToAuthAdapter.findById(id)
  }
}
