export default function InteractionHistory({

  interactions,

  handleEdit,

  handleDelete

}){


return (

<div className="history">


<h2>
📋 Interaction History
</h2>



{
interactions.length === 0

?

<p>
No interactions found
</p>


:


interactions.map((item)=>(


<div
key={item.id}
className="history-card"
>



<h3>
👨‍⚕️ {item.hcp_name}
</h3>



<p>
<b>Interaction Type:</b> {item.interaction_type}
</p>


<p>
<b>Date:</b> {item.date}
</p>


<p>
<b>Time:</b> {item.time}
</p>


<p>
<b>Attendees:</b> {item.attendees}
</p>


<p>
<b>Topics:</b> {item.topics}
</p>


<p>
<b>Materials:</b> {item.materials}
</p>


<p>
<b>Samples:</b> {item.samples || "-"}
</p>


<p>
<b>Sentiment:</b> {item.sentiment}
</p>



<p>
📌 <b>Summary:</b>

<br/>

{item.summary}
</p>



<p>
🤖 <b>AI Sentiment:</b>

{item.ai_sentiment}
</p>




<p>
📋 <b>AI Follow-ups:</b>

</p>


<ul>

{

item.ai_followups &&

item.ai_followups.map(
(f,index)=>(

<li key={index}>
{f}
</li>

)

)

}

</ul>




<p>
<b>Outcomes:</b>
{item.outcomes}
</p>




<p>
<b>Follow-up:</b>
{item.follow_up}
</p>





<button

onClick={()=>handleEdit(item)}

>

✏️ Edit

</button>




<button

onClick={()=>handleDelete(item.id)}

>

🗑️ Delete

</button>




</div>


))


}


</div>


);


}