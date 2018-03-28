import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Hrsystem1EmployeeModule } from './employee/employee.module';
import { Hrsystem1ItUserModule } from './it-user/it-user.module';
import { Hrsystem1HumanResourceUserModule } from './human-resource-user/human-resource-user.module';
import { Hrsystem1RequestModule } from './request/request.module';
import { Hrsystem1DepartmentModule } from './department/department.module';
import { Hrsystem1TicketStatusModule } from './ticket-status/ticket-status.module';
import { Hrsystem1TicketModule } from './ticket/ticket.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Hrsystem1EmployeeModule,
        Hrsystem1ItUserModule,
        Hrsystem1HumanResourceUserModule,
        Hrsystem1RequestModule,
        Hrsystem1DepartmentModule,
        Hrsystem1TicketStatusModule,
        Hrsystem1TicketModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Hrsystem1EntityModule {}
