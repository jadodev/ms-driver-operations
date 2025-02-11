"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./infrastructure/config/database"));
const messageBroker_1 = require("./infrastructure/config/messageBroker");
const KafkaProducer_1 = require("./infrastructure/messaging/KafkaProducer");
const EventPublisher_1 = require("./infrastructure/messaging/EventPublisher");
const KafkaConsumer_1 = require("./infrastructure/messaging/KafkaConsumer");
const AssignmentCreatedConsumer_1 = require("./infrastructure/messaging/AssignmentCreatedConsumer");
const MySQLDriverStatusRepository_1 = require("./infrastructure/repository/MySQLDriverStatusRepository");
const DriverStatusDomainService_1 = require("./domain/services/DriverStatusDomainService");
const UpdateDriverStatusService_1 = require("./application/services/UpdateDriverStatusService");
const UpdateAvailableCapacityService_1 = require("./application/services/UpdateAvailableCapacityService");
const QueryDriverStatusService_1 = require("./application/services/QueryDriverStatusService");
const QueryDriverStatusByZoneService_1 = require("./application/services/QueryDriverStatusByZoneService");
const DriverStatusController_1 = require("./infrastructure/controller/DriverStatusController");
const swaggerConfig_1 = require("./infrastructure/swagger/swaggerConfig");
async function main() {
    try {
        await (0, messageBroker_1.connectKafka)();
        console.log("Kafka connected.");
        const connection = await database_1.default.getConnection();
        console.log("MySQL connected.");
        connection.release();
        const kafkaProducer = new KafkaProducer_1.KafkaProducer();
        const eventPublisher = new EventPublisher_1.EventPublisher(kafkaProducer);
        const kafkaConsumer = new KafkaConsumer_1.KafkaConsumer();
        const driverStatusRepository = new MySQLDriverStatusRepository_1.MySQLDriverStatusRepository();
        const driverStatusDomainService = new DriverStatusDomainService_1.DriverStatusDomainService();
        const updateDriverStatusService = new UpdateDriverStatusService_1.UpdateDriverStatusService(driverStatusRepository, driverStatusDomainService, eventPublisher);
        const updateAvailableCapacityService = new UpdateAvailableCapacityService_1.UpdateAvailableCapacityService(driverStatusRepository, driverStatusDomainService, eventPublisher);
        const queryDriverStatusService = new QueryDriverStatusService_1.QueryDriverStatusService(driverStatusRepository);
        const queryDriverStatusByZoneService = new QueryDriverStatusByZoneService_1.QueryDriverStatusByZoneService(driverStatusRepository);
        const assignmentCreatedConsumer = new AssignmentCreatedConsumer_1.AssignmentCreatedConsumer(kafkaConsumer, driverStatusRepository, driverStatusDomainService);
        assignmentCreatedConsumer.start().catch(err => {
            console.error("Error starting AssignmentCreatedConsumer:", err);
        });
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const driverStatusRouter = (0, DriverStatusController_1.createDriverStatusController)(updateDriverStatusService, updateAvailableCapacityService, queryDriverStatusService, queryDriverStatusByZoneService);
        app.use("/api", driverStatusRouter);
        (0, swaggerConfig_1.setupSwagger)(app);
        const port = process.env.PORT || 4080;
        app.listen(port, () => {
            console.log(`Driver Operations Service is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error starting Driver Operations Service:", error);
        process.exit(1);
    }
}
main();
