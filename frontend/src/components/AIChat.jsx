import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateForm } from "../redux/interactionSlice";


function convertDate(date){

  if(!date) return "";

  if(date.split("-")[0].length === 4){
    return date;
  }


  const parts=date.split("-");

  if(parts.length===3){

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

  }


  return date;

}




export default function AIChat({refresh}){


const dispatch = useDispatch();


const [message,setMessage]=useState("");



const [messages,setMessages]=useState([

{
sender:"ai",
text:"👋 Hello! Log your interaction with an HCP in natural language. I'll automatically fill the form and suggest follow-up actions."
}

]);





const handleLog=async()=>{


if(!message.trim()) return;



setMessages(prev=>[

...prev,

{
sender:"user",
text:message
}

]);



const userText=message;

setMessage("");



try{


const res = await fetch(
"https://aivoa-backend-t0me.onrender.com/chat",


{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:userText

})

}

);





if(!res.ok){

throw new Error("Backend error");

}




const result=await res.json();



console.log(result);




const ai=result.response;



// =====================
// AUTO FILL LEFT FORM
// =====================


dispatch(

updateForm({

id:result.id || "",

hcpName:ai.hcp_name || "",


interactionType:
ai.interaction_type || "",



date:
convertDate(ai.date),



time:
ai.time || "",



attendees:
ai.attendees || "",



topics:
ai.topics || "",



materials:
ai.materials || "",



samples:
ai.samples || "",



sentiment:
ai.sentiment || "",



outcomes:
ai.outcomes || "",



followUp:
ai.follow_up || "",



summary:
ai.summary || "",



aiSentiment:
ai.ai_sentiment || "",



aiFollowups:
ai.ai_followups || []

})

);






if(refresh){

refresh();

}





setMessages(prev=>[

...prev,

{

sender:"ai",

text:

`
✅ Interaction logged successfully!


👨‍⚕️ HCP:
${ai.hcp_name}


📅 Date:
${ai.date}


😊 Sentiment:
${ai.sentiment}


📄 Materials:
${ai.materials}


📋 Follow ups:

${ai.ai_followups.join("\n")}

`

}

]);




}

catch(error){


console.log(error);



setMessages(prev=>[

...prev,

{

sender:"ai",

text:"❌ Backend connection failed. Check FastAPI server."

}

]);



}


};







return(


<div className="ai-box">


<h2>
🤖 AI Assistant
</h2>



<div className="chat-window">


{

messages.map((m,i)=>(


<div

key={i}

className={
m.sender==="user"
?
"user-message"
:
"ai-message"
}

>

{m.text}

</div>


))


}


</div>





<textarea

placeholder="Log interaction details here"

value={message}

onChange={(e)=>setMessage(e.target.value)}

/>





<button

className="log-btn"

onClick={handleLog}

>

Log Interaction

</button>



</div>


);


}