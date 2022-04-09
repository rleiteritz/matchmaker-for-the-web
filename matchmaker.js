DESIRED_RESPONSE = [
    4, // agree
    1, // strongly disagree
    4, // agree
    5, // strongly agree
    5, // strongly agree
]

WEIGHT = [
   2, // average weight, max 10pts
   1, // lighter, max 5pts
   2, // average weight, max 10pts
   3, // heavier, max 15pts
   3, // heavier, max 15pts
]

// ** HIDE INSTRUCTIONS and START; SHOW 
function start() {
    var elements = document.getElementsByClassName('question')
    document.getElementById('instructions').style.display = "none";
    document.getElementById("start").style.display = "none";
    for (e=0; e<elements.length; e++) {
        elements[e].style.display = 'block';
    }
    document.getElementById('button').style.display = 'block';
}

// Makes sure all questions have been answered.
function validate() {
    if (document.querySelectorAll('input:checked').length !== 5) {
        console.log("validation fails");
        return false;
    } else {
        return true;
    }
}

// Messages based on compatibility.
MATCH_PRFCT = "If you see me, say hi! You're someone I want to get to know better!"
MATCH_HI = "Let's get coffee and talk soon♡."
MATCH_MID = "You'd make a good friend!"
MATCH_LO = "We might not mesh well together."

// This function is called when the "Submit" button is clicked.
function calcCompatibility() {
    
    validate();
    
    MAX_SCORE = DESIRED_RESPONSE.length * 5; // (# of Responses) * (max possible score)

    WEIGHTED_MAX = 0;

    var allQCompatibility = [];

    qCompatibility = [];

    noWeightTotal = 0;

    weightTotal = 0;

    questionResponse = [];

    weightedResponse = [];

    if (validate() === true) {
        // Return value of selected Radio choice.
        let q1Response = document.querySelector('input[name="q1"]:checked').value;
        let q2Response = document.querySelector('input[name="q2"]:checked').value;
        let q3Response = document.querySelector('input[name="q3"]:checked').value;
        let q4Response = document.querySelector('input[name="q4"]:checked').value;
        let q5Response = document.querySelector('input[name="q5"]:checked').value;


        // Add all responses to array
        questionResponse.push(q1Response, q2Response, q3Response, q4Response, q5Response);

        // Loop to iterate unweighted compatibility
        for (q=0; q < questionResponse.length; q++) {
            qCompatibility = 5 - Math.abs(DESIRED_RESPONSE[q] - questionResponse[q]);
            console.log("question " + (q+1) + " compatibility: " + qCompatibility);
            noWeightTotal += qCompatibility; 
        }
    
        // Loop to calculate max weighted score, and add weighted results to array
        for (w=0; w < WEIGHT.length; w++) {
            WEIGHTED_MAX += 5 * WEIGHT[w];
            wCompatibility = 5 - Math.abs(DESIRED_RESPONSE[w] - questionResponse[w]);
            wCompatibility *= WEIGHT[w];
            console.log("question " + (w+1) + " weighted compatibility: " + wCompatibility + '/' + 5*WEIGHT[w]);
            weightTotal += wCompatibility;
        }
    
        noWeightTotal *= 100 / MAX_SCORE;

        weightTotal *= 100 / WEIGHTED_MAX;

        console.log("Total Compatibility" + noWeightTotal);
        console.log("True Compatibility" + Math.round(weightTotal));
        
        // Messages displayed based on score, heart background added only if perfect compatibility.
        if (weightTotal == 100) {
            console.log(weightTotal)
            document.getElementById("button").innerHTML = MATCH_PRFCT
            document.body.style.backgroundImage = "url('falling-pink-hearts.gif')";
        } else if (100 > weightTotal && weightTotal > 75) {
            document.getElementById("button").innerHTML = MATCH_HI
        } else if (75 >= weightTotal && weightTotal > 50) {
            document.getElementById("button").innerHTML = MATCH_MID
        } else if (weightTotal <= 50) {
            document.getElementById("button").innerHTML = MATCH_LO
        }
        
        document.getElementById('result').innerHTML = 'We\'re ' + Math.round(weightTotal) + '% compatible!';

    // Working validation!
    } else if (validate() === false) {
        console.log("validation failed, make sure all of the questions have been answered");
        document.getElementById('result').innerHTML = 'Validation failed! Make sure all questions have been answered';
    }
}
