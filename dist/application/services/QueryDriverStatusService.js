"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDriverStatusService = void 0;
const DriverStatusMapper_1 = require("../mappers/DriverStatusMapper");
/**
 * Service for querying a driver's status.
 */
class QueryDriverStatusService {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(driverId) {
        const driverStatus = await this.repository.findByDriverId(driverId);
        if (!driverStatus) {
            throw new Error("DriverStatus not found.");
        }
        return DriverStatusMapper_1.DriverStatusMapper.toDto(driverStatus);
    }
}
exports.QueryDriverStatusService = QueryDriverStatusService;
