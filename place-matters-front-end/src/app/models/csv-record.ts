// Class representation of a single record in a CSV file
export class CsvRecord{
    name: string;
    category: string;
    description: string;
    website: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone?: string;
    email?: string;
}

export class CsvHeader{
    header: string;
    exampleVal: string

    constructor(header, example) {
        this.header = header;
        this.exampleVal = example;
    }
}