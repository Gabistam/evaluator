export interface Appreciation {
    id: string;
    level: string;
    comment: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    image: string;
    appreciations: Appreciation[];
  }
  
  export interface Database {
    _id: string;
    categories: Category[];
  }