import { Application } from 'express'
import { expressLoader } from './express'
import logger from './logger'

export const loaders = async (app: Application): Promise<void> => {
  logger.info('Loading express')
  expressLoader(app)
  logger.info('Express loaded')
}
