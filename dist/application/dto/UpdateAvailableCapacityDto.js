"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvailableCapacityDto = void 0;
/**
 * DTO para actualizar la capacidad disponible de un conductor.
 */
class UpdateAvailableCapacityDto {
    constructor(data) {
        if (!data.driverId)
            throw new Error("driverId is required.");
        if (data.newAvailableCapacity === undefined || data.newAvailableCapacity === null)
            throw new Error("newAvailableCapacity is required.");
        this.driverId = data.driverId;
        this.newAvailableCapacity = data.newAvailableCapacity;
    }
}
exports.UpdateAvailableCapacityDto = UpdateAvailableCapacityDto;
