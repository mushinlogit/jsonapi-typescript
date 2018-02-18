import * as JSONAPI from './index';

// angular 4 http client`
const url = '';
this.httpClient
    .get<JSONAPI.DocWithData<T | T[]>>(url)
    .map((resp) => resp.data)
    .map((data) => {
        if (Array.isArray(data)) {
            return data.map((el) => el.attributes);
        } else {
            return data.attributes;
        }
    });
};
