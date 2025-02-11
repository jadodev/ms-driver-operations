"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatusDomainService = void 0;
const DomainError_1 = require("../exceptions/DomainError");
const ZoneCalculator_1 = require("../utils/ZoneCalculator");
/**
 * DriverStatusDomainService encapsula la lógica de negocio para la gestión del estado operativo de un conductor.
 * Además de actualizar ubicación, estado y capacidad, recalcula la zona de grid (currentGridZone) automáticamente
 * basándose en las coordenadas actuales del vehículo.
 */
class DriverStatusDomainService {
    /**
     * Actualiza la ubicación y el estado operativo del conductor, y recalcula la zona de grid automáticamente.
     */
    updateDriverStatus(driverStatus, newLocation, newTransportState) {
        if (!newLocation || newLocation.trim() === "") {
            throw new DomainError_1.DomainError("New location must not be empty.");
        }
        if (!newTransportState || newTransportState.trim() === "") {
            throw new DomainError_1.DomainError("New transport state must not be empty.");
        }
        driverStatus.updateLocation(newLocation);
        driverStatus.updateTransportState(newTransportState);
        const point = {
            x: parseFloat(driverStatus.longCoordinate),
            y: parseFloat(driverStatus.latCoordinate),
        };
        const zoneCalculator = new ZoneCalculator_1.ZoneCalculator();
        const nearestReference = zoneCalculator.getNearestReference(point);
        driverStatus.updateCurrentGridZone(nearestReference.zone);
    }
    /**
     * Actualiza la capacidad disponible del conductor.
     */
    updateAvailableCapacity(driverStatus, newAvailableCapacity) {
        driverStatus.updateAvailableCapacity(newAvailableCapacity);
    }
}
exports.DriverStatusDomainService = DriverStatusDomainService;
