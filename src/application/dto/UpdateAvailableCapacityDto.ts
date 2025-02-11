/**
 * DTO para actualizar la capacidad disponible de un conductor.
 */
export class UpdateAvailableCapacityDto {
  driverId: string;
  newAvailableCapacity: number;

  constructor(data: { driverId: string; newAvailableCapacity: number; }) {
    if (!data.driverId) throw new Error("driverId is required.");
    if (data.newAvailableCapacity === undefined || data.newAvailableCapacity === null)
      throw new Error("newAvailableCapacity is required.");

    this.driverId = data.driverId;
    this.newAvailableCapacity = data.newAvailableCapacity;
  }
}
