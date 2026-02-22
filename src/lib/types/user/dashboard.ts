export interface CategoryStat {
    name: string;
    watched: string;
    icon: string;
}

export interface Mentor {
    name: string;
    role: string;
    img: string;
}

export interface LearningActivity {
    date: string;
    count: number;
}

export interface Course {
    id: number;
    title: string;
    category_id: number;
    author: string;
    img: string;
    progress_percentage?: number;
}