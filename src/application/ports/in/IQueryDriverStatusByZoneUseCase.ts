import { DriverStatusDto } from "../../dto/DriverStatusDto";

/**
 * Inbound port for querying driver statuses by zone.
 */
export interface IQueryDriverStatusByZoneUseCase {
  /**
   * Ejecuta el caso de uso para obtener todos los DriverStatus en una zona determinada.
   */
  execute(zone: string): Promise<DriverStatusDto[]>;
}
