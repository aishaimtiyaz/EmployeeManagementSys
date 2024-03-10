const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
form.addEventListener("submit",onSubmitForm);
const addEmpBtn = document.getElementById("addEmpBtn");
let selectedRow = null;
const deleteHistory = [];
let ite=0;
function updateRow(NewData)
{ let j=0;
     for(let i in NewData)
     {
      selectedRow.cells[j].innerHTML = NewData[i];
      j++;
     }
     selectedRow = null;
      addEmpBtn.innerText = "ADD Employee";
      resetForm();
}

function onSubmitForm(event)
{
    event.preventDefault();    
    let EmployeeData ={
        Name: form["Name"].value,
        Role:form["Role"].value,
        CompanyName:form["CompanyName"].value,
        gender:form["gender"].value,
        Salary:form["Salary"].value,
        Email:form["Email"].value,
    };
    if(selectedRow !== null)
    {
      updateRow(EmployeeData);
    }
    else
    {
      addEmployee(EmployeeData,event);
    }
}

function OnUpdateClick(event)
{  
    console.log("this is inside update");
    selectedRow = event.target.parentNode.parentNode;
    
    var cols = selectedRow.querySelectorAll("td");
     let formFields = form.elements;
    let i=0;
    cols.forEach(function (td) {
            formFields[i].value = td.innerText;
            i++;
        
     });
    addEmpBtn.innerText = "Update";
    //  let isUpdatingRow = row;
}

function OnDeleteClick(event)
{
  if (confirm('Are you sure to delete this record ?'))
  {
    let row = event.target.parentNode.parentNode;
    var cols = row.querySelectorAll("td");
    let deletedRecord = {};
    let i=0;
    cols.forEach(function (td) {
      if(i<6)
      deletedRecord[i] = td.innerText;
      i++;  
});
    deleteHistory.push(deletedRecord);
    console.log(deleteHistory);
    row.remove();
  }
}

function addEmployee(EmployeeData,event)
{
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
  updateBtn.style.backgroundColor="green";
  deleteBtn.style.backgroundColor="red";
  td.appendChild(updateBtn);
  td.appendChild(deleteBtn);
  tr.appendChild(td);
  updateBtn.addEventListener("click",OnUpdateClick);
  deleteBtn.addEventListener("click",OnDeleteClick);
  tbody.appendChild(tr);
  addEmpBtn.innerText = "ADD Employee";
  resetForm(event);
}

function resetForm()
{
  const formEle = document.getElementsByTagName("input");
  const formOptionEle = document.getElementsByTagName("select");
  
  for(let idx in formEle)
  {
    console.log(formEle[idx].value);
    formEle[idx].value ="";
  }

  for(let idx in formOptionEle)
  {
    console.log(formOptionEle[idx].value);
    formEle[idx].value ="";
  }
  
}