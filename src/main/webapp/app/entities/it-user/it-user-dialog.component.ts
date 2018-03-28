import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItUser } from './it-user.model';
import { ItUserPopupService } from './it-user-popup.service';
import { ItUserService } from './it-user.service';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-it-user-dialog',
    templateUrl: './it-user-dialog.component.html'
})
export class ItUserDialogComponent implements OnInit {

    itUser: ItUser;
    isSaving: boolean;

    itusers: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private itUserService: ItUserService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService
            .query({filter: 'ituser-is-null'})
            .subscribe((res: HttpResponse<Employee[]>) => {
                if (!this.itUser.itUser || !this.itUser.itUser.id) {
                    this.itusers = res.body;
                } else {
                    this.employeeService
                        .find(this.itUser.itUser.id)
                        .subscribe((subRes: HttpResponse<Employee>) => {
                            this.itusers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.itUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.itUserService.update(this.itUser));
        } else {
            this.subscribeToSaveResponse(
                this.itUserService.create(this.itUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ItUser>>) {
        result.subscribe((res: HttpResponse<ItUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ItUser) {
        this.eventManager.broadcast({ name: 'itUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-it-user-popup',
    template: ''
})
export class ItUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itUserPopupService: ItUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.itUserPopupService
                    .open(ItUserDialogComponent as Component, params['id']);
            } else {
                this.itUserPopupService
                    .open(ItUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
