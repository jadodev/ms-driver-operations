import { DriverStatusDto } from "../../dto/DriverStatusDto";

/**
 * Inbound port for querying a driver's status.
 *
 * Define el contrato para obtener la información operativa de un conductor.
 */
export interface IQueryDriverStatusUseCase {
  /**
   * Ejecuta el caso de uso para consultar el estado de un conductor.
   */
  execute(driverId: string): Promise<DriverStatusDto>;
}
