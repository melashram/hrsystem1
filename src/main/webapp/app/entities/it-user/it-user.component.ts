import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItUser } from './it-user.model';
import { ItUserService } from './it-user.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-it-user',
    templateUrl: './it-user.component.html'
})
export class ItUserComponent implements OnInit, OnDestroy {
itUsers: ItUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private itUserService: ItUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.itUserService.query().subscribe(
            (res: HttpResponse<ItUser[]>) => {
                this.itUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInItUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ItUser) {
        return item.id;
    }
    registerChangeInItUsers() {
        this.eventSubscriber = this.eventManager.subscribe('itUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
