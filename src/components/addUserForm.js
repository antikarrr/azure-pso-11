import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";

import {
  useQueryClient,
  useMutation,
} from "react-query";

import {
  addUser,
  getUsers,
} from "../lib/helper";

export default function AddUserForm({
  formData,
  setFormData,
}) {

  const queryClient =
    useQueryClient();

  const addMutation =
    useMutation(addUser, {

      onSuccess: () => {

        queryClient.prefetchQuery(
          "users",
          getUsers
        );

      },

    });

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      Object.keys(formData)
        .length === 0
    ) {

      return;

    }

    let {

      firstname,
      lastname,
      email,
      salary,
      date,
      status,
      role,
      managerName,

    } = formData;

    const model = {

      name:
        `${firstname} ${lastname}`,

      email,

      salary,

      date,

      status:
        status ?? "Active",

      role:
        role ?? "Staff",

      managerName:

        role === "Manager"

          ? "-"

          : (

            managerName
            || "-"

          ),

    };

    addMutation.mutate(model);

  };

  if (
    addMutation.isLoading
  ) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  if (
    addMutation.isError
  ) {

    return (

      <Bug
        message={
          addMutation.error.message
        }
      />

    );

  }

  if (
    addMutation.isSuccess
  ) {

    return (

      <Success
        message={
          "Added Successfully"
        }
      />

    );

  }

  return (

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

type="text"

name="firstname"

placeholder="First Name"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
focus:ring-2
focus:ring-indigo-400
outline-none
"

/>

<input

type="text"

name="lastname"

placeholder="Last Name"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
focus:ring-2
focus:ring-indigo-400
outline-none
"

/>

<input

type="email"

name="email"

placeholder="Email"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
focus:ring-2
focus:ring-indigo-400
outline-none
"

/>

<input

type="number"

name="salary"

placeholder="Salary"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
focus:ring-2
focus:ring-indigo-400
outline-none
"

/>

<input

type="date"

name="date"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
outline-none
"

/>

<select

name="role"

onChange={setFormData}

className="
border
rounded-xl
p-4
shadow-sm
outline-none
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

placeholder={

formData.role
=== "Manager"

? "Manager doesn't need manager"

: "Manager Name"

}

onChange={
setFormData
}

disabled={

formData.role
=== "Manager"

}

value={

formData.role
=== "Manager"

? "-"

: (
formData.managerName
|| ""
)

}

className={`

border
rounded-xl
p-4
shadow-sm
outline-none

${
formData.role
=== "Manager"

?

"bg-gray-200 cursor-not-allowed"

:

"focus:ring-2 focus:ring-indigo-400"

}

`}

/>

<div

className="
flex
gap-6
items-center
"

>

<label>

<input

type="radio"

name="status"

value="Active"

onChange={
setFormData
}

/>

<span
className="ml-2"
>

Active

</span>

</label>

<label>

<input

type="radio"

name="status"

value="Inactive"

onChange={
setFormData
}

/>

<span
className="ml-2"
>

Inactive

</span>

</label>

</div>

<button

type="submit"

className="
md:col-span-2
bg-gradient-to-r
from-indigo-500
to-purple-500
text-white
rounded-xl
p-4
font-semibold
hover:scale-[1.02]
duration-200
shadow-lg
flex
justify-center
items-center
gap-2
"

>

Add Employee

<BiPlus
size={24}
/>

</button>

</form>

  );

}