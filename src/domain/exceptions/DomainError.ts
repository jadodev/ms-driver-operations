/**
 * DomainError es la clase base para errores relacionados con las reglas de negocio.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
    Object.setPrototypeOf(this, new.target.prototype); // Restaura la cadena de prototipos
  }
}
