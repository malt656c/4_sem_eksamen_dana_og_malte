export namespace ShopifyQuery {
   export namespace productList {
      export const query = `{
   shop {
     name
   }
   products(first: 50) {
     nodes {
       title
       priceRange {
         maxVariantPrice {
           amount
         }
         minVariantPrice {
           amount
         }
       }
       variants(first: 50) {
         nodes {
           price {
             amount
           }
           title
         }
       }
       description
       featuredImage {
         src
         height
         width
         altText
       }
     }
   }
 }`;
      export interface responseType {
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
      export function cleanupFunction(rawData: responseType[]) {
         const products = rawData.map((data) => {
            const name = data.title;
            const price = "Fra "+parseInt(data.priceRange.minVariantPrice.amount)
            const image = data.featuredImage;
            const variants = data.variants.nodes.map((variant) => {
               return { color: variant.title.replace(' ', '').split('/')[0], size: variant.title.replace(' ', '').split('/')[1], price: variant.price.amount };
            });
            const product = {
               name: name,
               price: price,
               image: image,
               variants: variants,
            };
            return product;
         });
         return products;
      }
   }
}
