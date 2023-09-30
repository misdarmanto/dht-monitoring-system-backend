import { createDhtSensor } from './create'
import { findAllDhtSensor, findOneDhtSensor } from './find'
import { removeDhtSensor } from './remove'
import { findAllTemperature, findAllHumidity } from './statistic'

export const dhtSensorController = {
  create: createDhtSensor,
  findAll: findAllDhtSensor,
  findOne: findOneDhtSensor,
  remove: removeDhtSensor,
  findAllTemperature,
  findAllHumidity
}
