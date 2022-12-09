import React from 'react'

export const Messages = ({messages}, {currentChannelId}) => {

  return (
    <>
    <div class="bg-light mb-4 p-3 shadow-sm small">
    <p class="m-0"><b># general </b></p>
    <span class="text-muted">100 сообщения</span>
    </div>
  <div id="messages-box" 
    class="chat-messages overflow-auto px-5 ">
        {messages.map((message)=>
      <div class="text-break mb-2">
        <b>{message.autor}</b>{message.body}
        </div>
       )}
      </div>

</>
  )
}

