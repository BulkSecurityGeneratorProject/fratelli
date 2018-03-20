import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Chofer } from './chofer.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ChoferService {

    private resourceUrl = SERVER_API_URL + 'api/chofers';

    constructor(private http: Http) { }

    create(chofer: Chofer): Observable<Chofer> {
        const copy = this.convert(chofer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(chofer: Chofer): Observable<Chofer> {
        const copy = this.convert(chofer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Chofer> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Chofer.
     */
    private convertItemFromServer(json: any): Chofer {
        const entity: Chofer = Object.assign(new Chofer(), json);
        return entity;
    }

    /**
     * Convert a Chofer to a JSON which can be sent to the server.
     */
    private convert(chofer: Chofer): Chofer {
        const copy: Chofer = Object.assign({}, chofer);
        return copy;
    }
}
