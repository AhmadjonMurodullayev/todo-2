const open_btn = document.getElementById("open_btn")
const user_modal = document.getElementById("user-modal")
const close = document.getElementById("close")
const result = document.getElementById("result")
const save = document.getElementById("save")
let form = {}
let edit_user = -1
const users = JSON.parse(localStorage.getItem("users")) || []
let search = ""
document.addEventListener("DOMContentLoaded",function(){
    save.addEventListener("click",addUser)
    displayUsers()
   saveStroge()

})
open_btn.addEventListener("click", function(){
    toggleModal("block")
})
close.addEventListener("click",function(){
    toggleModal("none")
})
window.addEventListener("click", function(event){
    if(event.target === user_modal){
        toggleModal("none")
    }
})

function addUser(){
   console.log(form);
   if(edit_user > -1){
    users[edit_user] = {...form}
   }else{
    users.push({...form})
   }
   displayUsers()
   saveStroge()
   toggleModal("none")

}
function displayUsers(){
  result.innerHTML = ""
  users.filter(item =>{
    if(item.first_name.toLowerCase().includes(search)){
      return item
    }
  }).forEach((item,index) =>{
    let tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${item.first_name}</td>
    <td>${item.last_name}</td>
    <td>${item.age}</td>
    <td>${item.phone_number}</td>
    <td>${item.email}</td>
    <td>
<button class="btn btn-info" onclick="editUser(${index})"> edit</button>

    </td>

    `
    result.appendChild(tr)
  })
}
function editUser(index){
  edit_user = index
  form = {...users[index]}
  document.querySelector("input[name ='first_name']").value = form.first_name
  document.querySelector("input[name ='last_name']").value = form.last_name
  document.querySelector("input[name ='age']").value = form.age
  document.querySelector("input[name ='phone_number']").value = form.phone_number
  document.querySelector("input[name ='email']").value = form.email
  toggleModal("block")
  

}

function handleChange(){
  const {name,value} = event.target
  form = {...form,[name]: value}
}
function handleSearch(event) {
   search = event.target.value.toLowerCase()
   displayUsers()
}

function toggleModal(status){
  user_modal.style.display = status
}
function saveStroge(){
  localStorage.setItem("users", JSON.stringify(users))
}


