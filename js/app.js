import PhonesPage from './components/PhonesPage.js';

// eslint-disable-next-line no-new
new PhonesPage(
  document.querySelector('[data-component="PhonesPage"]'),
);

// if (false) {
//   const scenario = (ok, fail) => {
//     const clickPromise = new Promise((resolve) => {
//       document.addEventListener('click', resolve);
//     });
//
//     const contextmenuPromise = new Promise(resolve => {
//       document.addEventListener('contextmenu', resolve);
//     });
//
//     clickPromise
//       .then(() => console.log('clicked'));
//
//     contextmenuPromise
//       .then(() => console.log('contextmenu'));
//
//     Promise.all([clickPromise, contextmenuPromise])
//       .then(ok);
//
//     setTimeout(fail, 4000);
//   };
//
//
//   const myPromise = new Promise(scenario);
//
//
//   myPromise
//     .then(
//       () => console.log('OK'),
//       () => console.log('ERROR'),
//     );
// }
//
//
// if (false) {
//   const API_URL = 'https://mgrinko.github.io/js-20190221/api/phones.json';
//
//
//   fetch(API_URL)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     });
//
//   const WAITING = 'waiting';
//   const SUCCEEDED = 'succeeded';
//   const FAILED = 'failed';
//
//   const promise = {
//     result: null,
//     status: WAITING,
//     successCallback: [],
//     errorCallbacks: [],
//
//     then(callback) {
//       if (this.status === WAITING) {
//         this.successCallback.push(callback);
//       } else {
//         callback(this.result);
//       }
//     },
//
//     catch(callback) {
//       this.errorCallbacks.push(callback);
//     },
//
//     succeed(data) {
//       if (this.status !== WAITING) return;
//
//       this.status = SUCCEEDED;
//       this.result = data;
//
//       for (const callback of this.successCallback) {
//         callback(data);
//       }
//     },
//     fail(data) {
//       if (this.status !== WAITING) {
//         return;
//       }
//
//       this.status = FAILED;
//       this.result = data;
//
//       for (const callback of this.errorCallbacks) {
//         callback(data);
//       }
//     },
//   };
//
//   setTimeout(() => {
//     promise.then(data => console.log(`Success 3 ${data}`));
//   }, 5000);
//
//   promise.then((data) => {
//     console.log(`Success 1 ${data}`);
//   });
//   promise.then((data) => {
//     console.log(`Success 2 ${data}`);
//   });
//   promise.catch((data) => {
//     console.log(`Error 1 ${data}`);
//   });
//
//   promise.succeed(999);
// }
