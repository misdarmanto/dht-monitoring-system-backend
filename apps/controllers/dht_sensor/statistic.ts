import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { CONSOLE } from '../../utilities/log'
import { DhtSensorModel } from '../../models/dht_sensor'

export const findAllTemperature = async (req: any, res: Response): Promise<any> => {
  try {
    const result = await DhtSensorModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 }
      },
      attributes: ['dhtSensorTemperature', 'createdAt']
    })
    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findAllHumidity = async (req: any, res: Response): Promise<any> => {
  try {
    const result = await DhtSensorModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 }
      },
      attributes: ['dhtSensorHumidity', 'createdAt']
    })
    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
