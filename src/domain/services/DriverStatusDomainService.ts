import { DriverStatus } from "../entity/DriverStatus";
import { DomainError } from "../exceptions/DomainError";
import { ZoneCalculator, Point } from "../utils/ZoneCalculator";

/**
 * DriverStatusDomainService encapsula la lógica de negocio para la gestión del estado operativo de un conductor.
 * Además de actualizar ubicación, estado y capacidad, recalcula la zona de grid (currentGridZone) automáticamente
 * basándose en las coordenadas actuales del vehículo.
 */
export class DriverStatusDomainService {
  /**
   * Actualiza la ubicación y el estado operativo del conductor, y recalcula la zona de grid automáticamente.
   */
  public updateDriverStatus(
    driverStatus: DriverStatus,
    newLocation: string,
    newTransportState: string
  ): void {
    if (!newLocation || newLocation.trim() === "") {
      throw new DomainError("New location must not be empty.");
    }
    if (!newTransportState || newTransportState.trim() === "") {
      throw new DomainError("New transport state must not be empty.");
    }
    driverStatus.updateLocation(newLocation);
    driverStatus.updateTransportState(newTransportState);

    const point: Point = {
      x: parseFloat(driverStatus.longCoordinate),
      y: parseFloat(driverStatus.latCoordinate),
    };
    const zoneCalculator = new ZoneCalculator();
    const nearestReference = zoneCalculator.getNearestReference(point);
    driverStatus.updateCurrentGridZone(nearestReference.zone);
  }

  /**
   * Actualiza la capacidad disponible del conductor.
   */
  public updateAvailableCapacity(
    driverStatus: DriverStatus,
    newAvailableCapacity: number
  ): void {
    driverStatus.updateAvailableCapacity(newAvailableCapacity);
  }
}
