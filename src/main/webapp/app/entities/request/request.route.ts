import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RequestComponent } from './request.component';
import { RequestDetailComponent } from './request-detail.component';
import { RequestPopupComponent } from './request-dialog.component';
import { RequestDeletePopupComponent } from './request-delete-dialog.component';

export const requestRoute: Routes = [
    {
        path: 'request',
        component: RequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requests'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'request/:id',
        component: RequestDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestPopupRoute: Routes = [
    {
        path: 'request-new',
        component: RequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request/:id/edit',
        component: RequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request/:id/delete',
        component: RequestDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
