import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chofer } from './chofer.model';
import { ChoferPopupService } from './chofer-popup.service';
import { ChoferService } from './chofer.service';

@Component({
    selector: 'jhi-chofer-dialog',
    templateUrl: './chofer-dialog.component.html'
})
export class ChoferDialogComponent implements OnInit {

    chofer: Chofer;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private choferService: ChoferService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chofer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.choferService.update(this.chofer));
        } else {
            this.subscribeToSaveResponse(
                this.choferService.create(this.chofer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chofer>>) {
        result.subscribe((res: HttpResponse<Chofer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chofer) {
        this.eventManager.broadcast({ name: 'choferListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chofer-popup',
    template: ''
})
export class ChoferPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private choferPopupService: ChoferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.choferPopupService
                    .open(ChoferDialogComponent as Component, params['id']);
            } else {
                this.choferPopupService
                    .open(ChoferDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
