"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDriverStatusByZoneService = void 0;
const DriverStatusMapper_1 = require("../mappers/DriverStatusMapper");
/**
 * Servicio de aplicación para consultar los estados de los conductores por zona.
 */
class QueryDriverStatusByZoneService {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(zone) {
        const driverStatuses = await this.repository.findByZone(zone);
        return driverStatuses.map(ds => DriverStatusMapper_1.DriverStatusMapper.toDto(ds));
    }
}
exports.QueryDriverStatusByZoneService = QueryDriverStatusByZoneService;
