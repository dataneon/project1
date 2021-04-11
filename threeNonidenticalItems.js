// trying to rewrite threeWrongAnswers() in the most basic way
function threeNonidenticalItems(){
    let myArr = ["a", "b", "c", "d", "e", "f", "g"]
    function rThree (newArr) {
        if (newArr.length == 3) {
            return newArr
        } else {
            let randIndex = Math.floor(Math.random() * myArr.length)
            let randItem = myArr[randIndex]
            if (newArr.includes(randItem) == false) {
                newArr.push(randItem)
                return rThree(newArr)
            } else if (newArr.includes(randItem) == true) {
                return rThree(newArr)
            } else {
                console.log("something went wrong")
            }
        }
    }
    rThree([])
}