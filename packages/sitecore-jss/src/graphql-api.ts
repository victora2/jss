import { DocumentNode, print } from 'graphql';
import gql from 'graphql-tag';
import { GraphQLRequestClient } from './graphql-request-client';

const DEFAULTS = Object.freeze({
  pageSize: 10,
});

/**
 * Search query parameters
 */
export interface SearchQueryParams {
  /**
   * The GUID of the Sitecore item to use as the root for the search query.
   * @default The GUID of the root item of the specified Sitecore site.
   */
  rootItemId?: string;

  /**
   * How many items to return for each query call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;

  language?: string;

  templates?: string;
}

/**
 * Search query result
 */
export type SearchQueryResult<T> = {
  search: {
    pageInfo: {
      endCursor: string;
      hasNext: boolean;
    };
    results: T[];
  };
};

export class EdgeClient extends GraphQLRequestClient {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async doSearchQuery<T>(
    { rootItemId, language, pageSize, templates }: SearchQueryParams,
    itemFragment: DocumentNode
  ): Promise<T[]> {
    const results: T[] = [];
    let hasNext = true;
    let after = '';
    const searchQuery = print(getSearchQuery(itemFragment));

    while (hasNext) {
      const fetchResponse = await this.request<SearchQueryResult<T>>(searchQuery, {
        // `search` query only works with lowercase GUIDs
        rootItemId: rootItemId?.toLowerCase(),
        language,
        templates,
        pageSize: pageSize !== undefined ? pageSize : DEFAULTS.pageSize,
        after,
      });

      results.concat(fetchResponse.search.results);
      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    return results;
  }
}

/**
 * Gets search query
 * @param itemFragment
 * @returns search query
 */
function getSearchQuery(itemFragment: DocumentNode): DocumentNode {
  return gql`
    query Search(
      $rootItemId: String!
      $language: String!
      $templates: String
      $pageSize: Int = 10
      $after: String
    ) {
      search(
        where: {
          AND: [
            { name: "_path", value: $rootItemId }
            { name: "_language", value: $language }
            { name: "_templates", value: $templates }
          ]
        }
        first: $pageSize
        after: $after
      ) {
        pageInfo {
          endCursor
          hasNext
        }
        results {
          ...SearchResults
        }
      }
    }
    ${itemFragment}
  `;
}
