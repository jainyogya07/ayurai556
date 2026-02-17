const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        return data.status === 'healthy';
    } catch (error) {
        console.error('Backend health check failed:', error);
        return false;
    }
}

export const api = {
    health: checkBackendHealth,
    // Add other endpoints here
};
