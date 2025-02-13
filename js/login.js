var companies = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      console.log("retrieved file correctly");
      var raw = this.responseText.split('\n');
      for (var row of raw.slice(1)) {
         var curr_sub = row.split(',');
         companies.push(curr_sub[0]);
      }
      // console.log(`File Contents: ${raw}`);
   } else {
      console.log(`Look up status code ${this.status}`);
   }
};
xhttp.open("POST", "active_subscriptions.csv", true);
xhttp.send();


document.getElementById("submit").onclick = function() {
    let company = document.getElementById("company").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    // check if company exists

    if (!companies.some(comp => {return comp == company})) {
        alert("no such organization in our records");
        return;
    }

    var users = new Map();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("retrieved file correctly");
            var raw = this.responseText.split('\n');
            for (var row of raw.slice(1)) {
                var curr_sub = row.split(',');
                users.set(curr_sub[0],curr_sub[1]);
            }
            // console.log(`File Contents: ${raw}`);
        } else {
            console.log(`Look up status code ${this.status}`);
            return;
        }
        act_pass = users.get(username);

        if (!act_pass) {
            alert("No Such user under that organization");
            return;
        }

        if (act_pass != password) {
            alert("Wrong Password");
            return;
        }

        localStorage.setItem('Company', company);
        localStorage.setItem('Username', username);

        location.href = "open_projects.html"
    };
    xhttp.open("POST", `${company}/logins.csv`, true);
    xhttp.send();

    

    // alert(company);
    // location.href = "plans.html"
}

window.onload = function() {
    let c = localStorage.getItem('Company');
    let u = localStorage.getItem('Username');
    console.log(`company: ${c} username: ${u}`)
    localStorage.removeItem('Company');
    localStorage.removeItem('Username');
}