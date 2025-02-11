"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatusMapper = void 0;
const DriverStatusDto_1 = require("../dto/DriverStatusDto");
/**
 * Mapper to transform a DriverStatus domain entity into a DriverStatusDto.
 */
class DriverStatusMapper {
    static toDto(driverStatus) {
        return new DriverStatusDto_1.DriverStatusDto({
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
exports.DriverStatusMapper = DriverStatusMapper;
