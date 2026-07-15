export default function InteractionForm({
  formData,
  setFormData,
  refreshHistory
}) {


const update=(key,value)=>{

  setFormData({

    ...formData,

    [key]:value

  });

};



// convert date for input

const convertDate=(date)=>{

 if(!date) return "";

 if(date.includes("-")){

   const p=date.split("-");


   if(p[0].length===4){

     return date;

   }


   return `${p[2]}-${p[1]}-${p[0]}`;

 }

 return date;

};




// SAVE NEW

const saveInteraction=async()=>{


try{


const response=await fetch(

"http://127.0.0.1:8000/interactions",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

hcp_name:formData.hcpName,

interaction_type:formData.interactionType,

date:formData.date,

time:formData.time,

attendees:formData.attendees,

topics:formData.topics,

materials:formData.materials,

samples:formData.samples,

sentiment:formData.sentiment,

outcomes:formData.outcomes,

follow_up:formData.followUp,

summary:formData.summary || "",

ai_sentiment:formData.aiSentiment || "",

ai_followups:formData.aiFollowups || []

})

}

);



if(response.ok){

alert(
"✅ Interaction Saved Successfully"
);


if(refreshHistory){

refreshHistory();

}


}

else{

alert(
"❌ Save Failed"
);

}



}

catch(error){

console.log(error);

alert(
"Backend connection failed"
);


}


};







// UPDATE EXISTING

const updateInteraction=async()=>{


try{


const response=await fetch(

`http://127.0.0.1:8000/interactions/${formData.id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

hcp_name:formData.hcpName,

interaction_type:formData.interactionType,

date:formData.date,

time:formData.time,

attendees:formData.attendees,

topics:formData.topics,

materials:formData.materials,

samples:formData.samples,

sentiment:formData.sentiment,

outcomes:formData.outcomes,

follow_up:formData.followUp

})

}

);



if(response.ok){

alert(
"✅ Updated Successfully"
);


if(refreshHistory){

refreshHistory();

}


}

}

catch(error){

console.log(error);

alert(
"Update Failed"
);

}


};







return (

<div className="form-box">


<h2>
📝 Log HCP Interaction
</h2>



<label>HCP Name</label>


<input

value={formData.hcpName || ""}

placeholder="Search or select HCP"

onChange={(e)=>
update(
"hcpName",
e.target.value
)
}

/>






<label>Interaction Type</label>


<select

value={formData.interactionType || ""}

onChange={(e)=>
update(
"interactionType",
e.target.value
)
}

>

<option value="">
Select Type
</option>

<option>
Meeting
</option>

<option>
Product Discussion Meeting
</option>

<option>
Follow-up Discussion Meeting
</option>

<option>
Call
</option>

<option>
Office Visit
</option>


</select>







<label>Date</label>


<input

type="date"

value={convertDate(formData.date)}

onChange={(e)=>
update(
"date",
e.target.value
)
}

/>







<label>Time</label>


<input

value={formData.time || ""}

placeholder="10:00 AM - 11:00 AM"

onChange={(e)=>
update(
"time",
e.target.value
)
}

/>







<label>Attendees</label>


<input

value={formData.attendees || ""}

placeholder="Enter names"

onChange={(e)=>
update(
"attendees",
e.target.value
)
}

/>







<label>Topics Discussed</label>


<textarea

value={formData.topics || ""}

placeholder="Enter discussion points"

onChange={(e)=>
update(
"topics",
e.target.value
)
}

/>







<label>Materials Shared</label>


<input

value={formData.materials || ""}

placeholder="Search/Add"

onChange={(e)=>
update(
"materials",
e.target.value
)
}

/>







<label>Samples Distributed</label>


<input

value={formData.samples || ""}

placeholder="Enter samples"

onChange={(e)=>
update(
"samples",
e.target.value
)
}

/>







<h3>
Observed Sentiment
</h3>


<label>

<input

type="radio"

checked={formData.sentiment==="Positive"}

onChange={()=>
update(
"sentiment",
"Positive"
)
}

/>

😊 Positive

</label>



<label>

<input

type="radio"

checked={formData.sentiment==="Neutral"}

onChange={()=>
update(
"sentiment",
"Neutral"
)
}

/>

😐 Neutral

</label>



<label>

<input

type="radio"

checked={formData.sentiment==="Negative"}

onChange={()=>
update(
"sentiment",
"Negative"
)
}

/>

😞 Negative

</label>







<label>Outcomes</label>


<textarea

value={formData.outcomes || ""}

onChange={(e)=>
update(
"outcomes",
e.target.value
)
}

/>






<label>Follow-up Actions</label>


<textarea

value={formData.followUp || ""}

onChange={(e)=>
update(
"followUp",
e.target.value
)
}

/>






<h3>
🤖 AI Suggested Follow-ups
</h3>


<ul>

{

formData.aiFollowups?.map(

(item,index)=>(

<li key={index}>
{item}
</li>

)

)

}

</ul>






{

formData.id ?

<button

className="log-btn"

onClick={updateInteraction}

>

✏️ Update Interaction

</button>


:

<button

className="log-btn"

onClick={saveInteraction}

>

💾 Save Interaction

</button>


}





</div>

);


}