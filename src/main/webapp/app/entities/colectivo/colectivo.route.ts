import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ColectivoComponent } from './colectivo.component';
import { ColectivoDetailComponent } from './colectivo-detail.component';
import { ColectivoPopupComponent } from './colectivo-dialog.component';
import { ColectivoDeletePopupComponent } from './colectivo-delete-dialog.component';

export const colectivoRoute: Routes = [
    {
        path: 'colectivo',
        component: ColectivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.colectivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'colectivo/:id',
        component: ColectivoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.colectivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colectivoPopupRoute: Routes = [
    {
        path: 'colectivo-new',
        component: ColectivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.colectivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colectivo/:id/edit',
        component: ColectivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.colectivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colectivo/:id/delete',
        component: ColectivoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.colectivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
