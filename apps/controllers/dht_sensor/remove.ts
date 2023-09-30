import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { type DhtSensorAttributes, DhtSensorModel } from '../../models/dht_sensor'

export const removeDhtSensor = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as DhtSensorAttributes

  const emptyField = requestChecker({
    requireList: ['dhtSensorId'],
    requestData: requestQuery
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
        dhtSensorId: { [Op.eq]: requestQuery.dhtSensorId }
      }
    })

    if (result == null) {
      const message = 'dht sensor value not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    result.deleted = 1
    void result.save()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
