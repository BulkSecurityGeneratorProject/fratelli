import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Colectivo } from './colectivo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ColectivoService {

    private resourceUrl = SERVER_API_URL + 'api/colectivos';

    constructor(private http: Http) { }

    create(colectivo: Colectivo): Observable<Colectivo> {
        const copy = this.convert(colectivo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(colectivo: Colectivo): Observable<Colectivo> {
        const copy = this.convert(colectivo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Colectivo> {
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
     * Convert a returned JSON object to Colectivo.
     */
    private convertItemFromServer(json: any): Colectivo {
        const entity: Colectivo = Object.assign(new Colectivo(), json);
        return entity;
    }

    /**
     * Convert a Colectivo to a JSON which can be sent to the server.
     */
    private convert(colectivo: Colectivo): Colectivo {
        const copy: Colectivo = Object.assign({}, colectivo);
        return copy;
    }
}
