/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AuthHandler } from '../handler/Auth.handler'

const router = Router()
const handler = new AuthHandler()

router.post('/register', handler.Register.bind(handler))
router.post('/login', handler.Login.bind(handler))
router.post('/refresh', handler.RefreshToken.bind(handler))
export default router
