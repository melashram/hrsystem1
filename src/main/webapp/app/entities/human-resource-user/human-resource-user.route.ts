import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HumanResourceUserComponent } from './human-resource-user.component';
import { HumanResourceUserDetailComponent } from './human-resource-user-detail.component';
import { HumanResourceUserPopupComponent } from './human-resource-user-dialog.component';
import { HumanResourceUserDeletePopupComponent } from './human-resource-user-delete-dialog.component';

export const humanResourceUserRoute: Routes = [
    {
        path: 'human-resource-user',
        component: HumanResourceUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HumanResourceUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'human-resource-user/:id',
        component: HumanResourceUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HumanResourceUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const humanResourceUserPopupRoute: Routes = [
    {
        path: 'human-resource-user-new',
        component: HumanResourceUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HumanResourceUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'human-resource-user/:id/edit',
        component: HumanResourceUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HumanResourceUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'human-resource-user/:id/delete',
        component: HumanResourceUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HumanResourceUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
