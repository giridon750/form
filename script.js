// const name= document.getElementById("name").value;
// const email= document.getElementById("email").value;
// const Adress= document.getElementById("adresss").value;
// const phonenumber= document.getElementById("phonenumber").value;

function user(){
    const name= document.getElementById("name").value;
   const email= document.getElementById("email").value;
   const Adress= document.getElementById("address").value;
   const phonenumber= document.getElementById("phonenumber").value;
    const userdeatils ={}
    userdeatils["name"]=name
    userdeatils["email"]=email
    userdeatils["phonenumber"]=phonenumber
    userdeatils["Adress"]=Adress
   

             

     const table=document.getElementById("table")
     table.innerHTML  +=` <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <th id="name.col" scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  ${userdeatils["name"]}
                </th>
                <td class="px-6 py-4">
                 ${userdeatils["email"]}
                   
                </td>
                <td class="px-6 py-4">
                 ${userdeatils["phonenumber"]}
                
                </td>
                <td class="px-6 py-4">
                ${userdeatils["Adress"]}
                </td>
                <td class="px-6 py-4">
                  <button type="button"
    onclick="this.parentElement.parentElement.remove()"
    class="font-medium text-fg-brand hover:underline">
    delete
</button>
                </td>
            </tr>`

    

}
