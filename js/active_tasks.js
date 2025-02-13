// sitewide = require("js/sitewide.js");
let user = null;

window.onload = function() {
   user = sessionStorage.getItem("Username");

   if (!user) {
      alert("YOU ARE NOT SIGNED IN");
      
      location.href = "login.html";

      return;
   }

}

/*
document.getElementById("task_add").onclick = addRow;

function addRow() {
   let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
   let newRow = table.insertRow();
   for (let i = 0; i < 3; i++) {
       let cell = newRow.insertCell(i);
       cell.textContent = "New Cell";
   }
}

*/