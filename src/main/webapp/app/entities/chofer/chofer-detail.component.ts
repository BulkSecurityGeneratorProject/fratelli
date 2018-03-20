import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Chofer } from './chofer.model';
import { ChoferService } from './chofer.service';

@Component({
    selector: 'jhi-chofer-detail',
    templateUrl: './chofer-detail.component.html'
})
export class ChoferDetailComponent implements OnInit, OnDestroy {

    chofer: Chofer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private choferService: ChoferService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChofers();
    }

    load(id) {
        this.choferService.find(id).subscribe((chofer) => {
            this.chofer = chofer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChofers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'choferListModification',
            (response) => this.load(this.chofer.id)
        );
    }
}
