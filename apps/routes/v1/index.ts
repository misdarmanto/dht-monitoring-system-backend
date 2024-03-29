/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Express, type Request, type Response } from 'express'
import { index } from '../../controllers'
import { userRoutes } from './user-router'
import { uploadFileRoutes } from './upload-file-route'
import { adminRouter } from './adminRouter'
import { myProfileRouter } from './myProfileRouter'
import { dhtSensorRoutes } from './dhtSensorRouter'

export const appRouterV1 = (app: Express) => {
  app.get('/api/v1', async (req: Request, res: Response) => await index(req, res))
  userRoutes(app)
  dhtSensorRoutes(app)
  uploadFileRoutes(app)
  adminRouter(app)
  myProfileRouter(app)
}
