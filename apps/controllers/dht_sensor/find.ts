import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { type DhtSensorAttributes, DhtSensorModel } from '../../models/dht_sensor'
import moment from 'moment'

export const findAllDhtSensor = async (req: any, res: Response): Promise<any> => {
  const TODAY_START = moment().startOf('day').toDate()
  const TODAY_END = moment().endOf('day').toDate()

  const WEEK_START = moment().startOf('week').toDate()
  const WEEK_END = moment().endOf('week').toDate()

  const MONTH_START = moment().startOf('month').toDate()
  const MONTH_END = moment().endOf('month').toDate()

  const YEAR_START = moment().startOf('year').toDate()
  const YEAR_END = moment().endOf('year').toDate()

  const YESTERDAY = moment().clone().subtract(1, 'day')
  const YESTERDAY_START = YESTERDAY.startOf('day').toDate()
  const YESTERDAY_END = YESTERDAY.endOf('day').toDate()

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
        }),
        ...(req.query.range === 'today' && {
          createdAt: { [Op.between]: [TODAY_START, TODAY_END] }
        }),
        ...(req.query.range === 'yesterday' && {
          createdAt: {
            [Op.between]: [YESTERDAY_START, YESTERDAY_END]
          }
        }),
        ...(req.query.range === 'week' && {
          createdAt: { [Op.between]: [WEEK_START, WEEK_END] }
        }),
        ...(req.query.range === 'month' && {
          createdAt: { [Op.between]: [MONTH_START, MONTH_END] }
        }),
        ...(req.query.range === 'year' && {
          createdAt: { [Op.between]: [YEAR_START, YEAR_END] }
        })
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
