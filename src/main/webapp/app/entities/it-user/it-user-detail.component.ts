import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ItUser } from './it-user.model';
import { ItUserService } from './it-user.service';

@Component({
    selector: 'jhi-it-user-detail',
    templateUrl: './it-user-detail.component.html'
})
export class ItUserDetailComponent implements OnInit, OnDestroy {

    itUser: ItUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private itUserService: ItUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInItUsers();
    }

    load(id) {
        this.itUserService.find(id)
            .subscribe((itUserResponse: HttpResponse<ItUser>) => {
                this.itUser = itUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInItUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'itUserListModification',
            (response) => this.load(this.itUser.id)
        );
    }
}
