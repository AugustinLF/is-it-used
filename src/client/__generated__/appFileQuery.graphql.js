/**
 * @flow
 * @relayHash 1f428d6312fb8ebf84d81e0cbc60ac06
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type appFileQueryVariables = {|
  path: string
|};
export type appFileQueryResponse = {|
  +file: ?{|
    +path: string,
    +absolutePath: string,
    +exports: $ReadOnlyArray<{|
      +__typename: "DefaultExport",
      +defaultExportName: ?string,
    |} | {|
      +__typename: "NamedExport",
      +namedExportName: string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other"
    |}>,
  |}
|};
export type appFileQuery = {|
  variables: appFileQueryVariables,
  response: appFileQueryResponse,
|};
*/


/*
query appFileQuery(
  $path: String!
) {
  file(path: $path) {
    path
    absolutePath
    exports {
      __typename
      ... on DefaultExport {
        defaultExportName: name
      }
      ... on NamedExport {
        namedExportName: name
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "path",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "absolutePath",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "exports",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "type": "NamedExport",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "namedExportName",
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "InlineFragment",
      "type": "DefaultExport",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "defaultExportName",
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "appFileQuery",
  "id": null,
  "text": "query appFileQuery(\n  $path: String!\n) {\n  file(path: $path) {\n    path\n    absolutePath\n    exports {\n      __typename\n      ... on DefaultExport {\n        defaultExportName: name\n      }\n      ... on NamedExport {\n        namedExportName: name\n      }\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "appFileQuery",
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
          v2,
          v3,
          v4
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "appFileQuery",
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
          v2,
          v3,
          v4,
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
(node/*: any*/).hash = '9169cf49f2a7b7f843e899dc9aafbf9d';
module.exports = node;
