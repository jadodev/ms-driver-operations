"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDriverStatusDto = void 0;
/**
 * DTO para actualizar la ubicación y el estado operativo de un conductor.
 * Las coordenadas (newLongCoordinate y newLatCoordinate) son opcionales.
 * currentGridZone se calculará automáticamente.
 */
class UpdateDriverStatusDto {
    constructor(data) {
        if (!data.driverId)
            throw new Error("driverId is required.");
        if (!data.newLocation)
            throw new Error("newLocation is required.");
        if (!data.newTransportState)
            throw new Error("newTransportState is required.");
        this.driverId = data.driverId;
        this.newLocation = data.newLocation;
        this.newTransportState = data.newTransportState;
        this.newLongCoordinate = data.newLongCoordinate;
        this.newLatCoordinate = data.newLatCoordinate;
    }
}
exports.UpdateDriverStatusDto = UpdateDriverStatusDto;
