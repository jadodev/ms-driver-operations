"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentCreatedConsumer = void 0;
/**
 * AssignmentCreatedConsumer escucha eventos "AssignmentCreated" y actualiza el estado del conductor.
 *
 * Al recibir un evento "AssignmentCreated", se extraen los datos necesarios (driverId, pickupLocation)
 * y se actualiza el DriverStatus:
 *   - Se establece la nueva ubicación (pickupLocation).
 *   - Se actualiza el estado a "Recogiendo".
 */
class AssignmentCreatedConsumer {
    constructor(consumer, repository, domainService) {
        this.consumer = consumer;
        this.repository = repository;
        this.domainService = domainService;
    }
    /**
     * Inicia la suscripción al topic "assignment.events" y procesa los mensajes.
     */
    async start() {
        await this.consumer.subscribe("assignment.events", async (event) => {
            try {
                if (event.event !== "AssignmentCreated") {
                    console.warn(`Ignored event type: ${event.event}`);
                    return;
                }
                const driverId = event.driverId;
                const pickupLocation = event.pickupLocation;
                const newTransportState = "Recogiendo";
                const driverStatus = await this.repository.findByDriverId(driverId);
                if (!driverStatus) {
                    console.error(`DriverStatus not found for driverId: ${driverId}`);
                    return;
                }
                this.domainService.updateDriverStatus(driverStatus, pickupLocation, newTransportState);
                await this.repository.update(driverStatus);
                console.log(`DriverStatus updated for driverId ${driverId}: location set to ${pickupLocation} and state set to ${newTransportState}`);
            }
            catch (error) {
                console.error("Error processing AssignmentCreated event:", error);
            }
        });
    }
}
exports.AssignmentCreatedConsumer = AssignmentCreatedConsumer;
