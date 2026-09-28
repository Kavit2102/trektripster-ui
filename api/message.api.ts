import { apiClient } from "./api";

export const getMessages = async (conversation_id: string) => {
    const response = await apiClient.get(`chat/${conversation_id}/messages`);
    return response.data;
};

export const addMessage = async (query: string, conversation_id: string, user_id: string) => {
    const url = conversation_id
        ? `chat/message?conversation_id=${conversation_id.toString()}`
        : 'chat/message';
    const response = await apiClient.post(url,
        {
            question: query?.toString()
        },
        {
            headers: {
                'user_id': user_id?.toString()
            }
        }
    )
    return response.data;
};