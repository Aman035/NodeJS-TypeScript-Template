import { Router, Request, Response, NextFunction } from 'express'

const route = Router()

export default (app: Router) => {
  app.use('/auth', route)
}
