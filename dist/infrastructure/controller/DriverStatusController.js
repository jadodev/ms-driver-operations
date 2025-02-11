"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriverStatusController = createDriverStatusController;
const express_1 = require("express");
/**
 * @swagger
 * tags:
 *   name: DriverStatus
 *   description: Endpoints para gestionar el estado y capacidad de los conductores.
 */
/**
 * @swagger
 * /driver-status/health:
 *   get:
 *     summary: Verifica el estado del servicio de Driver Operations
 *     tags: [DriverStatus]
 *     responses:
 *       200:
 *         description: El servicio está en funcionamiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Driver Operations Service is running
 */
function createDriverStatusController(updateStatusService, updateCapacityService, queryService, queryByZoneService) {
    const router = (0, express_1.Router)();
    router.get('/health', (req, res) => {
        res.json({ status: 'Driver Operations Service is running' });
    });
    /**
     * @swagger
     * /driver-status/status:
     *   patch:
     *     summary: Actualiza la ubicación y estado operativo de un conductor.
     *     tags: [DriverStatus]
     *     requestBody:
     *       description: Datos para actualizar el estado del conductor.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               driverId:
     *                 type: string
     *               currentLocation:
     *                 type: string
     *               transportState:
     *                 type: string
     *     responses:
     *       200:
     *         description: Estado actualizado correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *     400:
     *         description: Error al actualizar el estado.
     */
    router.patch('/status', async (req, res) => {
        try {
            const dto = req.body;
            const updatedStatus = await updateStatusService.execute(dto);
            res.json(updatedStatus);
        }
        catch (error) {
            console.error('Error updating driver status:', error);
            res.status(400).json({ error: error.message });
        }
    });
    /**
     * @swagger
     * /driver-status/capacity:
     *   patch:
     *     summary: Actualiza la capacidad disponible de un conductor.
     *     tags: [DriverStatus]
     *     requestBody:
     *       description: Datos para actualizar la capacidad disponible.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               driverId:
     *                 type: string
     *               availableCapacity:
     *                 type: number
     *     responses:
     *       200:
     *         description: Capacidad actualizada correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *       400:
     *         description: Error al actualizar la capacidad.
     */
    router.patch('/capacity', async (req, res) => {
        try {
            const dto = req.body;
            const updatedStatus = await updateCapacityService.execute(dto);
            res.json(updatedStatus);
        }
        catch (error) {
            console.error('Error updating available capacity:', error);
            res.status(400).json({ error: error.message });
        }
    });
    /**
     * @swagger
     * /driver-status/{driverId}:
     *   get:
     *     summary: Consulta el estado operativo de un conductor por su driverId.
     *     tags: [DriverStatus]
     *     parameters:
     *       - in: path
     *         name: driverId
     *         required: true
     *         schema:
     *           type: string
     *         description: Identificador del conductor.
     *     responses:
     *       200:
     *         description: Estado del conductor obtenido correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *       404:
     *         description: Conductor no encontrado.
     */
    router.get('/:driverId', async (req, res) => {
        try {
            const driverId = req.params.driverId;
            const driverStatus = await queryService.execute(driverId);
            res.json(driverStatus);
        }
        catch (error) {
            console.error('Error querying driver status:', error);
            res.status(404).json({ error: error.message });
        }
    });
    /**
     * @swagger
     * /driver-status/zone/{zone}:
     *   get:
     *     summary: Consulta los conductores por zona.
     *     tags: [DriverStatus]
     *     parameters:
     *       - in: path
     *         name: zone
     *         required: true
     *         schema:
     *           type: string
     *         description: Zona geográfica para la consulta.
     *     responses:
     *       200:
     *         description: Lista de conductores en la zona.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *       400:
     *         description: Error en la consulta por zona.
     */
    router.get('/zone/:zone', async (req, res) => {
        try {
            const zone = req.params.zone;
            const driversInZone = await queryByZoneService.execute(zone);
            res.json(driversInZone);
        }
        catch (error) {
            console.error('Error querying drivers by zone:', error);
            res.status(400).json({ error: error.message });
        }
    });
    return router;
}
