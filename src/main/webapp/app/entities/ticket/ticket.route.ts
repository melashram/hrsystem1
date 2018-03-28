import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketPopupComponent } from './ticket-dialog.component';
import { TicketDeletePopupComponent } from './ticket-delete-dialog.component';

export const ticketRoute: Routes = [
    {
        path: 'ticket',
        component: TicketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ticket/:id',
        component: TicketDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ticketPopupRoute: Routes = [
    {
        path: 'ticket-new',
        component: TicketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ticket/:id/edit',
        component: TicketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ticket/:id/delete',
        component: TicketDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
