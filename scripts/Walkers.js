import { getWalkers, getCities, getWalkerCities } from "./database.js"

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [,walkerId] = itemClicked.id.split("--")
            let matchingWalker = null

            /* 
            First i need to define a matchingWalker variable as null
            Next, i'll iterate through the walker objects
                if the walker id = the clicked walker's id, then the matchingWalker should be set to the clicked walker object

            Then, i need to define a matchingWalkerCities variable as an empty array
            i will then iterate through the walkerCity objects
                if the walkerCity's walkerId = the matchingWalker's id, then i should add the walkerCity's cityId*** (previously i had been adding the whole walkerCity object) to the matchingWalkerCities array

            Lastly, i need to define a matchingCities variable as null*** (previously an empty array but i had a difficult time accessing properties within objects for string interpolation)
            ***Addendum*** i think i also need to define a function somewhere that concatenates strings of city names
            and again iterate through the city objects
                if the cityId in a walkerCity object in the matchingWalkerCities object = the city's id, then i should add the city object to the matchingCities array

            For the string interpolation, i think i can use destructuring to print all city names in the matchingCities array
            */
            
            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                   matchingWalker = walker
                }
            }


            let matchingWalkerCities = []
            for (const walkerCity of walkerCities) {
                if (walkerCity.walkerId === matchingWalker.id) {
                    matchingWalkerCities.push(walkerCity.cityId)
                }
            }

            let matchingCities = []

            const makeMultipleCitiesString = (multipleCitiesArray) => {
                let multipleCitiesString = ''
                if (multipleCitiesArray.length < 3) {
                    multipleCitiesString += `${multipleCitiesArray[0]} and ${multipleCitiesArray[1]}`
                } else {
                    for (let i = 0; i < (multipleCitiesArray.length - 1); i++) {
                        multipleCitiesString += `${multipleCitiesArray[i]}, `
                    }
                    
                    let lastCity = multipleCitiesArray.length
                    multipleCitiesString += `and ${multipleCitiesArray[lastCity]}`
                    
                }

                return multipleCitiesString
            }

            const makeWindowAlertMessage = () => {
                let windowAlertMessage = `${matchingWalker.name} currently services `

                if (matchingWalkerCities.length > 1) {
                    for (const city of cities) {
                        for (let i = 0; i < matchingWalkerCities.length; i++) {
                            if (matchingWalkerCities[i] === city.id) {
                                matchingCities.push(city.name)
                            }
                        }
                    }
                    windowAlertMessage += makeMultipleCitiesString(matchingCities)
                } else {
                    for (const city of cities) {
                        if (matchingWalkerCities[0] === city.id)
                            matchingCities.push(city.name)
                    }

                    windowAlertMessage += `${matchingCities[0]}`
                }

                return windowAlertMessage
            }

            window.alert(makeWindowAlertMessage())
        }
    }
)

const walkers = getWalkers()
const cities = getCities()
const walkerCities = getWalkerCities()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML
}

