import "./App.css";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateForm } from "./redux/interactionSlice";

import InteractionForm from "./components/InteractionForm";
import AIChat from "./components/AIChat";
import InteractionHistory from "./components/InteractionHistory";



function convertDate(date){

  if(!date) return "";


  const parts = date.split("-");


  // yyyy-mm-dd
  if(parts[0]?.length === 4){

    return date;

  }


  // dd-mm-yyyy
  if(parts.length === 3){

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

  }


  return date;

}





function App(){


  const dispatch = useDispatch();



  const formData = useSelector(
    (state)=>state.interaction.formData
  );



  const [interactions,setInteractions] = useState([]);




  // GET HISTORY FUNCTION
  async function loadHistory(){


    try{


      const res = await fetch(
        "https://aivoa-backend-t0me.onrender.com/interactions",
      );


      const data = await res.json();



      console.log(
        "History:",
        data
      );



      setInteractions(

        Array.isArray(data)
        ?
        data
        :
        []

      );


    }
    catch(error){


      console.log(
        "History Error:",
        error
      );


    }


  }





  // PAGE LOAD

  useEffect(()=>{


    async function fetchHistory(){


      try{


        const res = await fetch(

          "https://aivoa-backend-t0me.onrender.com/interactions",

        );



        const data = await res.json();



        setInteractions(

          Array.isArray(data)
          ?
          data
          :
          []

        );


      }
      catch(error){


        console.log(
          "Initial load error:",
          error
        );


      }


    }



    fetchHistory();



  },[]);








  // EDIT

  function handleEdit(item){


    dispatch(

      updateForm({

        id:item.id || "",


        hcpName:
        item.hcp_name || "",


        interactionType:
        item.interaction_type || "",


        date:
        convertDate(item.date),


        time:
        item.time || "",


        attendees:
        item.attendees || "",


        topics:
        item.topics || "",


        materials:
        item.materials || "",


        samples:
        item.samples || "",


        sentiment:
        item.sentiment || "",


        outcomes:
        item.outcomes || "",


        followUp:
        item.follow_up || "",


        summary:
        item.summary || "",


        aiSentiment:
        item.ai_sentiment || "",


        aiFollowups:
        item.ai_followups || []


      })

    );


  }








  // DELETE

  async function handleDelete(id){


    const confirmDelete = window.confirm(

      "Are you sure you want to delete?"

    );



    if(!confirmDelete)

      return;



    try{


      await fetch(

        `https://aivoa-backend-t0me.onrender.com/interactions/${id}`,

        {

          method:"DELETE"

        }

      );



      loadHistory();



    }
    catch(error){


      console.log(

        "Delete Error:",
        error

      );


    }


  }








return(


<div className="container">



<h1>
🤖 AI First CRM - HCP Module
</h1>





<div className="crm-layout">





<div className="left-panel">



<InteractionForm


formData={formData}



setFormData={(data)=>

dispatch(
updateForm(data)
)

}


/>



</div>







<div className="right-panel">



<AIChat


refresh={loadHistory}



setFormData={(data)=>

dispatch(
updateForm(data)
)

}


/>



</div>





</div>








<InteractionHistory



interactions={interactions}



handleEdit={handleEdit}



handleDelete={handleDelete}



/>






</div>


);


}



export default App;