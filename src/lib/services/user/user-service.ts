import { api } from '$lib/api-client.svelte';
import type { 
    CategoryStat, 
    Mentor, 
    LearningActivity, 
    Course 
} from '$lib/types/user/dashboard';

export const UserService = {
    /**
     * Mengambil statistik kategori (misal: "2/8 watched")
     */
    getCategoryStats: () => 
        api.get<CategoryStat[]>('/student/category-stats'),

    /**
     * Mengambil daftar mentor dari kursus yang diikuti
     */
    getMyMentors: () => 
        api.get<Mentor[]>('/student/my-mentors'),

    /**
     * Mengambil data grafik aktivitas belajar 30 hari terakhir
     */
    getLearningActivity: () => 
        api.get<LearningActivity[]>('/student/learning-activity'),

    /**
     * Mengambil kursus yang dimiliki oleh user saat ini
     */
    getMyCourses: () => 
        api.get<Course[]>('/my-courses'),

    /**
     * Mengupdate profil user
     */
    updateProfile: (data: any) => 
        api.put('/profile', data)
};