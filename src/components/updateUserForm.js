import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";

import {
useQuery,
useMutation,
useQueryClient
}
from "react-query";

import {
getUser,
getUsers,
updateUser
}
from "../lib/helper";

export default function UpdateUserForm({

formId,
formData,
setFormData

}){

const queryClient=
useQueryClient()

const{

isLoading,
isError,
data

}=useQuery(

["users",formId],

()=>getUser(formId),

{

enabled:!!formId

}

)

const UpdateMutation=

useMutation(

(newData)=>

updateUser(
formId,
newData
),

{

onSuccess:()=>{

queryClient.prefetchQuery(
"users",
getUsers
)

}

}

)

if(isLoading){

return(
<div>
Loading...
</div>
)

}

if(isError){

return(
<div>
Error
</div>
)

}

if(UpdateMutation.isLoading){

return(
<div>
Updating...
</div>
)

}

if(UpdateMutation.isError){

return(

<Bug

message={

UpdateMutation.error.message

}

/>

)

}

if(UpdateMutation.isSuccess){

return(

<Success

message=
"Updated Successfully"

/>

)

}

const{

name="",

salary="",

date="",

email="",

status="Active",

role="Staff",

managerName="-"

}=data||{}

const[

firstname="",
lastname=""

]=name.split(" ")

const currentRole=

formData.role
??

role

const handleSubmit=

async(e)=>{

e.preventDefault()

const userName=

`${

formData.firstname
??

firstname

}

${

formData.lastname
??

lastname

}`

const updated={

...data,

...formData,

name:userName,

role:

currentRole,

managerName:

currentRole

==="Manager"

?

"-"

:

(

formData.managerName

??

managerName

??

"-"

)

}

UpdateMutation.mutate(
updated
)

}

return(

<form

onSubmit={
handleSubmit
}

className="
grid
md:grid-cols-2
gap-5
w-full
"

>

<input

name="firstname"

defaultValue={
firstname
}

onChange={
setFormData
}

placeholder=
"First Name"

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

/>

<input

name="lastname"

defaultValue={
lastname
}

onChange={
setFormData
}

placeholder=
"Last Name"

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

/>

<input

name="email"

defaultValue={
email
}

onChange={
setFormData
}

placeholder=
"Email"

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

/>

<input

name="salary"

defaultValue={
salary
}

onChange={
setFormData
}

placeholder=
"Salary"

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

/>

<input

type="date"

name="date"

defaultValue={
date
}

onChange={
setFormData
}

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

/>

<select

name="role"

defaultValue={
role
}

onChange={
setFormData
}

className="
border
rounded-xl
p-4
outline-none
focus:border-indigo-500
"

>

<option>

Staff

</option>

<option>

Manager

</option>

<option>

HR

</option>

<option>

Intern

</option>

</select>

<input

name="managerName"

placeholder=
"Manager Name"

defaultValue={

role==="Manager"

?

"-"

:

managerName

}

disabled={

currentRole
==="Manager"

}

onChange={
setFormData
}

className="

border
rounded-xl
p-4
outline-none

disabled:bg-gray-100
disabled:text-gray-400

focus:border-indigo-500

"

/>

<div
className="
flex
items-center
gap-6
"
>

<label>

<input

type="radio"

name="status"

value="Active"

defaultChecked={
status==="Active"
}

onChange={
setFormData
}

/>

<span
className="
ml-2
"
>

Active

</span>

</label>

<label>

<input

type="radio"

name="status"

value="Inactive"

defaultChecked={
status==="Inactive"
}

onChange={
setFormData
}

/>

<span
className="
ml-2
"
>

Inactive

</span>

</label>

</div>

<button

className="
md:col-span-2

bg-yellow-500

hover:bg-yellow-600

duration-200

text-white

rounded-xl

p-4

font-semibold

flex

justify-center

items-center

gap-2

"

>

Update

<BiBrush
size={22}
/>

</button>

</form>

)

}