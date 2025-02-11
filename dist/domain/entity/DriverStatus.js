"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatus = void 0;
const DomainError_1 = require("../exceptions/DomainError");
/**
 * Represents the operational status of a driver.
 * Esta entidad encapsula datos críticos del conductor y expone métodos para actualizar
 * sus propiedades variables, incluyendo la ubicación, las coordenadas y la zona del grid.
 */
class DriverStatus {
    /**
     * Constructor privado para forzar el uso de métodos de fábrica o rehidratación.
     */
    constructor(driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump, currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated) {
        if (!driverStatusId) {
            throw new DomainError_1.DomainError("DriverStatusId cannot be null or empty.");
        }
        if (!driverId) {
            throw new DomainError_1.DomainError("DriverId cannot be null or empty.");
        }
        if (!vehicleType) {
            throw new DomainError_1.DomainError("VehicleType cannot be null or empty.");
        }
        if (totalCapacity <= 0) {
            throw new DomainError_1.DomainError("Total capacity must be a positive number.");
        }
        if (averageSpeed <= 0) {
            throw new DomainError_1.DomainError("Average speed must be a positive number.");
        }
        if (averageConsump <= 0) {
            throw new DomainError_1.DomainError("Average consumption must be a positive number.");
        }
        if (!currentLocation) {
            throw new DomainError_1.DomainError("Current location cannot be null or empty.");
        }
        if (availableCapacity < 0 || availableCapacity > totalCapacity) {
            throw new DomainError_1.DomainError("Available capacity must be between 0 and total capacity.");
        }
        if (!transportState) {
            throw new DomainError_1.DomainError("Transport state cannot be null or empty.");
        }
        if (!longCoordinate) {
            throw new DomainError_1.DomainError("LongCoordinate cannot be null or empty.");
        }
        if (!latCoordinate) {
            throw new DomainError_1.DomainError("LatCoordinate cannot be null or empty.");
        }
        if (!currentGridZone) {
            throw new DomainError_1.DomainError("Current grid zone cannot be null or empty.");
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
    static create(driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump, currentLocation, availableCapacity, initialTransportState, longCoordinate, latCoordinate, currentGridZone = "Undefined") {
        return new DriverStatus(driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump, currentLocation, availableCapacity, initialTransportState, longCoordinate, latCoordinate, currentGridZone, new Date());
    }
    /**
     * actualiza el estado del conductor.
     */
    static fromPersistence(row) {
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
                throw new DomainError_1.DomainError(`Missing field '${field}' in persistence record.`);
            }
        }
        return new DriverStatus(row.driverStatusId, row.driverId, row.vehicleType, Number(row.totalCapacity), Number(row.averageSpeed), Number(row.averageConsump), row.currentLocation, Number(row.availableCapacity), row.transportState, row.longCoordinate, row.latCoordinate, row.currentGridZone, new Date(row.lastUpdated));
    }
    get currentLocation() {
        return this._currentLocation;
    }
    get availableCapacity() {
        return this._availableCapacity;
    }
    get transportState() {
        return this._transportState;
    }
    get longCoordinate() {
        return this._longCoordinate;
    }
    get latCoordinate() {
        return this._latCoordinate;
    }
    get currentGridZone() {
        return this._currentGridZone;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    /**
     * Actualiza la ubicación actual del conductor.
     */
    updateLocation(newLocation) {
        if (!newLocation) {
            throw new DomainError_1.DomainError("New location cannot be null or empty.");
        }
        this._currentLocation = newLocation;
        this._lastUpdated = new Date();
    }
    /**
     * Actualiza la capacidad disponible.
     */
    updateAvailableCapacity(newAvailableCapacity) {
        if (newAvailableCapacity < 0 || newAvailableCapacity > this.totalCapacity) {
            throw new DomainError_1.DomainError("Available capacity must be between 0 and total capacity.");
        }
        this._availableCapacity = newAvailableCapacity;
        this._lastUpdated = new Date();
    }
    /**
     * Actualiza el estado operativo del conductor.
     */
    updateTransportState(newTransportState) {
        if (!newTransportState) {
            throw new DomainError_1.DomainError("New transport state cannot be null or empty.");
        }
        this._transportState = newTransportState;
        this._lastUpdated = new Date();
    }
    /**
     * Actualiza las coordenadas actuales del conductor.
     */
    updateCoordinates(newLongCoordinate, newLatCoordinate) {
        if (!newLongCoordinate || !newLatCoordinate) {
            throw new DomainError_1.DomainError("New coordinates cannot be null or empty.");
        }
        this._longCoordinate = newLongCoordinate;
        this._latCoordinate = newLatCoordinate;
        this._lastUpdated = new Date();
    }
    /**
     * Actualiza la zona actual del grid.
     */
    updateCurrentGridZone(newGridZone) {
        if (!newGridZone) {
            throw new DomainError_1.DomainError("New grid zone cannot be null or empty.");
        }
        this._currentGridZone = newGridZone;
        this._lastUpdated = new Date();
    }
    toString() {
        return `DriverStatus { driverStatusId: ${this.driverStatusId}, driverId: ${this.driverId}, vehicleType: ${this.vehicleType}, totalCapacity: ${this.totalCapacity}, averageSpeed: ${this.averageSpeed}, averageConsump: ${this.averageConsump}, availableCapacity: ${this._availableCapacity}, currentLocation: ${this._currentLocation}, transportState: ${this._transportState}, longCoordinate: ${this._longCoordinate}, latCoordinate: ${this._latCoordinate}, currentGridZone: ${this._currentGridZone}, lastUpdated: ${this._lastUpdated.toISOString()} }`;
    }
}
exports.DriverStatus = DriverStatus;
