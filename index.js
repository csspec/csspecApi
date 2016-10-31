import './src/globals.js';
import './src/third_party/jquery';
import './src/third_party/json2.js';
import './src/third_party/jStorage.js';
import injectApi from './src/injection.js';

// this call will inject the api as global object
injectApi();
