import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Presupuesto } from './presupuesto.model';
import { PresupuestoService } from './presupuesto.service';

@Injectable()
export class PresupuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private presupuestoService: PresupuestoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.presupuestoService.find(id)
                    .subscribe((presupuestoResponse: HttpResponse<Presupuesto>) => {
                        const presupuesto: Presupuesto = presupuestoResponse.body;
                        presupuesto.fechaViaje = this.datePipe
                            .transform(presupuesto.fechaViaje, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.presupuestoModalRef(component, presupuesto);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.presupuestoModalRef(component, new Presupuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    presupuestoModalRef(component: Component, presupuesto: Presupuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.presupuesto = presupuesto;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
