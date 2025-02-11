"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatusDataMapper = void 0;
const DriverStatus_1 = require("../../domain/entity/DriverStatus");
const DomainError_1 = require("../../domain/exceptions/DomainError");
/**
 * Data Mapper responsable de rehidratar una entidad DriverStatus a partir de un registro persistido.
 */
class DriverStatusDataMapper {
    /**
     * Transforma un registro (row) de la base de datos en una instancia del dominio DriverStatus.
     */
    static toDomain(row) {
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
        return DriverStatus_1.DriverStatus.fromPersistence(row);
    }
}
exports.DriverStatusDataMapper = DriverStatusDataMapper;
