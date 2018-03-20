import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoDetailComponent } from './presupuesto-detail.component';
import { PresupuestoPopupComponent } from './presupuesto-dialog.component';
import { PresupuestoDeletePopupComponent } from './presupuesto-delete-dialog.component';

export const presupuestoRoute: Routes = [
    {
        path: 'presupuesto',
        component: PresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.presupuesto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'presupuesto/:id',
        component: PresupuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.presupuesto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoPopupRoute: Routes = [
    {
        path: 'presupuesto-new',
        component: PresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.presupuesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presupuesto/:id/edit',
        component: PresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.presupuesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presupuesto/:id/delete',
        component: PresupuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.presupuesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
