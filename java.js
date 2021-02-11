UserAwnsers = [];
inputs = 0;
progressvar = (100 / 33);
function AwnserSubmit(x)
{
    UserAwnsers[inputs] = x;
    inputs++;
    console.log(UserAwnsers);
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%"
    /* console.log(inputs) */
}
function GoBack(x)
{
    inputs--;
    document.getElementById("progressbar").style.width = (inputs*progressvar) + "%"
    /* console.log(inputs) */
}