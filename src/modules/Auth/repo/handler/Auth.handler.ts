import { Request, Response } from 'express'
import { UserRepositoryInterface } from '@/modules/Users/domain/repo/User.repository'
import { AuthService } from '../../aplication/services/Auth.services'
import { UserRepositoryImpl } from '@/modules/Users/aplication/repo/UserImpl.repository'
import { UserCreateSchemaDTO, UserUpdateSchemaDTO } from '@/modules/Users/domain/dtos/User.dto'
import { JWT_SECRET } from '@/core/infra/config/constans'
import jwt from 'jsonwebtoken'
export class AuthHandler {
  private readonly userRepository: UserRepositoryInterface
  private readonly authService: AuthService
  constructor () {
    this.userRepository = new UserRepositoryImpl()
    this.authService = new AuthService(this.userRepository)
  }

  // retorna un refresh token y un access token
  async Register (req: Request, res: Response): Promise<Response> {
    try {
      UserCreateSchemaDTO.parse(req.body)
      const user = await this.authService.Register(req.body)
      const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' })
      return res.status(201).json({ refreshToken, accessToken })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async Login (req: Request, res: Response): Promise<Response> {
    try {
      UserUpdateSchemaDTO.parse(req.body)
      const user = await this.authService.Login(req.body.email, req.body.password)
      if (user == null) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' })
      return res.status(200).json({ refreshToken, accessToken })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async RefreshToken (req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = req.body.refreshToken
      if (refreshToken == null) {
        return res.status(401).json({ error: 'Invalid token' })
      }
      return jwt.verify(refreshToken, JWT_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
        if (err != null) {
          return res.status(403).json({ error: 'Invalid token' })
        }
        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' })
        return res.status(200).json({ accessToken })
      }) as unknown as Response
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
