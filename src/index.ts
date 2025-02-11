import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import pool from './infrastructure/config/database';
import { connectKafka } from './infrastructure/config/messageBroker';
import { KafkaProducer } from './infrastructure/messaging/KafkaProducer';
import { EventPublisher } from './infrastructure/messaging/EventPublisher';
import { KafkaConsumer } from './infrastructure/messaging/KafkaConsumer';
import { AssignmentCreatedConsumer } from './infrastructure/messaging/AssignmentCreatedConsumer';
import { MySQLDriverStatusRepository } from './infrastructure/repository/MySQLDriverStatusRepository';
import { DriverStatusDomainService } from './domain/services/DriverStatusDomainService';
import { UpdateDriverStatusService } from './application/services/UpdateDriverStatusService';
import { UpdateAvailableCapacityService } from './application/services/UpdateAvailableCapacityService';
import { QueryDriverStatusService } from './application/services/QueryDriverStatusService';
import { QueryDriverStatusByZoneService } from './application/services/QueryDriverStatusByZoneService';
import { createDriverStatusController } from './infrastructure/controller/DriverStatusController';
import { setupSwagger } from './infrastructure/swagger/swaggerConfig';

async function main() {
  try {
    await connectKafka();
    console.log("Kafka connected.");

    const connection = await pool.getConnection();
    console.log("MySQL connected.");
    connection.release();

    const kafkaProducer = new KafkaProducer();
    const eventPublisher = new EventPublisher(kafkaProducer);
    const kafkaConsumer = new KafkaConsumer();

    const driverStatusRepository = new MySQLDriverStatusRepository();
    const driverStatusDomainService = new DriverStatusDomainService();

    const updateDriverStatusService = new UpdateDriverStatusService(
      driverStatusRepository,
      driverStatusDomainService,
      eventPublisher
    );
    const updateAvailableCapacityService = new UpdateAvailableCapacityService(
      driverStatusRepository,
      driverStatusDomainService,
      eventPublisher
    );
    const queryDriverStatusService = new QueryDriverStatusService(driverStatusRepository);

    const queryDriverStatusByZoneService = new QueryDriverStatusByZoneService(driverStatusRepository);


    const assignmentCreatedConsumer = new AssignmentCreatedConsumer(
      kafkaConsumer,
      driverStatusRepository,
      driverStatusDomainService
    );
    assignmentCreatedConsumer.start().catch(err => {
      console.error("Error starting AssignmentCreatedConsumer:", err);
    });

    const app: Application = express();
    app.use(express.json());

    const driverStatusRouter = createDriverStatusController(
      updateDriverStatusService,
      updateAvailableCapacityService,
      queryDriverStatusService,
      queryDriverStatusByZoneService
    );
    app.use("/api", driverStatusRouter);

    setupSwagger(app);

    const port = process.env.PORT || 4080;
    app.listen(port, () => {
      console.log(`Driver Operations Service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting Driver Operations Service:", error);
    process.exit(1);
  }
}

main();
