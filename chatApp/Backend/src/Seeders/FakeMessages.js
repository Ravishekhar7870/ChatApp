import {faker} from '@faker-js/faker'
import { Message } from '../models/message.model.js'
import { conversation } from '../models/conversation.model.js'
async function GenerateMessage(senderid,conversationid,numOfMessages){
      const messages=[];
      for(let i=0;i<numOfMessages;i++){
         const message=new Message({
            content: faker.lorem.sentence(),
            senderId: senderid,
            conversationId: conversationid,
            attachments: [
                {
                    public_id: faker.datatype.uuid(),
                    url: faker.internet.url()
                }
            ]
         })
         messages.push(message)
      }
    await  Message.insertMany(messages)
}
export default GenerateMessage