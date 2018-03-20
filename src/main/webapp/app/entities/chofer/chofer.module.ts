import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FratelliSharedModule } from '../../shared';
import {
    ChoferService,
    ChoferPopupService,
    ChoferComponent,
    ChoferDetailComponent,
    ChoferDialogComponent,
    ChoferPopupComponent,
    ChoferDeletePopupComponent,
    ChoferDeleteDialogComponent,
    choferRoute,
    choferPopupRoute,
} from './';

const ENTITY_STATES = [
    ...choferRoute,
    ...choferPopupRoute,
];

@NgModule({
    imports: [
        FratelliSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChoferComponent,
        ChoferDetailComponent,
        ChoferDialogComponent,
        ChoferDeleteDialogComponent,
        ChoferPopupComponent,
        ChoferDeletePopupComponent,
    ],
    entryComponents: [
        ChoferComponent,
        ChoferDialogComponent,
        ChoferPopupComponent,
        ChoferDeleteDialogComponent,
        ChoferDeletePopupComponent,
    ],
    providers: [
        ChoferService,
        ChoferPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FratelliChoferModule {}
