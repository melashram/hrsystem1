import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { HumanResourceUser } from './human-resource-user.model';
import { HumanResourceUserService } from './human-resource-user.service';

@Injectable()
export class HumanResourceUserPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private humanResourceUserService: HumanResourceUserService

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
                this.humanResourceUserService.find(id)
                    .subscribe((humanResourceUserResponse: HttpResponse<HumanResourceUser>) => {
                        const humanResourceUser: HumanResourceUser = humanResourceUserResponse.body;
                        this.ngbModalRef = this.humanResourceUserModalRef(component, humanResourceUser);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.humanResourceUserModalRef(component, new HumanResourceUser());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    humanResourceUserModalRef(component: Component, humanResourceUser: HumanResourceUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.humanResourceUser = humanResourceUser;
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
