import { UpdateAvailableCapacityDto } from "../../dto/UpdateAvailableCapacityDto";
import { DriverStatusDto } from "../../dto/DriverStatusDto";

/**
 * Inbound port for updating the available capacity of a driver.
 *
 * Define el contrato para actualizar la capacidad disponible del vehículo de un conductor.
 */
export interface IUpdateAvailableCapacityUseCase {
  /**
   * Ejecuta el caso de uso para actualizar la capacidad disponible.
   */
  execute(dto: UpdateAvailableCapacityDto): Promise<DriverStatusDto>;
}
