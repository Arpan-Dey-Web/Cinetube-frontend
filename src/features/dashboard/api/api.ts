
import { apiClient } from "@/shared/api/client";

export type MonthlySales = {
    label: string;
    revenue: number;
    salesCount: number;
};

export type DashboardStats = Record<string, number> & {
    monthlySales?: MonthlySales[];
};

const getAdminDashboardStats = async () => {
    const response = await apiClient.get<DashboardStats>("/admin/dashboard-stats", {
        cache: "no-store",
    });

    return response.data;
};

const getUserStats = async () => {
    const response = await apiClient.get<DashboardStats>("/user/stats", {
        cache: "no-store",
    });

    return response.data;
};

export const dashboardService = {
    getAdminDashboardStats,
    getUserStats,
};
