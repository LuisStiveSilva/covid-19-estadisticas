const select = document.getElementById('paises')

let covidData;

(function onLoad(){
    getData()
})()

select.onchange = () =>{
    const valorSeleccionado = select.value;
    const dataPais = covidData.filter(pais=>pais.country==valorSeleccionado)[0]

    const infectados = document.getElementById('output-infectados')   
    const recuperados = document.getElementById('output-recuperados') 
    const muertos = document.getElementById('output-muertos') 

    infectados.textContent = dataPais.cases.total.toLocaleString("es-ES")
    recuperados.textContent = dataPais.cases.recovered.toLocaleString("es-ES")
    muertos.textContent = dataPais.deaths.total.toLocaleString("es-ES")
}

async function getData() {
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "192c461946msh495ef167ef71936p125a48jsn45141c3f8156",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(res => {
        //ordeno alfabeticamente los paises
        let paisArray=[]
        res.response.forEach(pais => {
            paisArray.push(pais.country)
            paisArray.sort()
        });

        //agrego los paises al select
        paisArray.forEach(pais =>{
            const option = document.createElement('OPTION');
            let p =  pais
            option.innerHTML = p
            select.appendChild(option)
        })

        covidData = res.response;
    })
    .catch(err => {
        console.error(err);
    });
}