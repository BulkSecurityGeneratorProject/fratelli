import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FratelliColectivoModule } from './colectivo/colectivo.module';
import { FratelliPresupuestoModule } from './presupuesto/presupuesto.module';
import { FratelliChoferModule } from './chofer/chofer.module';
import { FratelliClienteModule } from './cliente/cliente.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FratelliColectivoModule,
        FratelliPresupuestoModule,
        FratelliChoferModule,
        FratelliClienteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FratelliEntityModule {}
