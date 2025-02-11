import { format } from 'date-fns';
import pool from "../config/database";
import { IDriverStatusRepository } from "../../application/ports/out/IDriverStatusRepository";
import { DriverStatus } from "../../domain/entity/DriverStatus";
import { DriverStatusDataMapper } from "../mappers/DriverStatusDataMapper";

/**
 * MySQLDriverStatusRepository es la implementación concreta del puerto outbound para la persistencia
 * de la entidad DriverStatus utilizando MySQL.
 */
export class MySQLDriverStatusRepository implements IDriverStatusRepository {
  /**
   * Persiste una nueva instancia de DriverStatus en la base de datos.
   * Se insertan todas las columnas, incluidos los nuevos atributos.
   */
  public async save(driverStatus: DriverStatus): Promise<void> {
    const connection = await pool.getConnection();
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
        format(driverStatus.lastUpdated, 'yyyy-MM-dd HH:mm:ss'),
      ]);
    } finally {
      connection.release();
    }
  }

  /**
   * Busca una entidad DriverStatus por el driverId.
   */
  public async findByDriverId(driverId: string): Promise<DriverStatus | null> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        SELECT driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump,
               currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated
        FROM DriverStatus
        WHERE driverId = ?
      `;
      const [rows]: any = await connection.execute(sql, [driverId]);
      if (Array.isArray(rows) && rows.length > 0) {
        return DriverStatusDataMapper.toDomain(rows[0]);
      }
      return null;
    } finally {
      connection.release();
    }
  }

  /**
   * Actualiza una entidad DriverStatus existente en la base de datos.
   * Se actualizan las propiedades variables, incluyendo: currentLocation, availableCapacity, transportState,
   * longCoordinate, latCoordinate, currentGridZone y lastUpdated.
   */
  public async update(driverStatus: DriverStatus): Promise<void> {
    const connection = await pool.getConnection();
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
        format(driverStatus.lastUpdated, 'yyyy-MM-dd HH:mm:ss'),
        driverStatus.driverStatusId,
      ]);
    } finally {
      connection.release();
    }
  }

  public async findByZone(zone: string): Promise<DriverStatus[]> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        SELECT driverStatusId, driverId, vehicleType, totalCapacity, averageSpeed, averageConsump,
               currentLocation, availableCapacity, transportState, longCoordinate, latCoordinate, currentGridZone, lastUpdated
        FROM DriverStatus
        WHERE currentGridZone = ?
      `;
      const [rows]: any = await connection.execute(sql, [zone]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((row: any) => DriverStatusDataMapper.toDomain(row));
      }
      return [];
    } finally {
      connection.release();
    }
  }
}
