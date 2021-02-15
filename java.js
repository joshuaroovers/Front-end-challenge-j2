UserAwnsers = [];
inputs = 0;
progressvar = (100 / (subjects.length + 3));
function AwnserSubmit(x)
{  
    UserAwnsers[inputs] = x;
    inputs++;
    console.log(UserAwnsers);
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    /* console.log(inputs) */
    NextQuestion(inputs-1);
}
function GoBack()
{
    inputs--;
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    /* console.log(inputs) */
    NextQuestion(inputs-1);
}

function NextQuestion(x)
{
    document.getElementById("VraagOnderwerp").innerHTML = subjects[x].title;
    document.getElementById("Vraag").innerHTML = subjects[x].statement;
}