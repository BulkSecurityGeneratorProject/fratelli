import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-presupuesto',
    templateUrl: './presupuesto.component.html'
})
export class PresupuestoComponent implements OnInit, OnDestroy {
presupuestos: Presupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private presupuestoService: PresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.presupuestoService.query().subscribe(
            (res: HttpResponse<Presupuesto[]>) => {
                this.presupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Presupuesto) {
        return item.id;
    }
    registerChangeInPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('presupuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
