export class Note {
    attachmentPath: string;
    text: string;
    questionId: number;
    file: Blob;
    lastModified: string;
}

export class NoteDto {
    file: Blob;
    text: string;
    questionId: number;
    beneficiaryId: number;
}