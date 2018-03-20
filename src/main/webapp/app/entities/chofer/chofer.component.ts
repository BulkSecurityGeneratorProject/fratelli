import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Chofer } from './chofer.model';
import { ChoferService } from './chofer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-chofer',
    templateUrl: './chofer.component.html'
})
export class ChoferComponent implements OnInit, OnDestroy {
chofers: Chofer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private choferService: ChoferService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.choferService.query().subscribe(
            (res: HttpResponse<Chofer[]>) => {
                this.chofers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChofers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Chofer) {
        return item.id;
    }
    registerChangeInChofers() {
        this.eventSubscriber = this.eventManager.subscribe('choferListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
