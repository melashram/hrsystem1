import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Hrsystem1SharedModule } from '../../shared';
import {
    HumanResourceUserService,
    HumanResourceUserPopupService,
    HumanResourceUserComponent,
    HumanResourceUserDetailComponent,
    HumanResourceUserDialogComponent,
    HumanResourceUserPopupComponent,
    HumanResourceUserDeletePopupComponent,
    HumanResourceUserDeleteDialogComponent,
    humanResourceUserRoute,
    humanResourceUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...humanResourceUserRoute,
    ...humanResourceUserPopupRoute,
];

@NgModule({
    imports: [
        Hrsystem1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HumanResourceUserComponent,
        HumanResourceUserDetailComponent,
        HumanResourceUserDialogComponent,
        HumanResourceUserDeleteDialogComponent,
        HumanResourceUserPopupComponent,
        HumanResourceUserDeletePopupComponent,
    ],
    entryComponents: [
        HumanResourceUserComponent,
        HumanResourceUserDialogComponent,
        HumanResourceUserPopupComponent,
        HumanResourceUserDeleteDialogComponent,
        HumanResourceUserDeletePopupComponent,
    ],
    providers: [
        HumanResourceUserService,
        HumanResourceUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Hrsystem1HumanResourceUserModule {}
