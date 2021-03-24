UserAwnsers = [];
inputs = 0;
SelecVragen = [];
SelecParties = [];

PartyScore = new Array(parties.length).fill(0);
ScoreUnsorted = [];

LargeParties = false;
SecularParties = false;

progressvar = (100 / (subjects.length + 3));
SpecSCount = 0;
SpecPCount = 0;


document.getElementById("ButtonStart").onclick = function() {ButtonStart()}
document.getElementById("ButtonTerug").onclick = function() {GoBack()}

document.getElementById("ButtonEens").onclick = function() {AwnserSubmit("pro")}
document.getElementById("ButtonGvb").onclick = function() {AwnserSubmit("none")}
document.getElementById("ButtonOneens").onclick = function() {AwnserSubmit("contra")}
document.getElementById("ButtonOverslaan").onclick = function() {AwnserSubmit("NaN")}
document.getElementById("ButtonVolgS").onclick = function() {AwnserSubmit("VS")}
document.getElementById("ButtonVolgP").onclick = function() {AwnserSubmit("VS")}

document.getElementById("ButtonSpecGroot").onclick = function() {ButtonGroup("L")}
document.getElementById("ButtonSpecSeculier").onclick = function() {ButtonGroup("S")}

document.getElementById("SectionStart").classList.toggle("HideSection")
/* Onclick van de start button op de start pagina */
function ButtonStart()
{
    inputs++
    document.getElementById("MainContainer").style.backgroundColor = "whitesmoke";
    ShowPage("Forward")
    NextQuestion(inputs-1)
}
/* Onclick van de eens, oneens, geen van bijde, overslaan en volgende knop slaat het antwoord op en laat het goede scherm zien  */
function AwnserSubmit(awnser)
{  
    UserAwnsers[inputs-1] = awnser;
    inputs++;
    console.log(inputs)

    if(inputs == subjects.length + 3)
    {
        if(SpecPCount > 2)
        {
            ShowPage("Forward")
            CalcResults()   
        }
        else
        {
            alert("Minimum van 3 partijen verijst")
            inputs--;
        }
          
    }
    else 
    {  
        if(inputs <= subjects.length)
        {
            NextQuestion(inputs-1);
        }
        else if(inputs == subjects.length + 1)
        {
            
            subjects.forEach(CheckIfEmpty)
            function CheckIfEmpty(awnser)
            {
                if(UserAwnsers[subjects.indexOf(awnser)] == "NaN")
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

        ShowPage("Forward")
    }
    
}
/* spreekt voor zich maar onclick van de terug button */
function GoBack()
{
    inputs--;
    if(inputs == 0)
    {
        document.getElementById("MainContainer").style.backgroundColor = "";
    }
    else if(inputs == subjects.length + 2)
    {
        for(x = 0; x < PartyScore.length; x++)
        {
            PartyScore[x] = 0;
        }
        document.getElementById("SectionResults").removeChild(document.getElementById("PercentileAltContainer"))   
    }
    else if(inputs < subjects.length)
    {
        NextQuestion(inputs-1);
    }
    ShowPage("Back")
    
}
function ShowPage(ForwardBack)
{
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%";
    
    if(inputs == 1 && ForwardBack == "Forward" || inputs == 0 && ForwardBack == "Back")
    {
        document.getElementById("SectionStart").classList.toggle("HideSection")
        document.getElementById("SectionProgressbar").classList.toggle("HideSection")
        document.getElementById("SectionVragen").classList.toggle("HideSection")
    }
    else if(inputs == subjects.length + 1 && ForwardBack == "Forward" || inputs == subjects.length && ForwardBack == "Back")
    {
        document.getElementById("SectionVragen").classList.toggle("HideSection")  
        document.getElementById("SectionSpecS").classList.toggle("HideSection")
    }
    else if (inputs == subjects.length + 2 && ForwardBack == "Forward" || inputs == subjects.length + 1 && ForwardBack == "Back")
    {
        document.getElementById("SectionSpecS").classList.toggle("HideSection")
        document.getElementById("SectionSpecP").classList.toggle("HideSection")
    }
    else if (inputs == subjects.length + 3 && ForwardBack == "Forward" || inputs == subjects.length + 2 && ForwardBack == "Back")
    {
        document.getElementById("SectionSpecP").classList.toggle("HideSection")
        document.getElementById("SectionResults").classList.toggle("HideSection")
    }
}
/* laat de goede vraag zien */
function NextQuestion(IndexVraag)
{
    document.getElementById("VraagOnderwerp").innerHTML = subjects[IndexVraag].title;
    document.getElementById("Vraag").innerHTML = subjects[IndexVraag].statement;
}
/* maakt de vraag weight en partij weight buttons aan */
function SpecCreateButton(Spec)
{
    
    if(Spec == "S")
    {
        subjects.forEach(Create)
    }
    else if (Spec == "P")
    {
        parties.forEach(Create)
    }
    
    function Create(SubOrPar)
    {
        if(Spec == "S")
        {
            array = subjects;
            divis = 10;
        }
        else if (Spec == "P")
        {
            array = parties;
            divis = 8;
        }
        if(Spec == "S" || Spec == "P" && SubOrPar.name != "Niet Stemmers")
        {
            button = document.createElement("button")
            button.classList.add("ButtonSpec", "ButtonBorder")
            button.id = array.indexOf(SubOrPar) + Spec;
            if(Spec == "S")
            {
                button.onclick = SpecVraagS;
            }
            else if(Spec == "P")
            {
                button.onclick = SpecVraagP;
            }
            
            if(array.indexOf(SubOrPar)  < divis)
            {
                document.getElementById("SC1" + Spec).appendChild(button)
            }
            else if (array.indexOf(SubOrPar) < divis*2)
            {
                document.getElementById("SC2" + Spec).appendChild(button)
            }
            else
            {
                document.getElementById("SC3" + Spec).appendChild(button)
            }
            

            checkboxcontainer = document.createElement("span")
            checkboxcontainer.classList.add("fa-stack")
            button.appendChild(checkboxcontainer)

            checkbox1 = document.createElement("i")
            checkbox1.classList.add("fas", "facolorbox", "fa-square", "fa-stack-2x", "fa-2x")
            checkboxcontainer.appendChild(checkbox1)

            checkbox2 = document.createElement("i")
            checkbox2.classList.add("SpecNotSelected", "facolorcheck", "fas", "fa-check", "fa-stack-1x")
            checkbox2.id = "SB"+ Spec + array.indexOf(SubOrPar);
            checkboxcontainer.appendChild(checkbox2)

            text = document.createElement("span")
            if(Spec == "S")
            {
                text.innerHTML = SubOrPar.title
            }
            else if (Spec == "P")
            {
                text.innerHTML = SubOrPar.name
            }
            button.appendChild(text)
        }
    }
}
SpecCreateButton("S")
document.getElementById("SpecSCount").lastChild.innerHTML = "/" + subjects.length + " stellingen geslecteerd";
SpecCreateButton("P")

/* onclick van vraag weight buttons + toggled antwoord */
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
}
/* onclick van partij weight buttons + toggled antwoord */
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
    
    if(SelecParties[index] == parties[index].name)
    {
        SelecParties[index] = false
        SpecPCount--;
        document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
    }
    else if(SelecParties[index] != parties[index].name)
    {
        SelecParties[index] = parties[index].name
        SpecPCount++;
        document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
    }
    console.log(SelecParties)
}
/* onclick van grote partijen en seculier partijen buttons + toggled antwoorden */
function ButtonGroup(Spec)
{   
    if(Spec == "L")
    {
        if(LargeParties == false)
        {
            LargeParties = true;
            parties.forEach(Checksize)
            function Checksize(PartyLT)
            {
                grotepartij = 1;
                SBid = "SBP" + parties.indexOf(PartyLT);
        
                if(PartyLT.size >= grotepartij && PartyLT.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartyLT)] != PartyLT.name)
                {
                    document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
                    SpecPCount++;
                    SelecParties[parties.indexOf(PartyLT)] = PartyLT.name
                }
                else if(PartyLT.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartyLT)] == PartyLT.name)
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SpecPCount--;
                    SelecParties[parties.indexOf(PartyLT)] = false
                }
            }
            document.getElementById("GroupLfa").classList.replace("SpecNotSelected", "SpecSelected")
        }
        else
        {
            LargeParties = false;
            parties.forEach(Checksize)
            function Checksize(PartyLF)
            {
                SBid = "SBP" + parties.indexOf(PartyLF);
        
                if(PartyLF.size >= grotepartij && PartyLF.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartyLF)] == PartyLF.name)
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SpecPCount--;
                    SelecParties[parties.indexOf(PartyLF)] = false
                }
            }
            document.getElementById("GroupLfa").classList.replace("SpecSelected", "SpecNotSelected")
        }
    }
    else if(Spec == "S")
    {
        if(SecularParties == false)
        {
            SecularParties = true;
            parties.forEach(CheckSec)
            function CheckSec(PartyST)
            {
                SBid = "SBP" + parties.indexOf(PartyST);
        
                if(PartyST.secular == true && PartyST.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartyST)] != PartyST.name)
                {
                    document.getElementById(SBid).classList.replace("SpecNotSelected", "SpecSelected")
                    SpecPCount++;
                    SelecParties[parties.indexOf(PartyST)] = PartyST.name
                }
                else if(PartyST.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartyST)] == PartyST.name)
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected")
                    SpecPCount--;
                    SelecParties[parties.indexOf(PartyST)] = false
                }
            }
            document.getElementById("GroupSfa").classList.replace("SpecNotSelected", "SpecSelected")
        }
        else
        {
            SecularParties = false;
            parties.forEach(Checksize)
            function Checksize(PartySF)
            {
                SBid = "SBP" + parties.indexOf(PartySF);
        
                if(PartySF.secular == true && PartySF.name != "Niet Stemmers" && SelecParties[parties.indexOf(PartySF)] == PartySF.name)
                {
                    document.getElementById(SBid).classList.replace("SpecSelected", "SpecNotSelected");
                    SpecPCount--;
                    SelecParties[parties.indexOf(PartySF)] = false;
                }
            }
            document.getElementById("GroupSfa").classList.replace("SpecSelected", "SpecNotSelected");
        }
    }
}
/* naam spreekt voor zich + maakt het juiste aantal non top 3 resultaat containers aan */
function CalcResults()
{
    SelecParties.forEach(LoopPerParty)
    function LoopPerParty(SPName)
    {
        subjects.forEach(LoopSubjects)
        function LoopSubjects(Subject)
        {
            Subject.parties.forEach(PartiesPerSubject)
            function PartiesPerSubject(Party)
            {
                if(Party.name == SPName)
                {
                    if(Party.position == UserAwnsers[subjects.indexOf(Subject)])
                    {
                        console.log(Subject.title + " " + Party.name + " " + Party.position + " " + UserAwnsers[subjects.indexOf(Subject)] + " " + PartyScore[SelecParties.indexOf(SPName)])
                        if(SelecVragen[subjects.indexOf(Subject)] == true)
                        {
                            console.log("bonus")
                            PartyScore[SelecParties.indexOf(SPName)] = PartyScore[SelecParties.indexOf(SPName)] + 2;
                        }
                        else
                        {
                            PartyScore[SelecParties.indexOf(SPName)] = PartyScore[SelecParties.indexOf(SPName)] + 1;
                        }
                    }
                }
            }            
        }
    }
    for(x = 0; x < PartyScore.length; x++)
    {
        if(x == 19)
        {
            ScoreUnsorted[x] = (PartyScore[x] / 2) + "." + x;
            PartyScore[x] = (PartyScore[x] / 2) + "." + x;
        }
        else
        {
            ScoreUnsorted[x] = PartyScore[x] + "." + x;
            PartyScore[x] = PartyScore[x] + "." + x;
        }
    }
    PartyScore.sort(function(a, b){return b-a})
    console.log(ScoreUnsorted)
    console.log(PartyScore)
    TopCount = 0;

    PercAltCon = document.createElement("div")
    PercAltCon.id = "PercentileAltContainer";
    document.getElementById("SectionResults").appendChild(PercAltCon)

    PartyScore.forEach(AsignScore)
    function AsignScore(ScoreSorted)
    {
        ScoreUnsorted.forEach(Asign)
        function Asign(ScoreIndex)
        {

            if(ScoreSorted == ScoreIndex)
            {
                ScoreSorted = ScoreSorted.split(".")
                ScoreSorted = ScoreSorted[0];

                if(TopCount <= 2 && ScoreSorted != 0)
                {
                    TopCount++;
                    if(TopCount == 1)
                    {
                        TopResult = document.getElementById("Result1")
                    }
                    else if(TopCount == 2)
                    {
                        TopResult = document.getElementById("Result2")
                    }
                    else if(TopCount == 3)
                    {
                        TopResult = document.getElementById("Result3")
                    }

                    
                    
                    percentage = Math.round(ScoreSorted / subjects.length * 100)
                    gradient = "conic-gradient(rgb(50, 50, 255) 0 " + percentage +"%, rgb(190, 190, 255) 0 "+ (360 - percentage) +"% )"

                    TopResult.firstElementChild.style.backgroundImage = gradient
                    TopResult.firstElementChild.style.transition = "background-image 1s"
                    TopResult.firstElementChild.firstElementChild.firstElementChild.innerHTML = percentage + "%";

                    TopResult.lastElementChild.firstElementChild.innerHTML = parties[ScoreUnsorted.indexOf(ScoreIndex)].name;
                }
                
                else if(ScoreSorted != 0)
                {
                    
                    percentage = Math.round(ScoreSorted / subjects.length * 100)

                    

                    PercAltRes = document.createElement("div")
                    PercAltRes.classList.add("PercentileAltResult")
                    PercAltCon.appendChild(PercAltRes)

                    PARChild1 = document.createElement("div")
                    PercAltRes.appendChild(PARChild1)

                    PARChild2 = document.createElement("div")
                    PARChild2.innerHTML = parties[ScoreUnsorted.indexOf(ScoreIndex)].name;
                    PercAltRes.appendChild(PARChild2)

                    PercBarCon = document.createElement("div")
                    PercBarCon.classList.add("PerentilceAltBarContainer")
                    PARChild1.appendChild(PercBarCon)

                    PARChild1Text = document.createElement("div")
                    PARChild1Text.classList.add("PercAlt")
                    PARChild1Text.innerHTML = percentage + "%"
                    PARChild1.appendChild(PARChild1Text)

                    PercBar = document.createElement("div")
                    PercBar.classList.add("PercentileBar")
                    PercBar.style.width = percentage + "%"
                    PercBarCon.appendChild(PercBar)

                }
            }
        }
    }

}