/**
 * @flow
 * @relayHash dbe15f7ff0fdaefc9da8ea3e9e7527d4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type callsitesQueryVariables = {|
  path: string,
  exportName: string,
|};
export type callsitesQueryResponse = {|
  +file: ?{|
    +export: ?{|
      +callsites: $ReadOnlyArray<{|
        +path: string
      |}>
    |}
  |}
|};
export type callsitesQuery = {|
  variables: callsitesQueryVariables,
  response: callsitesQueryResponse,
|};
*/


/*
query callsitesQuery(
  $path: String!
  $exportName: String!
) {
  file(path: $path) {
    export(name: $exportName) {
      __typename
      callsites {
        path
        id
      }
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "path",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "exportName",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "path",
    "variableName": "path",
    "type": "String!"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "exportName",
    "type": "String!"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "path",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "callsitesQuery",
  "id": null,
  "text": "query callsitesQuery(\n  $path: String!\n  $exportName: String!\n) {\n  file(path: $path) {\n    export(name: $exportName) {\n      __typename\n      callsites {\n        path\n        id\n      }\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "callsitesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "file",
        "storageKey": null,
        "args": v1,
        "concreteType": "File",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "export",
            "storageKey": null,
            "args": v2,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "callsites",
                "storageKey": null,
                "args": null,
                "concreteType": "File",
                "plural": true,
                "selections": [
                  v3
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "callsitesQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "file",
        "storageKey": null,
        "args": v1,
        "concreteType": "File",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "export",
            "storageKey": null,
            "args": v2,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "callsites",
                "storageKey": null,
                "args": null,
                "concreteType": "File",
                "plural": true,
                "selections": [
                  v3,
                  v4
                ]
              }
            ]
          },
          v4
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4a93017bee618d808686c14d77e5799a';
module.exports = node;
