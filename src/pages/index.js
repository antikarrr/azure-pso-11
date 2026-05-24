import Head from "next/head";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Table from "../components/Table";
import Form from "../components/Form";

import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";

import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";

export default function Home(){

const visible=useSelector(state=>state.app.client.toggleForm)
const deleteId=useSelector(state=>state.app.client.deleteId)

const queryclient=useQueryClient()
const dispatch=useDispatch()

const handler=()=>{
dispatch(toggleChangeAction())
}

const deletehandler=async()=>{
await deleteUser(deleteId)
await queryclient.prefetchQuery("users",getUsers)
dispatch(deleteAction(null))
}

const canclehandler=()=>{
dispatch(deleteAction(null))
}

return(

<section>

<Head>
<title>Employee Management</title>
</Head>

<main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-5">

<div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

<div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-10 text-white mb-8 relative overflow-hidden">

<div className="absolute w-40 h-40 bg-white/20 rounded-full -top-10 -left-10"></div>

<div className="absolute w-52 h-52 bg-white/10 rounded-full -bottom-20 right-0"></div>

<h1 className="text-5xl font-bold relative">
Employee Management
</h1>

<p className="mt-3 text-indigo-100 relative">
Manage employee efficiently
</p>

</div>

<div className="flex justify-between mb-6 flex-wrap gap-4">

<button
onClick={handler}
className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white font-semibold duration-200"
>

Add Employee

<BiUserPlus size={24}/>

</button>

{
deleteId?
<DeleteComponent
deletehandler={deletehandler}
canclehandler={canclehandler}
/>
:null
}

</div>

{
visible?
<div className="bg-gray-50 rounded-2xl p-6 mb-6 shadow-inner">
<Form/>
</div>
:null
}

<Table/>

</div>

</main>

</section>

)

}

function DeleteComponent({
deletehandler,
canclehandler,
}) {

return (

<div
className="
fixed
inset-0
bg-black/30
flex
justify-center
items-center
z-50
"
>

<div
className="
bg-white
rounded-2xl
p-8
shadow-2xl
text-center
w-[340px]
"
>

<h2
className="
text-xl
font-bold
mb-3
"
>

Delete Employee?

</h2>

<p
className="
text-gray-500
mb-6
"
>

This action cannot be undone

</p>

<div
className="
flex
justify-center
gap-4
"
>

<button
onClick={deletehandler}
className="
bg-red-500
text-white
px-5
py-2
rounded-xl
hover:bg-red-600
"
>

Delete

</button>

<button
onClick={canclehandler}
className="
bg-gray-200
px-5
py-2
rounded-xl
hover:bg-gray-300
"
>

Cancel

</button>

</div>

</div>

</div>

);

}