"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDriverStatusDto = void 0;
/**
 * DTO para la creación de un DriverStatus.
 */
class CreateDriverStatusDto {
    constructor(data) {
        if (!data.driverId)
            throw new Error("driverId is required.");
        if (!data.vehicleType)
            throw new Error("vehicleType is required.");
        if (data.totalCapacity === undefined || data.totalCapacity <= 0)
            throw new Error("totalCapacity must be a positive number.");
        if (data.averageSpeed === undefined || data.averageSpeed <= 0)
            throw new Error("averageSpeed must be a positive number.");
        if (data.averageConsump === undefined || data.averageConsump <= 0)
            throw new Error("averageConsump must be a positive number.");
        if (!data.currentLocation)
            throw new Error("currentLocation is required.");
        if (data.availableCapacity === undefined || data.availableCapacity < 0)
            throw new Error("availableCapacity is required and must be non-negative.");
        if (!data.transportState)
            throw new Error("transportState is required.");
        if (!data.longCoordinate)
            throw new Error("longCoordinate is required.");
        if (!data.latCoordinate)
            throw new Error("latCoordinate is required.");
        this.driverId = data.driverId;
        this.vehicleType = data.vehicleType;
        this.totalCapacity = data.totalCapacity;
        this.averageSpeed = data.averageSpeed;
        this.averageConsump = data.averageConsump;
        this.currentLocation = data.currentLocation;
        this.availableCapacity = data.availableCapacity;
        this.transportState = data.transportState;
        this.longCoordinate = data.longCoordinate;
        this.latCoordinate = data.latCoordinate;
    }
}
exports.CreateDriverStatusDto = CreateDriverStatusDto;
