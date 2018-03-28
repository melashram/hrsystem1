import { BaseEntity } from './../../shared';

export class Ticket implements BaseEntity {
    constructor(
        public id?: number,
        public reason?: string,
        public comment?: string,
        public creationdate?: any,
        public requestStatus?: string,
        public ticket?: number,
        public assignedTo?: string,
        public acceptanceDate?: any,
        public description?: string,
        public request?: BaseEntity,
        public ticketStatus?: BaseEntity,
        public employeeRequest?: BaseEntity,
    ) {
    }
}
