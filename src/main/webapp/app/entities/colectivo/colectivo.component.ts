import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Colectivo } from './colectivo.model';
import { ColectivoService } from './colectivo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-colectivo',
    templateUrl: './colectivo.component.html'
})
export class ColectivoComponent implements OnInit, OnDestroy {
colectivos: Colectivo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private colectivoService: ColectivoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.colectivoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.colectivos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInColectivos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Colectivo) {
        return item.id;
    }
    registerChangeInColectivos() {
        this.eventSubscriber = this.eventManager.subscribe('colectivoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
