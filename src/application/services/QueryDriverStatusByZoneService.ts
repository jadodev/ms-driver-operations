import { IQueryDriverStatusByZoneUseCase } from "../ports/in/IQueryDriverStatusByZoneUseCase";
import { DriverStatusDto } from "../dto/DriverStatusDto";
import { IDriverStatusRepository } from "../ports/out/IDriverStatusRepository";
import { DriverStatusMapper } from "../mappers/DriverStatusMapper";

/**
 * Servicio de aplicación para consultar los estados de los conductores por zona.
 */
export class QueryDriverStatusByZoneService implements IQueryDriverStatusByZoneUseCase {
  constructor(private readonly repository: IDriverStatusRepository) {}

  public async execute(zone: string): Promise<DriverStatusDto[]> {
    const driverStatuses = await this.repository.findByZone(zone);
    return driverStatuses.map(ds => DriverStatusMapper.toDto(ds));
  }
}
