import { ProductType } from './productType.model';

export class Product {
    id: number;
    type: number;
    typeDefinition?: ProductType;
    creationDate: Date;
    quantity: number;
}

