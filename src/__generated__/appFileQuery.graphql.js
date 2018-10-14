/**
 * @flow
 * @relayHash 844ab23bdc40e9842e429f18c23b27d9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type appFileQueryVariables = {|
  path: string
|};
export type appFileQueryResponse = {|
  +project: ?{|
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
  project(path: "./fixtures") {
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
  "name": "absolutePath",
  "args": null,
  "storageKey": null
},
v5 = {
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
  "text": "query appFileQuery(\n  $path: String!\n) {\n  project(path: \"./fixtures\") {\n    file(path: $path) {\n      path\n      absolutePath\n      exports {\n        __typename\n        ... on DefaultExport {\n          defaultExportName: name\n        }\n        ... on NamedExport {\n          namedExportName: name\n        }\n      }\n      id\n    }\n  }\n}\n",
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
              v3,
              v4,
              v5
            ]
          }
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
              v3,
              v4,
              v5,
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
(node/*: any*/).hash = '6c6c760bc660265753ed563fc07e1f89';
module.exports = node;
