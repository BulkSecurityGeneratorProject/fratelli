import { BaseEntity } from './../../shared';

export class Colectivo implements BaseEntity {
    constructor(
        public id?: number,
        public numeroInterno?: number,
    ) {
    }
}
