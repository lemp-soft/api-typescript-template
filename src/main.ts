import dotenv from 'dotenv'
import { PORT } from './core/domain/config/constans'
import { App } from './app'
dotenv.config()
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const app = new App(PORT)
app.listen()
