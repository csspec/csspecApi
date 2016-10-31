import {makeAjaxRequest} from './Ajax';
import config from './config';
import './third_party/json2';
import './third_party/jStorage';

export default class JStorageWrapper {
    constructor(storage) {
        this._storage = storage;
    }

    getItem(key) {
        return this._storage.get(key)
    }

    deleteItem(key) {
        return this._storage.deleteKey(key);
    }

    setItem(key, value) {
        this._storage.set(key, value);
    }

    setTTL(key, timeout) {
        this._storage.setTTL(key, timeout);
    }

    clearTTL(key) {
        this.setTTL(key, 0);
    }

    keys() {
        return this._storage.index();
    }

    listenKeyChange(key, callback) {
        this._storage.listenKeyChange(key, callback);
    }

    stopListeningKey(key) {
        this._storage.stopListening(key);
    }

    log(key) {
        this.listenKeyChange(key, (k, action) => {
            console.log(k + ": " + action);
        })
    }
}
