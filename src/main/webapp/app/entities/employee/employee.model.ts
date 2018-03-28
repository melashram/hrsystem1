import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public dOB?: any,
        public hireDate?: any,
        public title?: string,
    ) {
    }
}
