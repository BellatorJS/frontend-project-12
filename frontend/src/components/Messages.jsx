import React from 'react'
import {messagesSelectors} from '../feachers/messages-slice'
import {channelsSelectors} from '../feachers/channels-slice'
import { useSelector } from 'react-redux'

export const Messages = (props) => {

const {messages, id}= props
    const item = useSelector((state) => channelsSelectors.selectById(state, id));
   


  
 // const channelxxx = channelsSelectors.selectById(id)
  console.log(item, "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
  return (
    <>
    <div class="bg-light mb-4 p-3 shadow-sm small">
    <p class="m-0"><b>#  </b></p>
    <span class="text-muted">100 сообщения</span>
    </div>
  <div id="messages-box" 
    class="chat-messages overflow-auto px-5 ">
        {messages.map((message)=>
      <div class="text-break mb-2" key={message.id}>
        <b>{message.username}</b>:{message.body}

        </div>
       )}
      </div>

</>
  )
}
/*
body(pin):"xzccxz"
channelId(pin):3
username(pin):"admin"
id(pin):4*/