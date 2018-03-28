import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Hrsystem1SharedModule } from '../../shared';
import {
    RequestService,
    RequestPopupService,
    RequestComponent,
    RequestDetailComponent,
    RequestDialogComponent,
    RequestPopupComponent,
    RequestDeletePopupComponent,
    RequestDeleteDialogComponent,
    requestRoute,
    requestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...requestRoute,
    ...requestPopupRoute,
];

@NgModule({
    imports: [
        Hrsystem1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestComponent,
        RequestDetailComponent,
        RequestDialogComponent,
        RequestDeleteDialogComponent,
        RequestPopupComponent,
        RequestDeletePopupComponent,
    ],
    entryComponents: [
        RequestComponent,
        RequestDialogComponent,
        RequestPopupComponent,
        RequestDeleteDialogComponent,
        RequestDeletePopupComponent,
    ],
    providers: [
        RequestService,
        RequestPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Hrsystem1RequestModule {}
