import axios from "axios";

const http = axios.create({
  withCredentials: false,
  baseURL: process.env.API,
  timeout: 10000
});

const setBearerToken = token => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function makeRequest(
    method, 
    url, data, {
        params={}, 
        headers={}, 
        config={}
    } ={}
) {
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        headers["Content-Type"] = "application/json";

        return http[method](url, data, {headers, params, ...config});
    }

    return http[method](url, {headers, params, ...config});
}

const Api = {
    index(entity, page, params = null) {
        return makeRequest('get', `/${entity}`,null, {params: {page, ...params}})
    },
    store(entity, data, params = null) {
        return makeRequest('post', `/${entity}`, data, {params})
    },
    show(entity, id, params = null) {
        return makeRequest('get', `/${entity}/${id}`,null, {params})
    },
    update(entity, id, data, params = null) {
        return makeRequest('put', `/${entity}/${id}`, data, {params})
    },
    destroy(entity, id, params = null) {
        return makeRequest('delete', `/${entity}/${id}`, data, {params})
    }
}


export { 
    http, 
    setBearerToken, 
    makeRequest, 
    Api 
};

