UserAwnsers = [];
inputs = 0;
progressvar = (100 / (subjects.length + 3));


function ButtonStart()
{
    inputs++
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    document.getElementById("MainContainer").style.backgroundColor = "whitesmoke";
    document.getElementById("StartContainer").style.display = "none";
    document.getElementById("VragenContainer").style.display = "unset";
    NextQuestion(inputs-1)
    console.log(inputs)
}

function AwnserSubmit(x)
{  
    UserAwnsers[inputs] = x;
    inputs++;
    console.log(UserAwnsers);
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    /* console.log(inputs) */
    if(inputs <= 30)
    {
        NextQuestion(inputs-1);
    }
    else if(inputs == 31)
    {
        SchermSpecify()
    }
    
}
function GoBack()
{
    inputs--;
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    console.log(inputs)
    if(inputs == 0)
    {
        document.getElementById("MainContainer").style.backgroundColor = "";
        document.getElementById("StartContainer").style.display = "unset";
        document.getElementById("VragenContainer").style.display = "none";
    }
    else
    {
        NextQuestion(inputs-1);
    }
    
}

function NextQuestion(x)
{
    document.getElementById("VraagOnderwerp").innerHTML = subjects[x].title;
    document.getElementById("Vraag").innerHTML = subjects[x].statement;
}