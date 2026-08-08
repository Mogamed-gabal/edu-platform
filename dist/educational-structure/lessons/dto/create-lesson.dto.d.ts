export declare class CreateLessonDto {
    title: string;
    description?: string;
    videoUrls?: string[];
    photoUrls?: string[];
    order?: number;
    isFree?: boolean;
    price?: number;
    chapterId: string;
}
