"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDriverStatusRepository = void 0;
const date_fns_1 = require("date-fns");
const database_1 = __importDefault(require("../config/database"));
const DriverStatusDataMapper_1 = require("../mappers/DriverStatusDataMapper");
/**
 * MySQLDriverStatusRepository es la implementación concreta del puerto outbound para la persistencia
 * de la entidad DriverStatus utilizando MySQL.
 */
class MySQLDriverStatusRepository {
    /**
     * Persiste una nueva instancia de DriverStatus en la base de datos.
     * Se insertan todas las columnas, incluidos los nuevos atributos.
     */
    async save(driverStatus) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        INSERT INTO DriverStatus 
          (driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump,
           currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated)
        VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            await connection.execute(sql, [
                driverStatus.driverStatusId,
                driverStatus.driverId,
                driverStatus.vehicleType,
                driverStatus.totalCapacity,
                driverStatus.averageSpeed,
                driverStatus.averageConsump,
                driverStatus.currentLocation,
                driverStatus.availableCapacity,
                driverStatus.transportState,
                driverStatus.longCoordinate,
                driverStatus.latCoordinate,
                driverStatus.currentGridZone,
                (0, date_fns_1.format)(driverStatus.lastUpdated, 'yyyy-MM-dd HH:mm:ss'),
            ]);
        }
        finally {
            connection.release();
        }
    }
    /**
     * Busca una entidad DriverStatus por el driverId.
     */
    async findByDriverId(driverId) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        SELECT driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump,
               currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated
        FROM DriverStatus
        WHERE driverId = ?
      `;
            const [rows] = await connection.execute(sql, [driverId]);
            if (Array.isArray(rows) && rows.length > 0) {
                return DriverStatusDataMapper_1.DriverStatusDataMapper.toDomain(rows[0]);
            }
            return null;
        }
        finally {
            connection.release();
        }
    }
    /**
     * Actualiza una entidad DriverStatus existente en la base de datos.
     * Se actualizan las propiedades variables, incluyendo: currentLocation, availableCapacity, transportState,
     * longCoordinate, latCoordinate, currentGridZone y lastUpdated.
     */
    async update(driverStatus) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        UPDATE DriverStatus
        SET currentLocation = ?,
            availableCapacity = ?,
            transportState = ?,
            longCoordinate = ?,
            latCoordinate = ?,
            currentGridZone = ?,
            lastUpdated = ?
        WHERE driverStatusId = ?
      `;
            await connection.execute(sql, [
                driverStatus.currentLocation,
                driverStatus.availableCapacity,
                driverStatus.transportState,
                driverStatus.longCoordinate,
                driverStatus.latCoordinate,
                driverStatus.currentGridZone,
                (0, date_fns_1.format)(driverStatus.lastUpdated, 'yyyy-MM-dd HH:mm:ss'),
                driverStatus.driverStatusId,
            ]);
        }
        finally {
            connection.release();
        }
    }
    async findByZone(zone) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        SELECT driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump,
               currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated
        FROM DriverStatus
        WHERE currentGridZone = ?
      `;
            const [rows] = await connection.execute(sql, [zone]);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows.map((row) => DriverStatusDataMapper_1.DriverStatusDataMapper.toDomain(row));
            }
            return [];
        }
        finally {
            connection.release();
        }
    }
}
exports.MySQLDriverStatusRepository = MySQLDriverStatusRepository;
