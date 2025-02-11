import { Router, Request, Response } from 'express';
import { UpdateDriverStatusService } from '../../application/services/UpdateDriverStatusService';
import { UpdateAvailableCapacityService } from '../../application/services/UpdateAvailableCapacityService';
import { QueryDriverStatusService } from '../../application/services/QueryDriverStatusService';
import { QueryDriverStatusByZoneService } from '../../application/services/QueryDriverStatusByZoneService';

/**
 * Crea y configura un router Express para el microservicio Driver Operations Service.
 *
 * Endpoints:
 *  - GET /driver-status/health: Devuelve un mensaje de salud del servicio.
 *  - PATCH /driver-status/status: Actualiza la ubicación y el estado operativo (transport state) de un conductor.
 *  - PATCH /driver-status/capacity: Actualiza la capacidad disponible del conductor.
 *  - GET /driver-status/:driverId: Consulta el estado operativo de un conductor por su driverId.
 *
 */
export function createDriverStatusController(
  updateStatusService: UpdateDriverStatusService,
  updateCapacityService: UpdateAvailableCapacityService,
  queryService: QueryDriverStatusService,
  queryByZoneService: QueryDriverStatusByZoneService
): Router {
  const router = Router();

  router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Driver Operations Service is running' });
  });

  router.patch('/status', async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const updatedStatus = await updateStatusService.execute(dto);
      res.json(updatedStatus);
    } catch (error: any) {
      console.error('Error updating driver status:', error);
      res.status(400).json({ error: error.message });
    }
  });

  router.patch('/capacity', async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const updatedStatus = await updateCapacityService.execute(dto);
      res.json(updatedStatus);
    } catch (error: any) {
      console.error('Error updating available capacity:', error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/:driverId', async (req: Request, res: Response) => {
    try {
      const driverId = req.params.driverId;
      const driverStatus = await queryService.execute(driverId);
      res.json(driverStatus);
    } catch (error: any) {
      console.error('Error querying driver status:', error);
      res.status(404).json({ error: error.message });
    }
  });

  router.get('/zone/:zone', async (req: Request, res: Response) => {
    try {
      const zone = req.params.zone;
      const driversInZone = await queryByZoneService.execute(zone);
      res.json(driversInZone);
    } catch (error: any) {
      console.error('Error querying drivers by zone:', error);
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
