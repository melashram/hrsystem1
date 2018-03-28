import { BaseEntity } from './../../shared';

export class HumanResourceUser implements BaseEntity {
    constructor(
        public id?: number,
        public humanResourcesPosition?: string,
        public humanResourceUser?: BaseEntity,
    ) {
    }
}
