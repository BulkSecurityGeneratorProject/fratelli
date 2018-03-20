import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

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
            (res: ResponseWrapper) => {
                this.presupuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
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
