// trying to rewrite threeWrongAnswers() in the most basic way
function threeNonidenticalItems(){
    let myArr = ["a", "b", "c", "d", "e", "f", "g"]
    function rThree (newArr) {
        if (newArr.length == 3) {
            console.log("line 6", newArr)
            return newArr
        } else {
            let randIndex = Math.floor(Math.random() * myArr.length)
            let randItem = myArr[randIndex]
            if (newArr.includes(randItem) == false) {
                newArr.push(randItem)
                console.log("line 12", newArr)
                return rThree(newArr)
            } else if (newArr.includes(randItem) == true) {
                console.log("line 14", newArr)
                return rThree(newArr) 
            } else {
                console.log("something went wrong")
            }
        }
    }
    return rThree([])
}
d = threeNonidenticalItems()
console.log(d)