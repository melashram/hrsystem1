import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItUserComponent } from './it-user.component';
import { ItUserDetailComponent } from './it-user-detail.component';
import { ItUserPopupComponent } from './it-user-dialog.component';
import { ItUserDeletePopupComponent } from './it-user-delete-dialog.component';

export const itUserRoute: Routes = [
    {
        path: 'it-user',
        component: ItUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'it-user/:id',
        component: ItUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itUserPopupRoute: Routes = [
    {
        path: 'it-user-new',
        component: ItUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'it-user/:id/edit',
        component: ItUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'it-user/:id/delete',
        component: ItUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
