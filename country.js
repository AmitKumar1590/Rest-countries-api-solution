const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countrynameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const topLevelDomain = document.querySelector('.top-level-domain')
const capital = document.querySelector('.capital')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
    .then(([country]) => {
        if (country.languages) {
            languages.innerText=(Object.values(country.languages).join(', '))
        }else{
            languages.parentElement.style.display='none'
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        }else{
            currencies.parentElement.style.display='none'
        }
        if(country.subregion){
            subRegion.innerText = country.subregion
        }
        else{
            subRegion.parentElement.style.display='none'
        }
        if(country.capital){
            capital.innerText = country.capital?.[0]
        }
        else{
            capital.parentElement.style.display='none'
        }



        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        }
        else {
            nativeName.innerText = country.name.common
        }

        flagImage.src = country.flags.svg


        population.innerText = country.population.toLocaleString('en-IN')
        countrynameH1.innerText = country.name.common
        region.innerText = country.region
       
     
        topLevelDomain.innerText = country.tld.join(', ')

if(country.borders){
    country.borders.forEach((border)=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
        .then(([borderCountry])=>{
            console.log(borderCountry);
            const borderCountryTag=document.createElement('a')
            borderCountryTag.innerText=borderCountry.name.common
            borderCountries.append(borderCountryTag)
        })
    })

}

    })