import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

es6promise.polyfill();

const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const postJson = async (url, body) => {
    let response = await fetch(url,
        {
            method: 'POST',
            headers: jsonHeaders,
            body: body && typeof body !== 'string' ? JSON.stringify(body) : '',
            credentials: 'same-origin'
        });

    if (response.ok && response.status === 204) {
        return null;
    }

    return await processResponse(response);
};

async function processResponse(response) {
    if (response.ok) {
        return await response.json();
    } else {
        let jsonError = null;

        try {
            jsonError = await response.json();
        }
        catch (e) {
            throw new Error(response.statusText);
        }

        if (jsonError) {
            if (jsonError.errorMessage) {
                const error = new Error(jsonError.errorMessage);
                error.hasMessage = true;
                throw error;
            }
            else if (jsonError.errors) {
                const error = new Error(jsonError.errors);
                error.hasMessage = true;
                throw error;
            }
        }

        throw new Error(response.statusText);
    }
}
