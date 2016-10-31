import JStorageWrapper from './store.js';
import CacheStore from './api.js';

export default function injectApi() {
    if (window._injected) {
        console.warn("Store was injected twice");
        return;
    }

    window.csspecApi = new CacheStore(new JStorageWrapper(window.$.jStorage));
    window._injected = true;
}
