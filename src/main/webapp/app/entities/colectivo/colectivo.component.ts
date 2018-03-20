import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Colectivo } from './colectivo.model';
import { ColectivoService } from './colectivo.service';
import { Principal } from '../../shared';

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
            (res: HttpResponse<Colectivo[]>) => {
                this.colectivos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
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
