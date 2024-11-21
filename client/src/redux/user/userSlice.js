import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    error:null,
    loading:false,
    

  }


  export const userSlice = createSlice({
   name:'user',
   initialState,
   reducers:{
    signInStart:(state)=>{
        
        state.loading=true

    },
    signInSuccess:(state,action)=>{
        state.currentUser=action.payload
        state.loading=false
        state.error=null
    },
    signInFailure:(state,action)=>{
        state.error=action.payload
        state.loading=false
       
    },
    upDateUserStart:(state)=>{
        
        state.loading=true

    },
    upDateUserSuccess:(state,action)=>{
        state.currentUser=action.payload
        state.loading=false
        state.error=null
    },
    upDateUserFailure:(state,action)=>{
        state.error=action.payload
        state.loading=false
       
    }

   }


  })

  export const {signInStart,signInSuccess,signInFailure,upDateUserStart,upDateUserSuccess,upDateUserFailure}=userSlice.actions

  export default userSlice.reducer