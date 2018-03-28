import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { HumanResourceUser } from './human-resource-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<HumanResourceUser>;

@Injectable()
export class HumanResourceUserService {

    private resourceUrl =  SERVER_API_URL + 'api/human-resource-users';

    constructor(private http: HttpClient) { }

    create(humanResourceUser: HumanResourceUser): Observable<EntityResponseType> {
        const copy = this.convert(humanResourceUser);
        return this.http.post<HumanResourceUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(humanResourceUser: HumanResourceUser): Observable<EntityResponseType> {
        const copy = this.convert(humanResourceUser);
        return this.http.put<HumanResourceUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<HumanResourceUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<HumanResourceUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<HumanResourceUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<HumanResourceUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: HumanResourceUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<HumanResourceUser[]>): HttpResponse<HumanResourceUser[]> {
        const jsonResponse: HumanResourceUser[] = res.body;
        const body: HumanResourceUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to HumanResourceUser.
     */
    private convertItemFromServer(humanResourceUser: HumanResourceUser): HumanResourceUser {
        const copy: HumanResourceUser = Object.assign({}, humanResourceUser);
        return copy;
    }

    /**
     * Convert a HumanResourceUser to a JSON which can be sent to the server.
     */
    private convert(humanResourceUser: HumanResourceUser): HumanResourceUser {
        const copy: HumanResourceUser = Object.assign({}, humanResourceUser);
        return copy;
    }
}
