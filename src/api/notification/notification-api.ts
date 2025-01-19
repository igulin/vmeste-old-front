import instance from "@/axios";

const NotificationApi = {
    async read(id: number) {
        const data = await instance.put("/notifications/read", {
            notificationId: id,
        });

        return data;
    },
    async readAll() {
        const data = await instance.put("/notifications/read-all");

        return data;
    },
};
export default NotificationApi;
