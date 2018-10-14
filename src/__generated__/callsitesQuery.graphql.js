/**
 * @flow
 * @relayHash 9885c9a64ccf7c2bdf672139ccedbf74
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type callSitesQueryVariables = {|
  path: string,
  exportName: string,
|};
export type callSitesQueryResponse = {|
  +project: ?{|
    +file: ?{|
      +export: ?{|
        +callSites: $ReadOnlyArray<{|
          +path: string
        |}>
      |}
    |}
  |}
|};
export type callSitesQuery = {|
  variables: callSitesQueryVariables,
  response: callSitesQueryResponse,
|};
*/


/*
query callSitesQuery(
  $path: String!
  $exportName: String!
) {
  project(path: "./fixtures") {
    file(path: $path) {
      export(name: $exportName) {
        __typename
        callSites {
          path
          id
        }
      }
      id
    }
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
    "kind": "Literal",
    "name": "path",
    "value": "./fixtures",
    "type": "String!"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "path",
    "variableName": "path",
    "type": "String!"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "exportName",
    "type": "String!"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "path",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "callSitesQuery",
  "id": null,
  "text": "query callSitesQuery(\n  $path: String!\n  $exportName: String!\n) {\n  project(path: \"./fixtures\") {\n    file(path: $path) {\n      export(name: $exportName) {\n        __typename\n        callSites {\n          path\n          id\n        }\n      }\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "callSitesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "project",
        "storageKey": "project(path:\"./fixtures\")",
        "args": v1,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "file",
            "storageKey": null,
            "args": v2,
            "concreteType": "File",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "export",
                "storageKey": null,
                "args": v3,
                "concreteType": null,
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "callSites",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "File",
                    "plural": true,
                    "selections": [
                      v4
                    ]
                  }
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
    "name": "callSitesQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "project",
        "storageKey": "project(path:\"./fixtures\")",
        "args": v1,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "file",
            "storageKey": null,
            "args": v2,
            "concreteType": "File",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "export",
                "storageKey": null,
                "args": v3,
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
                    "name": "callSites",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "File",
                    "plural": true,
                    "selections": [
                      v4,
                      v5
                    ]
                  }
                ]
              },
              v5
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4378fa1a6795c8eedb96d7a659875e5e';
module.exports = node;
