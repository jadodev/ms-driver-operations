import { DriverStatus } from "../../domain/entity/DriverStatus";
import { DomainError } from "../../domain/exceptions/DomainError";

/**
 * Data Mapper responsable de rehidratar una entidad DriverStatus a partir de un registro persistido.
 */
export class DriverStatusDataMapper {
  /**
   * Transforma un registro (row) de la base de datos en una instancia del dominio DriverStatus.
   */
  public static toDomain(row: any): DriverStatus {
    const requiredFields = [
      "driverStatusId",
      "driverId",
      "vehicleType",
      "totalCapacity",
      "averageSpeed",
      "averageConsump",
      "currentLocation",
      "availableCapacity",
      "transportState",
      "longCoordinate",
      "latCoordinate",
      "currentGridZone",
      "lastUpdated"
    ];
    for (const field of requiredFields) {
      if (row[field] === undefined || row[field] === null) {
        throw new DomainError(`Missing field '${field}' in persistence record.`);
      }
    }
    return DriverStatus.fromPersistence(row);
  }
}
