import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HumanResourceUser } from './human-resource-user.model';
import { HumanResourceUserPopupService } from './human-resource-user-popup.service';
import { HumanResourceUserService } from './human-resource-user.service';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-human-resource-user-dialog',
    templateUrl: './human-resource-user-dialog.component.html'
})
export class HumanResourceUserDialogComponent implements OnInit {

    humanResourceUser: HumanResourceUser;
    isSaving: boolean;

    humanresourceusers: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private humanResourceUserService: HumanResourceUserService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService
            .query({filter: 'humanresourceuser-is-null'})
            .subscribe((res: HttpResponse<Employee[]>) => {
                if (!this.humanResourceUser.humanResourceUser || !this.humanResourceUser.humanResourceUser.id) {
                    this.humanresourceusers = res.body;
                } else {
                    this.employeeService
                        .find(this.humanResourceUser.humanResourceUser.id)
                        .subscribe((subRes: HttpResponse<Employee>) => {
                            this.humanresourceusers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.humanResourceUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.humanResourceUserService.update(this.humanResourceUser));
        } else {
            this.subscribeToSaveResponse(
                this.humanResourceUserService.create(this.humanResourceUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<HumanResourceUser>>) {
        result.subscribe((res: HttpResponse<HumanResourceUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: HumanResourceUser) {
        this.eventManager.broadcast({ name: 'humanResourceUserListModification', content: 'OK'});
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
    selector: 'jhi-human-resource-user-popup',
    template: ''
})
export class HumanResourceUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private humanResourceUserPopupService: HumanResourceUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.humanResourceUserPopupService
                    .open(HumanResourceUserDialogComponent as Component, params['id']);
            } else {
                this.humanResourceUserPopupService
                    .open(HumanResourceUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
