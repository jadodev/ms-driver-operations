import { DriverStatus } from "../../domain/entity/DriverStatus";
import { DriverStatusDto } from "../dto/DriverStatusDto";

/**
 * Mapper to transform a DriverStatus domain entity into a DriverStatusDto.
 */
export class DriverStatusMapper {
  public static toDto(driverStatus: DriverStatus): DriverStatusDto {
    return new DriverStatusDto({
      driverStatusId: driverStatus.driverStatusId,
      driverId: driverStatus.driverId,
      vehicleType: driverStatus.vehicleType,
      totalCapacity: driverStatus.totalCapacity,
      averageSpeed: driverStatus.averageSpeed,
      averageConsump: driverStatus.averageConsump,
      availableCapacity: driverStatus.availableCapacity,
      currentLocation: driverStatus.currentLocation,
      transportState: driverStatus.transportState,
      longCoordinate: driverStatus.longCoordinate,
      latCoordinate: driverStatus.latCoordinate,
      currentGridZone: driverStatus.currentGridZone,
      lastUpdated: driverStatus.lastUpdated.toISOString(),
    });
  }
}
