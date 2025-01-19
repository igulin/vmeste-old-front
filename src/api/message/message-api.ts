import axios from "@/axios";
import instance from "@/axios";

const MessageApi = {
   async getMessageByQuote(id: number) {
     const {data} = await axios.get(
                `/api/message/get-messages-by-quote/${id}`
            );

     return data
   },
   async getMessagesAllWithQuote(id: number) {
     const {data} = await axios.get(`api/message/get-messages-all-quote/${id}`)

     return data
   },
   async getMessagesInChat(id: number): Promise<any> {
       console.log(typeof id);

       const {data} = await instance.get(`api/message/get-messages-in-chat/${id}`)

       return data
   }
}

export default MessageApi