import { apiClient } from "./api";

export const getConversations = async (user_id: string) => {
    const response = await apiClient.get("/chat/conversations", {
        headers: {
            'user_id': user_id
        }
    });

    return response.data;
};

export const createConversation = async () => {
    const response = await apiClient.post("chat/conversations");

    return response.data;
};