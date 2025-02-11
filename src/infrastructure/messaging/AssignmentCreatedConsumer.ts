import { KafkaConsumer } from "./KafkaConsumer";
import { MySQLDriverStatusRepository } from "../repository/MySQLDriverStatusRepository";
import { DriverStatusDomainService } from "../../domain/services/DriverStatusDomainService";

/**
 * AssignmentCreatedConsumer escucha eventos "AssignmentCreated" y actualiza el estado del conductor.
 *
 * Al recibir un evento "AssignmentCreated", se extraen los datos necesarios (driverId, pickupLocation)
 * y se actualiza el DriverStatus:
 *   - Se establece la nueva ubicación (pickupLocation).
 *   - Se actualiza el estado a "Recogiendo".
 */
export class AssignmentCreatedConsumer {
  constructor(
    private readonly consumer: KafkaConsumer,
    private readonly repository: MySQLDriverStatusRepository,
    private readonly domainService: DriverStatusDomainService
  ) {}

  /**
   * Inicia la suscripción al topic "assignment.events" y procesa los mensajes.
   */
  public async start(): Promise<void> {
    await this.consumer.subscribe("assignment.events", async (event: any) => {
      try {
        if (event.event !== "AssignmentCreated") {
          console.warn(`Ignored event type: ${event.event}`);
          return;
        }
        const driverId: string = event.driverId;
        const pickupLocation: string = event.pickupLocation;
        const newTransportState: string = "Recogiendo"; 

        const driverStatus = await this.repository.findByDriverId(driverId);
        if (!driverStatus) {
          console.error(`DriverStatus not found for driverId: ${driverId}`);
          return;
        }

        this.domainService.updateDriverStatus(driverStatus, pickupLocation, newTransportState);
        await this.repository.update(driverStatus);

        console.log(`DriverStatus updated for driverId ${driverId}: location set to ${pickupLocation} and state set to ${newTransportState}`);
      } catch (error) {
        console.error("Error processing AssignmentCreated event:", error);
      }
    });
  }
}
