import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Colectivo } from './colectivo.model';
import { ColectivoService } from './colectivo.service';

@Component({
    selector: 'jhi-colectivo-detail',
    templateUrl: './colectivo-detail.component.html'
})
export class ColectivoDetailComponent implements OnInit, OnDestroy {

    colectivo: Colectivo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private colectivoService: ColectivoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInColectivos();
    }

    load(id) {
        this.colectivoService.find(id)
            .subscribe((colectivoResponse: HttpResponse<Colectivo>) => {
                this.colectivo = colectivoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInColectivos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'colectivoListModification',
            (response) => this.load(this.colectivo.id)
        );
    }
}
