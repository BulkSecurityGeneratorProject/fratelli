import { BaseEntity } from './../../shared';

export const enum EstadoPresupuestoEnum {
    'NO_CONFIRMADO',
    'CONFIRMADO',
    'ANULADO'
}

export class Presupuesto implements BaseEntity {
    constructor(
        public id?: number,
        public monto?: number,
        public cantidadPasajeros?: number,
        public origen?: string,
        public destino?: string,
        public cantidadDias?: number,
        public hayMovimineto?: boolean,
        public fechaViaje?: any,
        public kilometros?: number,
        public estado?: EstadoPresupuestoEnum,
        public cliente?: BaseEntity,
        public chofer?: BaseEntity,
        public colectivo?: BaseEntity,
    ) {
        this.hayMovimineto = false;
    }
}
