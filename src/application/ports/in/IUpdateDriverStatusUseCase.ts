import { UpdateDriverStatusDto } from "../../dto/UpdateDriverStatusDto";
import { DriverStatusDto } from "../../dto/DriverStatusDto";

/**
 * Inbound port for updating a driver's status (location and transport state).
 *
 * Este contrato define la operación para actualizar la ubicación y el estado operativo de un conductor.
 */
export interface IUpdateDriverStatusUseCase {
  /**
   * Ejecuta el caso de uso para actualizar la ubicación y el estado operativo.
   */
  execute(dto: UpdateDriverStatusDto): Promise<DriverStatusDto>;
}
