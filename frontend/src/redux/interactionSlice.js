import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  formData: {

    id:"",
    hcpName:"",
    interactionType:"",
    date:"",
    time:"",
    attendees:"",
    topics:"",
    materials:"",
    samples:"",
    sentiment:"",
    outcomes:"",
    followUp:"",
    summary:"",
    aiSentiment:"",
    aiFollowups:[]

  }

};



const interactionSlice = createSlice({

  name:"interaction",

  initialState,


  reducers:{


    updateForm:(state,action)=>{

      state.formData = {

        ...state.formData,

        ...action.payload

      };

    }


  }


});



export const {
  updateForm

} = interactionSlice.actions;



export default interactionSlice.reducer;