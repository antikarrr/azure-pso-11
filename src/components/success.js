import {
BiCheckCircle
}
from "react-icons/bi";

export default function Success({
message
}) {

return (

<div
className="
max-w-md
mx-auto
mb-5
"
>

<div
className="
bg-green-500
text-white
rounded-xl
shadow-md
p-4
flex
justify-center
items-center
gap-2
font-semibold
"
>

<BiCheckCircle
size={24}
/>

{message}

</div>

</div>

);

}