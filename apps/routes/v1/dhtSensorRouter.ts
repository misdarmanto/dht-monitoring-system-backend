/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { dhtSensorController } from '../../controllers/dht_sensor'

export const dhtSensorRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/dht-sensors', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await dhtSensorController.findAll(req, res)
  )
  route.get(
    '/detail/:dhtSensorId',
    async (req: Request, res: Response) => await dhtSensorController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await dhtSensorController.create(req, res)
  )

  route.delete(
    '/',
    async (req: Request, res: Response) => await dhtSensorController.remove(req, res)
  )

  route.get(
    '/statistic/temperature',
    async (req: Request, res: Response) =>
      await dhtSensorController.findAllTemperature(req, res)
  )

  route.get(
    '/statistic/humidity',
    async (req: Request, res: Response) =>
      await dhtSensorController.findAllHumidity(req, res)
  )
}
