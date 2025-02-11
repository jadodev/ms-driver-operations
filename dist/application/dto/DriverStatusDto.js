"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatusDto = void 0;
/**
 * DTO que representa la información completa del DriverStatus.
 */
class DriverStatusDto {
    constructor(data) {
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
exports.DriverStatusDto = DriverStatusDto;
