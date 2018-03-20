import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Presupuesto>;

@Injectable()
export class PresupuestoService {

    private resourceUrl =  SERVER_API_URL + 'api/presupuestos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(presupuesto: Presupuesto): Observable<EntityResponseType> {
        const copy = this.convert(presupuesto);
        return this.http.post<Presupuesto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(presupuesto: Presupuesto): Observable<EntityResponseType> {
        const copy = this.convert(presupuesto);
        return this.http.put<Presupuesto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Presupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Presupuesto[]>> {
        const options = createRequestOption(req);
        return this.http.get<Presupuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Presupuesto[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Presupuesto = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Presupuesto[]>): HttpResponse<Presupuesto[]> {
        const jsonResponse: Presupuesto[] = res.body;
        const body: Presupuesto[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Presupuesto.
     */
    private convertItemFromServer(presupuesto: Presupuesto): Presupuesto {
        const copy: Presupuesto = Object.assign({}, presupuesto);
        copy.fechaViaje = this.dateUtils
            .convertDateTimeFromServer(presupuesto.fechaViaje);
        return copy;
    }

    /**
     * Convert a Presupuesto to a JSON which can be sent to the server.
     */
    private convert(presupuesto: Presupuesto): Presupuesto {
        const copy: Presupuesto = Object.assign({}, presupuesto);

        copy.fechaViaje = this.dateUtils.toDate(presupuesto.fechaViaje);
        return copy;
    }
}
