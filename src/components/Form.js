import UpdateUserForm from "./updateUserForm";
import AddUserForm from "./addUserForm";

import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer=(state,event)=>{

return{

...state,

[event.target.name]:
event.target.value

}

}

export default function Form(){

const[
formData,
setFormData

]=useReducer(

formReducer,

{}

)

const formId=

useSelector(

(state)=>

state.app.client.formId

)

console.log(
"FORM ID REDUX :",
formId
)

return(

<div

className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-8
"

>

{

formId

?

<UpdateUserForm

key={formId}

formId={formId}

formData={formData}

setFormData={setFormData}

/>

:

<AddUserForm

formData={formData}

setFormData={setFormData}

/>

}

</div>

)

}