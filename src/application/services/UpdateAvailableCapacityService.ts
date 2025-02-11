// src/application/services/UpdateAvailableCapacityService.ts

import { IUpdateAvailableCapacityUseCase } from "../ports/in/IUpdateAvailableCapacityUseCase";
import { UpdateAvailableCapacityDto } from "../dto/UpdateAvailableCapacityDto";
import { DriverStatusDto } from "../dto/DriverStatusDto";
import { IDriverStatusRepository } from "../ports/out/IDriverStatusRepository";
import { DriverStatusDomainService } from "../../domain/services/DriverStatusDomainService";
import { DriverStatusMapper } from "../mappers/DriverStatusMapper";
import { EventPublisher } from "../../infrastructure/messaging/EventPublisher";

/**
 * Service for updating the available capacity of a driver.
 */
export class UpdateAvailableCapacityService implements IUpdateAvailableCapacityUseCase {
  constructor(
    private readonly repository: IDriverStatusRepository,
    private readonly domainService: DriverStatusDomainService,
    private readonly eventPublisher: EventPublisher
  ) {}

  public async execute(dto: UpdateAvailableCapacityDto): Promise<DriverStatusDto> {
    const driverStatus = await this.repository.findByDriverId(dto.driverId);
    if (!driverStatus) {
      throw new Error("DriverStatus not found.");
    }

    this.domainService.updateAvailableCapacity(driverStatus, dto.newAvailableCapacity);

    await this.repository.update(driverStatus);

    const updatedStatusDto = DriverStatusMapper.toDto(driverStatus);

    const eventPayload = {
      event: "DriverStatusCapacityUpdated",
      payload: updatedStatusDto,
    };
    await this.eventPublisher.publish("driverstatus.events", eventPayload);

    return updatedStatusDto;
  }
}
