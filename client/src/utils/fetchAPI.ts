export const fetchAPI = async (url: string, method: string, body?: unknown) => {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        // throw new Error(`Failed to ${method} ${url}`);
        console.log(`Failed to ${method} ${url}`);
    }
    return response.json();
};
