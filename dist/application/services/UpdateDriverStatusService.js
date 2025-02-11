"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDriverStatusService = void 0;
const DriverStatusMapper_1 = require("../mappers/DriverStatusMapper");
/**
 * Service for updating a driver's operational status (location, transport state, and optionally coordinates).
 */
class UpdateDriverStatusService {
    constructor(repository, domainService, eventPublisher) {
        this.repository = repository;
        this.domainService = domainService;
        this.eventPublisher = eventPublisher;
    }
    async execute(dto) {
        const driverStatus = await this.repository.findByDriverId(dto.driverId);
        if (!driverStatus) {
            throw new Error("DriverStatus not found.");
        }
        this.domainService.updateDriverStatus(driverStatus, dto.newLocation, dto.newTransportState);
        if (dto.newLongCoordinate && dto.newLatCoordinate) {
            driverStatus.updateCoordinates(dto.newLongCoordinate, dto.newLatCoordinate);
        }
        await this.repository.update(driverStatus);
        const updatedStatusDto = DriverStatusMapper_1.DriverStatusMapper.toDto(driverStatus);
        const eventPayload = {
            event: "DriverStatusUpdated",
            payload: updatedStatusDto,
        };
        await this.eventPublisher.publish("driverstatus.events", eventPayload);
        return updatedStatusDto;
    }
}
exports.UpdateDriverStatusService = UpdateDriverStatusService;
