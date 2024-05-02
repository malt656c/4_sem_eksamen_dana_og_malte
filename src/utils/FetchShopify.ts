type APIResponse = {
   title: string;
   variants: { nodes: [{ title: string; price: { amount: string } }] };
   description: string;
   featuredImage: {
      src: string;
      width: number;
      height: number;
      altText: null;
   };
   priceRange: {
      maxVariantPrice: {
         amount: string;
      };
      minVariantPrice: {
         amount: string;
      };
   };
};
export type Product = {
   name: string;
   price: string;
   image: {
      src: string;
      width: number;
      height: number;
      altText: string | null;
   };
   variants: { color: string; size: string; price: string }[];
};
export class Shopify {
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
   #productDataCleanup(rawData: APIResponse) {
      const name = rawData.title;
      const price = parseInt(rawData.priceRange.minVariantPrice.amount) + ' - ' + parseInt(rawData.priceRange.maxVariantPrice.amount);
      const image = rawData.featuredImage;
      const variants = rawData.variants.nodes.map((variant) => {
         return { color: variant.title.replace(' ', '').split('/')[0], size: variant.title.replace(' ', '').split('/')[1], price: variant.price.amount };
      });
      const product: Product = {
         name: name,
         price: price,
         image: image,
         variants: variants,
      };
      return product;
   }
   async fetchProducts(query: string) {
      const fetchOptions = { method: 'POST', headers: this.#requestHeader, body: JSON.stringify({ query: query }) };

      const response = await fetch(this.#shopifyAPIURL, fetchOptions);
      const data = await response.json();
      const fetchedProducts: APIResponse[] = data.data.products.nodes;
      const products = fetchedProducts.map((fetchedProduct) => {
         return this.#productDataCleanup(fetchedProduct);
      });
      return products;
   }
}
