export interface CourseData {
    id: string;
    name: string;
    description: string;
    shortDesc: string;
    image: string;
    modules: ModuleData[];
}

export interface ModuleData {
    id: string;
    name: string;
    description: string;
    order: string;
    done:boolean;
    images: string[];
    sections?: SectionModuleData[];
}


export interface SectionModuleData {
    id: string;
    name: string;
    type: string;
    file?: string;
    filename?: string;
    video?: string;
    test?: string;
    order: number;
}