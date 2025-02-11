import { DomainError } from "../exceptions/DomainError";

/**
 * Represents the operational status of a driver.
 * Esta entidad encapsula datos críticos del conductor y expone métodos para actualizar
 * sus propiedades variables, incluyendo la ubicación, las coordenadas y la zona del grid.
 */
export class DriverStatus {
  public readonly driverStatusId: string;
  public readonly driverId: string;
  public readonly vehicleType: string;
  public readonly totalCapacity: number;
  public readonly averageSpeed: number; 
  public readonly averageConsump: number; 

  // Propiedades variables:
  private _currentLocation: string;
  private _availableCapacity: number;
  private _transportState: string;
  private _longCoordinate: string;
  private _latCoordinate: string;
  private _currentGridZone: string;
  private _lastUpdated: Date;

  /**
   * Constructor privado para forzar el uso de métodos de fábrica o rehidratación.
   */
  private constructor(
    driverStatusId: string,
    driverId: string,
    vehicleType: string,
    totalCapacity: number,
    averageSpeed: number,
    averageConsump: number,
    currentLocation: string,
    availableCapacity: number,
    transportState: string,
    longCoordinate: string,
    latCoordinate: string,
    currentGridZone: string,
    lastUpdated: Date
  ) {
    if (!driverStatusId) {
      throw new DomainError("DriverStatusId cannot be null or empty.");
    }
    if (!driverId) {
      throw new DomainError("DriverId cannot be null or empty.");
    }
    if (!vehicleType) {
      throw new DomainError("VehicleType cannot be null or empty.");
    }
    if (totalCapacity <= 0) {
      throw new DomainError("Total capacity must be a positive number.");
    }
    if (averageSpeed <= 0) {
      throw new DomainError("Average speed must be a positive number.");
    }
    if (averageConsump <= 0) {
      throw new DomainError("Average consumption must be a positive number.");
    }
    if (!currentLocation) {
      throw new DomainError("Current location cannot be null or empty.");
    }
    if (availableCapacity < 0 || availableCapacity > totalCapacity) {
      throw new DomainError("Available capacity must be between 0 and total capacity.");
    }
    if (!transportState) {
      throw new DomainError("Transport state cannot be null or empty.");
    }
    if (!longCoordinate) {
      throw new DomainError("LongCoordinate cannot be null or empty.");
    }
    if (!latCoordinate) {
      throw new DomainError("LatCoordinate cannot be null or empty.");
    }
    if (!currentGridZone) {
      throw new DomainError("Current grid zone cannot be null or empty.");
    }

    this.driverStatusId = driverStatusId;
    this.driverId = driverId;
    this.vehicleType = vehicleType;
    this.totalCapacity = totalCapacity;
    this.averageSpeed = averageSpeed;
    this.averageConsump = averageConsump;
    this._currentLocation = currentLocation;
    this._availableCapacity = availableCapacity;
    this._transportState = transportState;
    this._longCoordinate = longCoordinate;
    this._latCoordinate = latCoordinate;
    this._currentGridZone = currentGridZone;
    this._lastUpdated = lastUpdated;
  }

  /**
   * Factory method to create a new DriverStatus.
   */
  public static create(
    driverStatusId: string,
    driverId: string,
    vehicleType: string,
    totalCapacity: number,
    averageSpeed: number,
    averageConsump: number,
    currentLocation: string,
    availableCapacity: number,
    initialTransportState: string,
    longCoordinate: string,
    latCoordinate: string,
     currentGridZone: string = "Undefined"
  ): DriverStatus {
    return new DriverStatus(
      driverStatusId,
      driverId,
      vehicleType,
      totalCapacity,
      averageSpeed,
      averageConsump,
      currentLocation,
      availableCapacity,
      initialTransportState,
      longCoordinate,
      latCoordinate,
      currentGridZone,
      new Date()
    );
  }

  /**
   * actualiza el estado del conductor.
   */
  public static fromPersistence(row: any): DriverStatus {
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
    return new DriverStatus(
      row.driverStatusId,
      row.driverId,
      row.vehicleType,
      Number(row.totalCapacity),
      Number(row.averageSpeed),
      Number(row.averageConsump),
      row.currentLocation,
      Number(row.availableCapacity),
      row.transportState,
      row.longCoordinate,
      row.latCoordinate,
      row.currentGridZone,
      new Date(row.lastUpdated)
    );
  }

  public get currentLocation(): string {
    return this._currentLocation;
  }
  public get availableCapacity(): number {
    return this._availableCapacity;
  }
  public get transportState(): string {
    return this._transportState;
  }
  public get longCoordinate(): string {
    return this._longCoordinate;
  }
  public get latCoordinate(): string {
    return this._latCoordinate;
  }
  public get currentGridZone(): string {
    return this._currentGridZone;
  }
  public get lastUpdated(): Date {
    return this._lastUpdated;
  }


  /**
   * Actualiza la ubicación actual del conductor.
   */
  public updateLocation(newLocation: string): void {
    if (!newLocation) {
      throw new DomainError("New location cannot be null or empty.");
    }
    this._currentLocation = newLocation;
    this._lastUpdated = new Date();
  }

  /**
   * Actualiza la capacidad disponible.
   */
  public updateAvailableCapacity(newAvailableCapacity: number): void {
    if (newAvailableCapacity < 0 || newAvailableCapacity > this.totalCapacity) {
      throw new DomainError("Available capacity must be between 0 and total capacity.");
    }
    this._availableCapacity = newAvailableCapacity;
    this._lastUpdated = new Date();
  }

  /**
   * Actualiza el estado operativo del conductor.
   */
  public updateTransportState(newTransportState: string): void {
    if (!newTransportState) {
      throw new DomainError("New transport state cannot be null or empty.");
    }
    this._transportState = newTransportState;
    this._lastUpdated = new Date();
  }

  /**
   * Actualiza las coordenadas actuales del conductor.
   */
  public updateCoordinates(newLongCoordinate: string, newLatCoordinate: string): void {
    if (!newLongCoordinate || !newLatCoordinate) {
      throw new DomainError("New coordinates cannot be null or empty.");
    }
    this._longCoordinate = newLongCoordinate;
    this._latCoordinate = newLatCoordinate;
    this._lastUpdated = new Date();
  }

  /**
   * Actualiza la zona actual del grid.
   */
  public updateCurrentGridZone(newGridZone: string): void {
    if (!newGridZone) {
      throw new DomainError("New grid zone cannot be null or empty.");
    }
    this._currentGridZone = newGridZone;
    this._lastUpdated = new Date();
  }

  public toString(): string {
    return `DriverStatus { driverStatusId: ${this.driverStatusId}, driverId: ${this.driverId}, vehicleType: ${this.vehicleType}, totalCapacity: ${this.totalCapacity}, averageSpeed: ${this.averageSpeed}, averageConsump: ${this.averageConsump}, availableCapacity: ${this._availableCapacity}, currentLocation: ${this._currentLocation}, transportState: ${this._transportState}, longCoordinate: ${this._longCoordinate}, latCoordinate: ${this._latCoordinate}, currentGridZone: ${this._currentGridZone}, lastUpdated: ${this._lastUpdated.toISOString()} }`;
  }
}
