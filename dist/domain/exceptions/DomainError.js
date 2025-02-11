"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
/**
 * DomainError es la clase base para errores relacionados con las reglas de negocio.
 */
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, new.target.prototype); // Restaura la cadena de prototipos
    }
}
exports.DomainError = DomainError;
