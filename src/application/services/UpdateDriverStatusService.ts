import { IUpdateDriverStatusUseCase } from "../ports/in/IUpdateDriverStatusUseCase";
import { UpdateDriverStatusDto } from "../dto/UpdateDriverStatusDto";
import { DriverStatusDto } from "../dto/DriverStatusDto";
import { IDriverStatusRepository } from "../ports/out/IDriverStatusRepository";
import { DriverStatusDomainService } from "../../domain/services/DriverStatusDomainService";
import { DriverStatusMapper } from "../mappers/DriverStatusMapper";
import { EventPublisher } from "../../infrastructure/messaging/EventPublisher";

/**
 * Service for updating a driver's operational status (location, transport state, and optionally coordinates).
 */
export class UpdateDriverStatusService implements IUpdateDriverStatusUseCase {
  constructor(
    private readonly repository: IDriverStatusRepository,
    private readonly domainService: DriverStatusDomainService,
    private readonly eventPublisher: EventPublisher
  ) {}

  public async execute(dto: UpdateDriverStatusDto): Promise<DriverStatusDto> {
    const driverStatus = await this.repository.findByDriverId(dto.driverId);
    if (!driverStatus) {
      throw new Error("DriverStatus not found.");
    }

    this.domainService.updateDriverStatus(driverStatus, dto.newLocation, dto.newTransportState);

    if (dto.newLongCoordinate && dto.newLatCoordinate) {
      driverStatus.updateCoordinates(dto.newLongCoordinate, dto.newLatCoordinate);
    }

    await this.repository.update(driverStatus);

    const updatedStatusDto = DriverStatusMapper.toDto(driverStatus);

    const eventPayload = {
      event: "DriverStatusUpdated",
      payload: updatedStatusDto,
    };
    await this.eventPublisher.publish("driverstatus.events", eventPayload);

    return updatedStatusDto;
  }
}
