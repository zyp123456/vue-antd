import cookie from "js-cookie";

/**
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
// token存储位置localStorage sessionStorage cookie
const storage = "sessionStorage";

export function getAccessToken(name) {
    if (storage) {
        if ("localStorage" === storage) {
            return localStorage.getItem(name);
        } else if ("sessionStorage" === storage) {
            return sessionStorage.getItem(name);
        } else if ("cookie" === storage) {
            return cookie.get(name);
        } else {
            return localStorage.getItem(name);
        }
    } else {
        return localStorage.getItem(name);
    }
}

/**
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(name, accessToken) {
    if (storage) {
        if ("localStorage" === storage) {
            return localStorage.setItem(name, accessToken);
        } else if ("sessionStorage" === storage) {
            return sessionStorage.setItem(name, accessToken);
        } else if ("cookie" === storage) {
            return cookie.set(name, accessToken);
        } else {
            return localStorage.setItem(name, accessToken);
        }
    } else {
        return localStorage.setItem(name, accessToken);
    }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken(name) {
    if (storage) {
        if ("localStorage" === storage) {
            // return localStorage.removeItem(name);
            return localStorage.clear();
        } else if ("sessionStorage" === storage) {
            return sessionStorage.clear();
        } else if ("cookie" === storage) {
            return cookie.remove(name);
        } else {
            // return localStorage.removeItem(name);
            return localStorage.clear();
        }
    } else {
        // return localStorage.removeItem(name);
        return localStorage.clear();
    }
}