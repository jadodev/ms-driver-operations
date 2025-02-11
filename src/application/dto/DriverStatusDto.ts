/**
 * DTO que representa la información completa del DriverStatus.
 */
export class DriverStatusDto {
  driverStatusId: string;
  driverId: string;
  vehicleType: string;
  totalCapacity: number;
  averageSpeed: number;
  averageConsump: number;
  availableCapacity: number;
  currentLocation: string;
  transportState: string;
  longCoordinate: string;
  latCoordinate: string;
  currentGridZone: string;
  lastUpdated: string;

  constructor(data: {
    driverStatusId: string;
    driverId: string;
    vehicleType: string;
    totalCapacity: number;
    averageSpeed: number;
    averageConsump: number;
    availableCapacity: number;
    currentLocation: string;
    transportState: string;
    longCoordinate: string;
    latCoordinate: string;
    currentGridZone: string;
    lastUpdated: string;
  }) {
    this.driverStatusId = data.driverStatusId;
    this.driverId = data.driverId;
    this.vehicleType = data.vehicleType;
    this.totalCapacity = data.totalCapacity;
    this.averageSpeed = data.averageSpeed;
    this.averageConsump = data.averageConsump;
    this.availableCapacity = data.availableCapacity;
    this.currentLocation = data.currentLocation;
    this.transportState = data.transportState;
    this.longCoordinate = data.longCoordinate;
    this.latCoordinate = data.latCoordinate;
    this.currentGridZone = data.currentGridZone;
    this.lastUpdated = data.lastUpdated;
  }
}
