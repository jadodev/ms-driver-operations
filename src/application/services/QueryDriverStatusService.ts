import { IQueryDriverStatusUseCase } from "../ports/in/IQueryDriverStatusUseCase";
import { DriverStatusDto } from "../dto/DriverStatusDto";
import { IDriverStatusRepository } from "../ports/out/IDriverStatusRepository";
import { DriverStatusMapper } from "../mappers/DriverStatusMapper";

/**
 * Service for querying a driver's status.
 */
export class QueryDriverStatusService implements IQueryDriverStatusUseCase {
  constructor(private readonly repository: IDriverStatusRepository) {}

  public async execute(driverId: string): Promise<DriverStatusDto> {
    const driverStatus = await this.repository.findByDriverId(driverId);
    if (!driverStatus) {
      throw new Error("DriverStatus not found.");
    }
    return DriverStatusMapper.toDto(driverStatus);
  }
}
