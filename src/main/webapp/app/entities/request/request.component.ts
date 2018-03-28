import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Request } from './request.model';
import { RequestService } from './request.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-request',
    templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit, OnDestroy {
requests: Request[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private requestService: RequestService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.requestService.query().subscribe(
            (res: HttpResponse<Request[]>) => {
                this.requests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Request) {
        return item.id;
    }
    registerChangeInRequests() {
        this.eventSubscriber = this.eventManager.subscribe('requestListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
