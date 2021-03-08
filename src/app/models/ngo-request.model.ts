export class NgoRequest {
    contactPerson: string;
    ngoName: string;
    email: string;
    message: string;
    phone: string;
}

export class NgoRequestDetails extends NgoRequest {
    ngoRequestId: number;        
    requestDate: string;
    statusUpdateDate: string;
    requestStatus: number;
}