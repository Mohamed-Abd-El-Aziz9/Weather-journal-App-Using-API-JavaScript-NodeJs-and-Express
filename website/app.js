/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// define my API KEY from weather journal website
const keyApi = `1378a2af9479672c13297680b7c80986`;
// store the generate button on varabile to add eventLisnter on it. 
const generateButton = document.getElementById('generate');
//define EventLister on generate button to fetch the data from Current weather API 
generateButton.addEventListener("click", async () => {
    // I disabled the entryHolder section due to there no zip code to genrate data from it
    document.getElementById('entryHolder').classList.remove("d-none");
    // when the user clicl genrate button the entryholder will show up immeditally due to d-block class used in bootstrap
    document.getElementById('entryHolder').classList.add("d-block");
    // define valraible hold the value of zip code that user inter ,, which the main key in our project that all the data will genrate from it
    const zipCode = document.getElementById("zip").value;
    // define the URL of Current weather data
    const fullUrlApi = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${keyApi}&units=metric`
    // defina a varaible and use fetch to pull the data from API link and store the data in this varabile
    const feelingSection = document.getElementById("feelings").value;

    try {
        const resultOffetch = await fetch(fullUrlApi)
        const fullData = await resultOffetch.json()
        // define varabile to hold the temperature that comes from API
        const temperature = fullData.main.temp;
        // define varabile to hold the humidity that comes from API
        const humidity = fullData.main.humidity;
        // define varabile to hold the country name that comes from API
        const country = fullData.name;
        console.log(fullData)
        await fetch('/SaveData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: newDate,
                temp: temperature,
                humidity: humidity,
                name: country,
                feelingSection: feelingSection

            })
        })
        const ResposeOfData = await fetch("/GetData", {
            method: "GET"
        })


        // define a varabile that hold the real data and turn it using josn
        const finalData = await ResposeOfData.json()
        // here i will put the data that come form the api ,, every element in the right place in html code using innerhtml elemnet
        // I trying to use fontawse to genrate some icon to make the UI look better
        document.getElementById('humidity').innerHTML = `<i class="fa-solid fa-fire-flame-simple pe-1 mb-1 fs-6"></i>${finalData.humidity}`;
        document.getElementById('temp').innerHTML = ` <i class="fa-solid fa-sun text-warning fs-1 pe-3 mb-1 opacity-75 "></i>${Math.round(finalData.temp)} °C `;
        document.getElementById("date").innerHTML = `  <i class="fa-solid fa-calendar-days fs-4 text-white pe-3"></i>${finalData.date}`;
        document.getElementById('country').innerHTML = `<i class="fa-solid fa-earth-americas fs-1 text-primary  pe-3"></i> ${finalData.name}`;



    } catch (error) {
        console.log("Opps you might have an error" + error)
    }


})




