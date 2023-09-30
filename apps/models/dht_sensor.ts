/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DhtSensorAttributes extends ZygoteAttributes {
  dhtSensorId: string
  dhtSensorTemperature: number
  dhtSensorHumidity: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DhtSensorCreationAttributes = Optional<
  DhtSensorAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface DhtSensorInstance
  extends Model<DhtSensorAttributes, DhtSensorCreationAttributes>,
    DhtSensorAttributes {}

export const DhtSensorModel = sequelize.define<DhtSensorInstance>(
  'dht_sensor',
  {
    ...ZygoteModel,
    dhtSensorId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    dhtSensorTemperature: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dhtSensorHumidity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'dht_sensor',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
