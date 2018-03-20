import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChoferComponent } from './chofer.component';
import { ChoferDetailComponent } from './chofer-detail.component';
import { ChoferPopupComponent } from './chofer-dialog.component';
import { ChoferDeletePopupComponent } from './chofer-delete-dialog.component';

export const choferRoute: Routes = [
    {
        path: 'chofer',
        component: ChoferComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.chofer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chofer/:id',
        component: ChoferDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.chofer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const choferPopupRoute: Routes = [
    {
        path: 'chofer-new',
        component: ChoferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.chofer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chofer/:id/edit',
        component: ChoferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.chofer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chofer/:id/delete',
        component: ChoferDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fratelliApp.chofer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
