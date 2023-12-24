import express, { NextFunction, Request, Response, Application } from 'express'
import cors from 'cors'
import routes from '../api'
import { config } from '../config'
import helmet from 'helmet'

export const expressLoader = (app: Application): void => {
  /* Health Check endpoint */
  app.get('/status', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  /**
   * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
   * Helps avoiding logging the proxy IP as the client IP
   */
  app.enable('trust proxy')

  /* Middleware that helps you secure your Express apps by setting various HTTP headers */
  app.use(helmet())

  /**
   * Middleware that allow Cross Origin resourse sharing for all origins by default
   * Tells browsers to allow or deny loading resources from a given origin
   */
  app.use(cors())

  /* Middleware that transforms the raw string of req.body into json */
  app.use(express.json())

  /* Load API routes */
  app.use(config.api.prefix, routes())

  /**
   * Handling 404 routes
   * If no route is matched by now, it must be a 404
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' })
  })
}
