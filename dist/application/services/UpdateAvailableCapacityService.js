"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvailableCapacityService = void 0;
const DriverStatusMapper_1 = require("../mappers/DriverStatusMapper");
/**
 * Servicio para actualizar la capacidad disponible de un conductor.
 */
class UpdateAvailableCapacityService {
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
        this.domainService.updateAvailableCapacity(driverStatus, dto.newAvailableCapacity);
        await this.repository.update(driverStatus);
        const updatedStatusDto = DriverStatusMapper_1.DriverStatusMapper.toDto(driverStatus);
        const eventPayload = {
            event: "DriverStatusCapacityUpdated",
            payload: updatedStatusDto,
        };
        await this.eventPublisher.publish("driverstatus.events", eventPayload);
        return updatedStatusDto;
    }
}
exports.UpdateAvailableCapacityService = UpdateAvailableCapacityService;
