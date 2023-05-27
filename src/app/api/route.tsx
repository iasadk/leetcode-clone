
export const GET = () => {
    try {
        return new Response(JSON.stringify("hello working!!"), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 