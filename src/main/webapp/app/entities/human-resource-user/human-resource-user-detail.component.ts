import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { HumanResourceUser } from './human-resource-user.model';
import { HumanResourceUserService } from './human-resource-user.service';

@Component({
    selector: 'jhi-human-resource-user-detail',
    templateUrl: './human-resource-user-detail.component.html'
})
export class HumanResourceUserDetailComponent implements OnInit, OnDestroy {

    humanResourceUser: HumanResourceUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private humanResourceUserService: HumanResourceUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHumanResourceUsers();
    }

    load(id) {
        this.humanResourceUserService.find(id)
            .subscribe((humanResourceUserResponse: HttpResponse<HumanResourceUser>) => {
                this.humanResourceUser = humanResourceUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHumanResourceUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'humanResourceUserListModification',
            (response) => this.load(this.humanResourceUser.id)
        );
    }
}
