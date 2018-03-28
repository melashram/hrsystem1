import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Hrsystem1SharedModule } from '../../shared';
import {
    TicketService,
    TicketPopupService,
    TicketComponent,
    TicketDetailComponent,
    TicketDialogComponent,
    TicketPopupComponent,
    TicketDeletePopupComponent,
    TicketDeleteDialogComponent,
    ticketRoute,
    ticketPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ticketRoute,
    ...ticketPopupRoute,
];

@NgModule({
    imports: [
        Hrsystem1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TicketComponent,
        TicketDetailComponent,
        TicketDialogComponent,
        TicketDeleteDialogComponent,
        TicketPopupComponent,
        TicketDeletePopupComponent,
    ],
    entryComponents: [
        TicketComponent,
        TicketDialogComponent,
        TicketPopupComponent,
        TicketDeleteDialogComponent,
        TicketDeletePopupComponent,
    ],
    providers: [
        TicketService,
        TicketPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Hrsystem1TicketModule {}
