UserAwnsers = [];
inputs = 0;
SelecVragen = [];
SelecParties = [];

/* LargePartyId = [];
NonLargePartyId = [];
SeculierPartyId = [];
NonSeculierPartyId = []; */

LargeParties = false;
SecularParties = false;

progressvar = (100 / (subjects.length + 3));
SpecSCount = 0;


    /* document.getElementById("ButtonStart").onclick = function() {ButtonStart()}
    document.getElementById("ButtonTerug").onclick = function() {GoBack()}
    document.getElementById("ButtonEens").onclick = function() {AwnserSubmit("pro")}
    document.getElementById("ButtonGvb").onclick = function() {AwnserSubmit("none")}
    document.getElementById("ButtonOneens").onclick = function() {AwnserSubmit("contra")}
    document.getElementById("ButtonOverslaan").onclick = function() {AwnserSubmit("N/A")}
    document.getElementById("ButtonVolgS").onclick = function() {AwnserSubmit("VS")}
    document.getElementById("ButtonVolgP").onclick = function() {AwnserSubmit("VS")}
    document.getElementById("ButtonSpecGroot").onclick = function() {ButtonGroup("L")}
    document.getElementById("ButtonSpecSeculier").onclick = function() {ButtonGroup("S")} */

function ButtonStart()
{
    inputs++
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    document.getElementById("SectionProgressbar").style.display = "block";
    document.getElementById("MainContainer").style.backgroundColor = "whitesmoke";
    document.getElementById("SectionStart").style.display = "none";
    document.getElementById("SectionVragen").style.display = "unset";
    NextQuestion(inputs-1)
    /* console.log(inputs) */
}

function AwnserSubmit(awnser)
{  
    UserAwnsers[inputs-1] = awnser;
    inputs++;
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    console.log(inputs)
    if(inputs <= subjects.length)
    {
        NextQuestion(inputs-1);
    }
    else if(inputs == subjects.length + 1)
    {
        document.getElementById("SubContainer").style.display = "none";
        document.getElementById("SectionSpecS").style.display = "block";
        subjects.forEach(CheckIfEmpty)
        function CheckIfEmpty(awnser)
        {
            if(UserAwnsers[subjects.indexOf(awnser)] == "N/A")
            {
                document.getElementById("SBS" + subjects.indexOf(awnser)).parentElement.parentElement.style.display = "none"
                SelecVragen[subjects.indexOf(awnser)] = false;
            }
            else
            {
                document.getElementById("SBS" + subjects.indexOf(awnser)).parentElement.parentElement.style.display = "inline-block"
            }
        }
        
    }
    else if(inputs == subjects.length + 2)
    {
        document.getElementById("SectionSpecS").style.display = "none";
        document.getElementById("SectionSpecP").style.display = "block";
    }
    else if(inputs == subjects.length + 3)
    {
        document.getElementById("SectionSpecP").style.display = "none";
        /* document.getElementById("SectionResults").style.display = "block";
        CalcResults() */
        
    }
    
}
function GoBack()
{
    inputs--;
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    /* console.log(inputs) */
    if(inputs == 0)
    {
        document.getElementById("MainContainer").style.backgroundColor = "";
        document.getElementById("SectionStart").style.display = "block";
        document.getElementById("SectionProgressbar").style.display = "none";
        document.getElementById("SectionVragen").style.display = "none";
    }
    else if(inputs == subjects.length)
    {
        document.getElementById("SubContainer").style.display = "block";
        document.getElementById("SectionSpecS").style.display = "none";
    }
    else if(inputs == subjects.length + 1)
    {
        document.getElementById("SectionSpecS").style.display = "block";
        document.getElementById("SectionSpecP").style.display = "none";
    }
    else if(inputs == subjects.length + 2)
    {
        document.getElementById("SectionSpecP").style.display = "block";
        /* document.getElementById("SectionResults").style.display = "none"; */
    }
    else
    {
        NextQuestion(inputs-1);
    }
    
}

function NextQuestion(IndexVraag)
{
    document.getElementById("VraagOnderwerp").innerHTML = subjects[IndexVraag].title;
    document.getElementById("Vraag").innerHTML = subjects[IndexVraag].statement;
}
function SpecCreateButton(y)
{
    
    if(y == "S")
    {
        subjects.forEach(Create)
    }
    else if (y == "P")
    {
        parties.forEach(Create)
        console.log(parties.length)
    }
    
    function Create(x)
    {
        if(y == "S")
        {
            array = subjects;
            divis = 10;
        }
        else if (y == "P")
        {
            array = parties;
            divis = 8;
        }
        if(y == "S" || y == "P" && x.name != "Niet Stemmers")
        {
            button = document.createElement("button")
            button.classList.add("ButtonSpec", "ButtonBorder")
            button.id = array.indexOf(x) + y;
            if(y == "S")
            {
                button.onclick = SpecVraagS;
            }
            else if(y == "P")
            {
                button.onclick = SpecVraagP;
            }
            
            if(array.indexOf(x)  < divis)
            {
                document.getElementById("SC1" + y).appendChild(button)
            }
            else if (array.indexOf(x) < divis*2)
            {
                document.getElementById("SC2" + y).appendChild(button)
            }
            else
            {
                document.getElementById("SC3" + y).appendChild(button)
            }
            

            checkboxcontainer = document.createElement("span")
            checkboxcontainer.classList.add("fa-stack")
            button.appendChild(checkboxcontainer)

            checkbox1 = document.createElement("i")
            checkbox1.classList.add("fas", "facolorbox", "fa-square", "fa-stack-2x", "fa-2x")
            checkboxcontainer.appendChild(checkbox1)

            checkbox2 = document.createElement("i")
            checkbox2.classList.add("SpecNotSelected", "facolorcheck", "fas", "fa-check", "fa-stack-1x")
            checkbox2.id = "SB"+ y + array.indexOf(x);
            checkboxcontainer.appendChild(checkbox2)

            text = document.createElement("span")
            if(y == "S")
            {
                text.innerHTML = x.title
            }
            else if (y == "P")
            {
                text.innerHTML = x.name
            }
            button.appendChild(text)
        }
        else
        {
            if(y == "S")
            {
                console.log(UserAwnsers[array.indexOf(x)]);
                console.log(x.title);
            }
            else if(y == "P")
            {
                console.log(x.name);
            }
            
        }
    }
}
/* SpecCreateButton("S")
document.getElementById("SpecSCount").lastChild.innerHTML = "/" + subjects.length + " stellingen geslecteerd";
SpecCreateButton("P") */

function SpecVraagS()
{
    fullid = this.id.split("");
    if(fullid.length == 2)
    {
        index = fullid[0];
    }
    else
    {
        index = fullid[0] + fullid[1];
    }
    
    SBid = "SBS" + index;
    
    if(SelecVragen[index] == true)
    {
        SelecVragen[index] = false
        document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
        SpecSCount--;
        document.getElementById("SpecSCount").firstChild.innerHTML = SpecSCount
    }
    else if(SelecVragen[index] != true)
    {
        SelecVragen[index] = true
        document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
        SpecSCount++;
        document.getElementById("SpecSCount").firstChild.innerHTML = SpecSCount
    }
    /* console.log(SelecVragen) */
}

function SpecVraagP()
{
    fullid = this.id.split("");
    if(fullid.length == 2)
    {
        index = fullid[0];
    }
    else
    {
        index = fullid[0] + fullid[1];
    }
    SBid = "SBP" + index;
    
    if(SelecParties[index] == true)
    {
        SelecParties[index] = false
        document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
    }
    else if(SelecParties[index] != true)
    {
        SelecParties[index] = true
        document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
    }
    console.log(SelecParties)
}

function ButtonGroup(x)
{   
    if(x == "L")
    {
        if(LargeParties == false)
        {
            LargeParties = true;
            parties.forEach(Checksize)
            function Checksize(x)
            {
                SBid = "SBP" + parties.indexOf(x);
        
                if(x.size >= 10 && x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
                    SelecParties[parties.indexOf(x)] = true
                }
                else if(x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SelecParties[parties.indexOf(x)] = false
                }
            }
            document.getElementById("GroupLfa").classList.replace("SpecNotSelected", "SpecSelected")
        }
        else
        {
            LargeParties = false;
            parties.forEach(Checksize)
            function Checksize(x)
            {
                SBid = "SBP" + parties.indexOf(x);
        
                if(x.size >= 10 && x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SelecParties[parties.indexOf(x)] = false
                }
            }
            document.getElementById("GroupLfa").classList.replace("SpecSelected", "SpecNotSelected")
        }
    }
    else if(x == "S")
    {
        if(SecularParties == false)
        {
            SecularParties = true;
            parties.forEach(CheckSec)
            function CheckSec(x)
            {
                SBid = "SBP" + parties.indexOf(x);
        
                if(x.secular == true && x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
                    SelecParties[parties.indexOf(x)] = true
                }
                else if(x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SelecParties[parties.indexOf(x)] = false
                }
            }
            document.getElementById("GroupSfa").classList.replace("SpecNotSelected", "SpecSelected")
        }
        else
        {
            SecularParties = false;
            parties.forEach(Checksize)
            function Checksize(x)
            {
                SBid = "SBP" + parties.indexOf(x);
        
                if(x.secular == true && x.name != "Niet Stemmers")
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected");
                    SelecParties[parties.indexOf(x)] = false;
                }
            }
            document.getElementById("GroupSfa").classList.replace("SpecSelected", "SpecNotSelected");
        }
    }
}

/* function CalcResults()
{

} */




