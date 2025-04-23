export interface ProductTypes {
    product_id: string;
    product_title: string;
    product_sku: string;
    product_type: 'Normal' | string; // if there are more types later
    product_description: string;
    product_image: string[];
    product_warranty: number;
    product_quantity: number;
    product_label: string;
    product_visibility: 'Public' | 'Private' | string; // expand based on your logic
    product_usps: string;
    product_keywords: string[];
    createdAt: string; // or Date if you plan to parse
    brand_id: string | null;
    subcategory_id: string;
    category_id: string;
    product_price: number;
    category: {
        category_name: string;
    };
    subcategory: {
        subcategory_name: string;
    };
}

export interface ProductResponseTypes {
    success: boolean;
    total: number;
    data: ProductTypes[];
}
