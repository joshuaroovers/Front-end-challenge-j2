UserAwnsers = [];
inputs = 0;
SpecVragen = [];
progressvar = (100 / (subjects.length + 3));



function ButtonStart()
{
    inputs++
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    document.getElementById("MainContainer").style.backgroundColor = "whitesmoke";
    document.getElementById("SectionStart").style.display = "none";
    document.getElementById("SectionVragen").style.display = "unset";
    NextQuestion(inputs-1)
    /* console.log(inputs) */
}

function AwnserSubmit(x)
{  
    UserAwnsers[inputs] = x;
    inputs++;
    console.log(UserAwnsers);
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    /* console.log(inputs) */
    if(inputs <= subjects.length)
    {
        NextQuestion(inputs-1);
    }
    else if(inputs == subjects.length + 1)
    {
        document.getElementById("VraagContainer").display = "none"
        document.getElementById("SpecContainer").display = "unset"
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
        document.getElementById("SectionStart").style.display = "unset";
        document.getElementById("SectionVragen").style.display = "none";
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
function SpecCreateButton()
{
    SpecContainer = document.getElementById("SpecContainer")

    subjects.forEach(Create)
    function Create(x)
    {
        button = document.createElement("button")
        button.classList.add("ButtonSpec", "ButtonBorder")
        button.id = subjects.indexOf(x)
        button.onclick = SpecVraag;
        if(subjects.indexOf(x)  <= 9)
        {
            document.getElementById("SC1").appendChild(button)
        }
        else if (subjects.indexOf(x) <= 19)
        {
            document.getElementById("SC2").appendChild(button)
        }
        else
        {
            document.getElementById("SC3").appendChild(button)
        }
        

        checkboxcontainer = document.createElement("span")
        checkboxcontainer.classList.add("fa-stack")
        button.appendChild(checkboxcontainer)

        checkbox1 = document.createElement("i")
        checkbox1.classList.add("fas", "facolorbox", "fa-square", "fa-stack-2x", "fa-2x")
        checkboxcontainer.appendChild(checkbox1)

        checkbox2 = document.createElement("i")
        checkbox2.classList.add("SpecNotSelected", "facolorcheck", "fas", "fa-check", "fa-stack-1x")
        checkbox2.id = "SB" + subjects.indexOf(x);
        checkboxcontainer.appendChild(checkbox2)

        text = document.createElement("span")
        text.innerHTML = x.title
        button.appendChild(text)
        
    }
    
}

function SpecVraag()
{
    index = this.id
    SBid = "SB" + index;
    
    if(SpecVragen[index] == true)
    {
        SpecVragen[index] = false
        document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
    }
    else if(SpecVragen[index] != true)
    {
        SpecVragen[index] = true
        document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
    }
}