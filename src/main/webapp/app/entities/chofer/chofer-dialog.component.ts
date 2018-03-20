import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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
        private jhiAlertService: JhiAlertService,
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

    private subscribeToSaveResponse(result: Observable<Chofer>) {
        result.subscribe((res: Chofer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Chofer) {
        this.eventManager.broadcast({ name: 'choferListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
