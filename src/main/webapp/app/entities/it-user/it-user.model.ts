import { BaseEntity } from './../../shared';

export class ItUser implements BaseEntity {
    constructor(
        public id?: number,
        public itPositon?: string,
        public itUser?: BaseEntity,
    ) {
    }
}
