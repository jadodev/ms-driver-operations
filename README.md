# ms-driver-operations

## Documentación de la API con Swagger

La aplicación incluye documentación interactiva de la API generada con Swagger. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación abriendo tu navegador y navegando a:

**http://localhost:4000/api-doc**

Asegúrate de que la aplicación se esté ejecutando en el puerto configurado para Swagger.

```plaintext
\---src
    |   index.ts
    |
    +---application
    |   +---dto
    |   |       CreateDriverStatusDto.ts
    |   |       DriverStatusDto.ts
    |   |       UpdateAvailableCapacityDto.ts
    |   |       UpdateDriverStatusDto.ts
    |   |
    |   +---mappers
    |   |       DriverStatusMapper.ts
    |   |
    |   +---ports
    |   |   +---in
    |   |   |       IQueryDriverStatusByZoneUseCase.ts
    |   |   |       IQueryDriverStatusUseCase.ts
    |   |   |       IUpdateAvailableCapacityUseCase.ts
    |   |   |       IUpdateDriverStatusUseCase.ts
    |   |   |
    |   |   \---out
    |   |           IDriverStatusRepository.ts
    |   |
    |   \---services
    |           QueryDriverStatusByZoneService.ts
    |           QueryDriverStatusService.ts
    |           UpdateAvailableCapacityService.ts
    |           UpdateDriverStatusService.ts
    |
    +---domain
    |   +---entity
    |   |       DriverStatus.ts
    |   |
    |   +---exceptions
    |   |       DomainError.ts
    |   |
    |   +---services
    |   |       DriverStatusDomainService.ts
    |   |
    |   \---utils
    |           ZoneCalculator.ts
    |
    \---infrastructure
        +---config
        |       database.ts
        |       messageBroker.ts
        |
        +---controller
        |       DriverStatusController.ts
        |
        +---mappers
        |       DriverStatusDataMapper.ts
        |
        +---messaging
        |       AssignmentCreatedConsumer.ts
        |       EventPublisher.ts
        |       KafkaConsumer.ts
        |       KafkaProducer.ts
        |
        +---repository
        |       MySQLDriverStatusRepository.ts
        |
        \---swagger
                swaggerConfig.ts
