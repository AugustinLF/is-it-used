/**
 * @flow
 * @relayHash cb81381d921ce8779446845272622d42
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fileListQueryVariables = {||};
export type fileListQueryResponse = {|
  +project: ?{|
    +files: $ReadOnlyArray<{|
      +path: string
    |}>
  |}
|};
export type fileListQuery = {|
  variables: fileListQueryVariables,
  response: fileListQueryResponse,
|};
*/


/*
query fileListQuery {
  project(path: "./fixtures") {
    files {
      path
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "path",
    "value": "./fixtures",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "path",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "fileListQuery",
  "id": null,
  "text": "query fileListQuery {\n  project(path: \"./fixtures\") {\n    files {\n      path\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "fileListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "project",
        "storageKey": "project(path:\"./fixtures\")",
        "args": v0,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "files",
            "storageKey": null,
            "args": null,
            "concreteType": "File",
            "plural": true,
            "selections": [
              v1
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "fileListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "project",
        "storageKey": "project(path:\"./fixtures\")",
        "args": v0,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "files",
            "storageKey": null,
            "args": null,
            "concreteType": "File",
            "plural": true,
            "selections": [
              v1,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '092c9053d60ae582dc8173a8c56cf28e';
module.exports = node;
