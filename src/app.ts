import express from 'express'
import morgan from 'morgan'
import RouterAuth from '@/modules/Auth/repo/routes/Auth.routes'
export class App {
  public app: express.Application
  public port: string
  constructor (port: string) {
    this.app = express()
    this.port = port
  }

  public listen (): void {
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use('/auth', RouterAuth)
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }
}
