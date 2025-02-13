let user = null;
let company = null;

window.onload = function() {
   user = localStorage.getItem("Username");
   company = localStorage.getItem("Company");

   if (!user) {
      alert("YOU ARE NOT SIGNED IN");
      
      location.href = "login.html";

      return;
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         console.log("retrieved file correctly");
         var raw = this.responseText.split('\n');
         for (var row of raw.slice(1)) {
            var curr_sub = row.split(',');
            let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
            let new_row = table.insertRow();
            let cell = new_row.insertCell(0);
            cell.textContent = curr_sub[0];
            cell = new_row.insertCell(1);
            cell.textContent = curr_sub[1];
         }
         // console.log(`File Contents: ${raw}`);
      } else {
         console.log(`Look up status code ${this.status}`);
      }
   };
   xhttp.open("POST", `${company}/projects.csv`, true);
   xhttp.send();
}