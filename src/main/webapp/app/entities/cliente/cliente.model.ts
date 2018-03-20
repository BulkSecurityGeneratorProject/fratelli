import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public razonSocial?: string,
        public telefono?: string,
        public email?: string,
        public cuit?: string,
    ) {
    }
}
