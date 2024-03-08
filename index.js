const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
form.addEventListener("submit",onSubmitForm);
const addEmpBtn = document.getElementById("addEmpBtn");
let isUpdating = false;
const deleteHistory = {};
let ite=0;

function onSubmitForm(event)
{
    console.log("inside onsubmit");
    event.preventDefault();
    
    let EmployeeData ={
        Name: form["Name"].value,
        Role:form["Role"].value,
        CompanyName:form["CompanyName"].value,
        gender:form["gender"].value,
        Salary:form["Salary"].value,
        Email:form["Email"].value,
    };
    addEmployee(EmployeeData,event);
}

function OnUpdateClick(event)
{ 
    let row = event.target.parentNode.parentNode;
    var cols = row.querySelectorAll("td");
     let formFields = form.elements;
    let i=0;
    cols.forEach(function(td) {
        if(i<formFields.length-1)
        {
            formFields[i].value = td.innerText;
            deleteHistory[ite][formFields[i].key] = td.innerText;
            i++;
        }
        
     });
    //  row.remove();
    ite++;
     const submitBtn = formFields[i];
     submitBtn.innerText = "Update";
}
function OnDeleteClick(event)
{
//   console.log(event.target.parentNode.parentNode);
const row = event.target.parentNode.parentNode;
row.remove();
}

function addEmployee(EmployeeData,event)
{

    console.log("inside addEmployee");
    console.log(event.target);
  const tr = document.createElement("tr");
  for(let key in EmployeeData)
  {
    const td = document.createElement("td");
    td.innerText = EmployeeData[key];
    tr.appendChild(td);
    
  }
  const td = document.createElement("td");
  const updateBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  updateBtn.innerText="edit";
  deleteBtn.innerText="delete";
  td.appendChild(updateBtn);
  td.appendChild(deleteBtn);
  tr.appendChild(td);
  updateBtn.addEventListener("click",OnUpdateClick);
  deleteBtn.addEventListener("click",OnDeleteClick);
  tbody.appendChild(tr);
  form.reset();
  addEmpBtn.innerText = "ADD Employee";
}