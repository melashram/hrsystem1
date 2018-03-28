import { BaseEntity } from './../../shared';

export class Request implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public department?: BaseEntity,
    ) {
    }
}
