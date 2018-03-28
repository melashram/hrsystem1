import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HumanResourceUser } from './human-resource-user.model';
import { HumanResourceUserService } from './human-resource-user.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-human-resource-user',
    templateUrl: './human-resource-user.component.html'
})
export class HumanResourceUserComponent implements OnInit, OnDestroy {
humanResourceUsers: HumanResourceUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private humanResourceUserService: HumanResourceUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.humanResourceUserService.query().subscribe(
            (res: HttpResponse<HumanResourceUser[]>) => {
                this.humanResourceUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHumanResourceUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: HumanResourceUser) {
        return item.id;
    }
    registerChangeInHumanResourceUsers() {
        this.eventSubscriber = this.eventManager.subscribe('humanResourceUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
