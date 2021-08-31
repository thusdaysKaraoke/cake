export class ProductType {
    id: number;
    label: string;
    description: string;
    ingredients: Ingredient[];
    price: number;
}

export class Ingredient {
    name: string;
    quantity: number;
    measure: string;
}