# Blog Analytics and Search Tool with Express.js and Lodash


This project provides a blog analytics and search tool developed using Express.js and Lodash. The tool fetches data from a third-party blog API, analyzes the data to extract meaningful statistics, and allows users to search for specific blogs based on their queries.
## Setup

Clone the repository:
```bash
git clone https://github.com/KPkm25/blog-api
cd blog-api
```
Install dependencies:
```bash
npm install
```
Start the server:
```bash
npm run devStart
```
The server will run on 
```bash
http://localhost:3000.
```
## Usage

Make sure the server is running, and you can start making requests to the API endpoints described below.

### API Endpoints

### 1. Blog Statistics
#### Endpoint: GET /api/blog-stats
This endpoint fetches data from the third-party blog API and provides statistics about the blogs.

Example Request:
```bash
curl --request GET \
  --url http://localhost:3000/api/blog-stats \
  --header 'x-hasura-admin-secret: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
```
### 2. Blog Search
#### Endpoint: GET /api/blog-search
This endpoint allows users to search for blogs based on a query string.

Example Request:
```bash
curl --request GET \
  --url http://localhost:3000/api/blog-search?query=privacy
```



## Caching

The project implements a caching mechanism using Lodash's memoize function. The caching mechanism stores the analytics results and search results for a certain period. If the same requests are made within the caching period, the server returns the cached results instead of re-fetching and re-analyzing the data.
