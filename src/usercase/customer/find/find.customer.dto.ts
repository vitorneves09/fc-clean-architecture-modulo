export interface InputFindCustomer{
    id: string;
}


export interface OutputFindCustomer{
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    }
}