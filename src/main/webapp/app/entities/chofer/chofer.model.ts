import { BaseEntity } from './../../shared';

export class Chofer implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public legajo?: number,
    ) {
    }
}
