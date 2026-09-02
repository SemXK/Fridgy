export interface AvailableProductPayload {filterText: string; pageSize:number, pageNumber: number}
export interface ProductToQuantity {productId: number, quantity: number}
export interface AddProductToQuantityPayload {storeId: number, productsToAdd: ProductToQuantity[]}