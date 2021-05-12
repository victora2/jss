[@sitecore-jss/sitecore-jss](../README.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](axiosdatafetcher.md#constructor)

### Properties

- [instance](axiosdatafetcher.md#instance)

### Methods

- [delete](axiosdatafetcher.md#delete)
- [fetch](axiosdatafetcher.md#fetch)
- [get](axiosdatafetcher.md#get)
- [head](axiosdatafetcher.md#head)
- [post](axiosdatafetcher.md#post)
- [put](axiosdatafetcher.md#put)

## Constructors

### constructor

\+ **new AxiosDataFetcher**(`dataFetcherConfig?`: [*AxiosDataFetcherConfig*](../README.md#axiosdatafetcherconfig)): [*AxiosDataFetcher*](axiosdatafetcher.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataFetcherConfig` | [*AxiosDataFetcherConfig*](../README.md#axiosdatafetcherconfig) | {} | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

**Returns:** [*AxiosDataFetcher*](axiosdatafetcher.md)

Defined in: [axios-fetcher.ts:47](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L47)

## Properties

### instance

• `Private` **instance**: AxiosInstance

Defined in: [axios-fetcher.ts:47](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L47)

## Methods

### delete

▸ **delete**(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a DELETE request

**`throws`** {AxiosError} Axios error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:169](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L169)

___

### fetch

▸ **fetch**<T\>(`url`: *string*, `data?`: *unknown*): *Promise*<AxiosResponse<T\>\>

Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.

**`throws`** {AxiosError} Axios error

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |

**Returns:** *Promise*<AxiosResponse<T\>\>

response

Defined in: [axios-fetcher.ts:109](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L109)

___

### get

▸ **get**<T\>(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<T\>\>

Perform a GET request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<T\>\>

response

Defined in: [axios-fetcher.ts:123](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L123)

___

### head

▸ **head**(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a HEAD request

**`throws`** {AxiosError} Axios error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:134](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L134)

___

### post

▸ **post**(`url`: *string*, `data?`: *unknown*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a POST request

**`throws`** {AxiosError} Axios error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:146](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L146)

___

### put

▸ **put**(`url`: *string*, `data?`: *unknown*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a PUT request

**`throws`** {AxiosError} Axios error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:158](https://github.com/Sitecore/jss/blob/0a475c74/packages/sitecore-jss/src/axios-fetcher.ts#L158)
