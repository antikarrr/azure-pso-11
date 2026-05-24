import React from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";

import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";

import {
toggleChangeAction,
updateAction,
deleteAction
}
from "../redux/reducer";

import {
useSelector,
useDispatch
}
from "react-redux";

const Table=()=>{

const{

isLoading,
isError,
data

}=useQuery(

"users",
getUsers

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

return(

<div
className="
overflow-x-auto
rounded-3xl
shadow-xl
bg-white
"
>

<table
className="
w-full
min-w-[1200px]
table-auto
"
>

<thead>

<tr
className="
bg-indigo-600
text-white
text-lg
"
>

<th
className="
w-[22%]
px-8
py-5
text-left
"
>

Employee

</th>

<th
className="
w-[22%]
text-left
"
>

Email

</th>

<th
className="
w-[12%]
text-right
"
>

Salary

</th>

<th
className="
w-[12%]
text-center
"
>

Birthday

</th>

<th
className="
w-[10%]
text-center
"
>

Status

</th>

<th
className="
w-[10%]
text-center
"
>

Role

</th>

<th
className="
w-[12%]
text-center
"
>

Manager

</th>

<th
className="
w-[8%]
text-center
"
>

Action

</th>

</tr>

</thead>

<tbody>

{

data?.map(
(obj)=>(

<Tr

key={
obj._id
}

{...obj}

/>

)

)

}

</tbody>

</table>

</div>

)

}

function Tr({

_id,
name,
email,
salary,
date,
status,
role,
managerName

}){

const visible=

useSelector(

state=>

state.app.client.toggleForm

)

const dispatch=
useDispatch()

const onUpdate=()=>{

if(!visible){

dispatch(
toggleChangeAction()
)

}

dispatch(
updateAction(_id)
)

}

const onDelete=()=>{

dispatch(
deleteAction(_id)
)

}

return(

<tr

className="
border-b
hover:bg-indigo-50
duration-200
"

>

<td
className="
px-8
py-6
"
>

<div
className="
flex
items-center
gap-4
"
>

<div

className="
w-12
h-12
rounded-full
bg-indigo-500
text-white
font-bold
flex
items-center
justify-center
text-xl
"

>

{
name?.charAt(0)
}

</div>

<div
className="
font-medium
text-lg
"
>

{
name
}

</div>

</div>

</td>

<td
className="
text-gray-700
"
>

{
email
}

</td>

<td
className="
text-right
font-medium
pr-5
"
>

{
salary
}

</td>

<td
className="
text-center
"
>

{
date
}

</td>

<td
className="
text-center
"
>

<span

className={`

px-4
py-2
rounded-full
text-white
font-medium

${

status==="Active"

?

"bg-green-500"

:

"bg-red-500"

}

`}

>

{
status
}

</span>

</td>

<td
className="
text-center
"
>

<span

className="
bg-indigo-100
text-indigo-700
px-4
py-2
rounded-full
font-medium
"

>

{
role || "-"
}

</span>

</td>

<td
className="
text-center
font-medium
"

>

{

role==="Manager"

?

"-"

:

managerName||"-"

}

</td>

<td>

<div
className="
flex
justify-center
gap-5
"
>

<button
onClick={
onUpdate
}
>

<BiEdit

size={24}

color="#f59e0b"

/>

</button>

<button
onClick={
onDelete
}
>

<BiTrashAlt

size={24}

color="#ef4444"

/>

</button>

</div>

</td>

</tr>

)

}

export default Table