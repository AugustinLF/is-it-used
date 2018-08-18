/**
 * @flow
 * @relayHash 494f02e0b547553a6867eef7359e009e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fileListQueryVariables = {||};
export type fileListQueryResponse = {|
  +files: $ReadOnlyArray<{|
    +path: string
  |}>
|};
export type fileListQuery = {|
  variables: fileListQueryVariables,
  response: fileListQueryResponse,
|};
*/


/*
query fileListQuery {
  files {
    path
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
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
  "text": "query fileListQuery {\n  files {\n    path\n    id\n  }\n}\n",
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
        "name": "files",
        "storageKey": null,
        "args": null,
        "concreteType": "File",
        "plural": true,
        "selections": [
          v0
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
        "name": "files",
        "storageKey": null,
        "args": null,
        "concreteType": "File",
        "plural": true,
        "selections": [
          v0,
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
};
})();
// prettier-ignore
(node/*: any*/).hash = '65f35bc8d7b1929ab8d2328f0a838193';
module.exports = node;
