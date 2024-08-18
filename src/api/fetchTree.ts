import api from ".";

export async function fetchTree () {
    try {
        const response = await api.post('', {
            headers: {
                treeName: 'GUID123'
            }
        })

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}