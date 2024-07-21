// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiurl: "http://localhost:55001/",
  // apiurl: "http://103.245.200.92:50004/",
  socketConfig:{url:"http://localhost:55001",options:{}},
  signaturepath:'http://192.168.1.179/healaxyuploads/phrdata/Signature/',
  HttpPath: 'http://192.168.1.179/healaxyuploads/',
  // media_path1:'http://192.168.1.123/healaxy/h~~~id/hospitalData/media/',
  media_path:'http://192.168.1.179/healaxyuploads/',
  accounturl:'http://localhost:4200/#/manageaccount?id=',
 documenturl:'http://localhost:4200/#/documentview?id=',
 providerpath:'http://192.168.1.123/healaxy/h~~~id/providerData/p~~~id/profilepicture/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
