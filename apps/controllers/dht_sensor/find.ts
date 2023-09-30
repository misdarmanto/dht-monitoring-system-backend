import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { type DhtSensorAttributes, DhtSensorModel } from '../../models/dht_sensor'

export const findAllDhtSensor = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await DhtSensorModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [
            { dhtSensorHumidity: { [Op.like]: `%${req.query.search}%` } },
            { dhtSensorTemperature: { [Op.like]: `%${req.query.search}%` } }
          ]
        })
        // createdAt: {
        //   [Op.between]: [
        //     new Date('2023-09-30T07:35:43.000Z'),
        //     new Date('2023-09-30T07:38:20.000Z')
        //   ]
        // }
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(result)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneDhtSensor = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DhtSensorAttributes

  const emptyField = requestChecker({
    requireList: ['dhtSensorId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await DhtSensorModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        dhtSensorId: { [Op.eq]: requestParams.dhtSensorId }
      }
    })

    if (result == null) {
      const message = 'dht sensor value not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
