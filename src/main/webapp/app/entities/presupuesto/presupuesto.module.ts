import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FratelliSharedModule } from '../../shared';
import {
    PresupuestoService,
    PresupuestoPopupService,
    PresupuestoComponent,
    PresupuestoDetailComponent,
    PresupuestoDialogComponent,
    PresupuestoPopupComponent,
    PresupuestoDeletePopupComponent,
    PresupuestoDeleteDialogComponent,
    presupuestoRoute,
    presupuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...presupuestoRoute,
    ...presupuestoPopupRoute,
];

@NgModule({
    imports: [
        FratelliSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PresupuestoComponent,
        PresupuestoDetailComponent,
        PresupuestoDialogComponent,
        PresupuestoDeleteDialogComponent,
        PresupuestoPopupComponent,
        PresupuestoDeletePopupComponent,
    ],
    entryComponents: [
        PresupuestoComponent,
        PresupuestoDialogComponent,
        PresupuestoPopupComponent,
        PresupuestoDeleteDialogComponent,
        PresupuestoDeletePopupComponent,
    ],
    providers: [
        PresupuestoService,
        PresupuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FratelliPresupuestoModule {}
