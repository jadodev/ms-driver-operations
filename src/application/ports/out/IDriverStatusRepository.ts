import { DriverStatus } from "../../../domain/entity/DriverStatus";

/**
 * Outbound port for persisting and querying DriverStatus entities.
 */
export interface IDriverStatusRepository {
  /**
   * Persiste una nueva instancia de DriverStatus.
   */
  save(driverStatus: DriverStatus): Promise<void>;

  /**
   * Busca una entidad DriverStatus por el driverId.
   */
  findByDriverId(driverId: string): Promise<DriverStatus | null>;

  /**
   * Actualiza una entidad DriverStatus existente.
   */
  update(driverStatus: DriverStatus): Promise<void>;

  /**
   * Consulta todos los DriverStatus que pertenezcan a una zona dada.
   */
  findByZone(zone: string): Promise<DriverStatus[]>;
}
