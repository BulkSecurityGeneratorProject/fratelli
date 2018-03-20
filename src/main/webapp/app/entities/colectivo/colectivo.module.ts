import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FratelliSharedModule } from '../../shared';
import {
    ColectivoService,
    ColectivoPopupService,
    ColectivoComponent,
    ColectivoDetailComponent,
    ColectivoDialogComponent,
    ColectivoPopupComponent,
    ColectivoDeletePopupComponent,
    ColectivoDeleteDialogComponent,
    colectivoRoute,
    colectivoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...colectivoRoute,
    ...colectivoPopupRoute,
];

@NgModule({
    imports: [
        FratelliSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ColectivoComponent,
        ColectivoDetailComponent,
        ColectivoDialogComponent,
        ColectivoDeleteDialogComponent,
        ColectivoPopupComponent,
        ColectivoDeletePopupComponent,
    ],
    entryComponents: [
        ColectivoComponent,
        ColectivoDialogComponent,
        ColectivoPopupComponent,
        ColectivoDeleteDialogComponent,
        ColectivoDeletePopupComponent,
    ],
    providers: [
        ColectivoService,
        ColectivoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FratelliColectivoModule {}
