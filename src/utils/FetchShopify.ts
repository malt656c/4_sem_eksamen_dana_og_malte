export class Shopify<responseType> {
   #shopifyStoreURL: string;
   #shopifyAPIKey: string;
   #APIPath: string;
   #requestHeader: {
      'Content-Type': 'application/json';
      'X-Shopify-Storefront-Access-Token': string;
   };
   #shopifyAPIURL: string;
   constructor() {
      this.#shopifyStoreURL = 'https://farver-striber-test.myshopify.com';
      this.#shopifyAPIKey = 'e64c2bc06e11048da142746a65605b47';
      this.#APIPath = '/api/2024-04/graphql.json';
      this.#shopifyAPIURL = this.#shopifyStoreURL + this.#APIPath;
      this.#requestHeader = {
         'Content-Type': 'application/json',
         'X-Shopify-Storefront-Access-Token': this.#shopifyAPIKey,
      };
   }
   async fetchProducts(query: string) {
      const fetchOptions = { method: 'POST', headers: this.#requestHeader, body: JSON.stringify({ query: query }) };
      const response = await fetch(this.#shopifyAPIURL, fetchOptions);
      const data = await response.json();
      const fetchedProducts: responseType[] = data.data.products.nodes;
      return fetchedProducts;
   }
}
