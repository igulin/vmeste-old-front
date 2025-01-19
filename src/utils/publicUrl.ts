export const publicUrl = () => {
    const url =
        process.env.NEXT_PUBLIC_NODE === "development"
            ? process.env.NEXT_PUBLIC_API_SERVER_DEV
            : process.env.NEXT_PUBLIC_API_SERVER;

    return url ? url : "";
};
