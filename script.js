$(document).ready(function() {
    let valueEntered = 0;
    let firstHours = 0;
    let firstMinutes = 0;
    let firstSeconds = 0;
    let secondHours = 0;
    let secondMinutes = 0;
    let secondSeconds = 0;
    let playerID = "second";
    let interval1;
    let interval2;
    let clickCount = 0;
    let otherClickCount = 0;
    var tic = new Audio("./tic.mp3");
    
    $(".timeEnter").keyup(function(){
        valueEntered = Number($(".timeEnter").val());
    });

    $(".submit").click(function(){
        if ($.isNumeric(valueEntered) && Math.floor(valueEntered) == valueEntered && Math.floor(valueEntered) > 0){
            let h = Math.floor(valueEntered / 60);
            let m = valueEntered % 60;
            let s = 0;
            firstHours = h;
            firstMinutes = m;
            firstSeconds = s;
            secondHours = h;
            secondMinutes = m;
            secondSeconds = s;
            $(".time").text(fixedTime(h,m,s));
            clickCount = 0;
        } else {
            $(".time").text("00:00:00");
            alert("Please enter an integer value!");
        }
    });

    $(".start").click(function (){
        clickCount += 1;
        otherClickCount += 1;
        if (clickCount === 1){
            if (playerID === "first"){
                clearInterval(interval2);
                interval1 = setInterval(function() {
                    countDown(interval1);
                }, 1000);
            } else {
                clearInterval(interval1);
                interval2 = setInterval(function() {
                    countDown(interval2);
                }, 1000);
            }
        } 
        if (otherClickCount === 1){
            change();
        }
    });

    $(".stop").click(function(){
        clearInterval(interval1);
        clearInterval(interval2);
        clickCount = 0;
    });

    $(".change").click(function(){
        if (firstMinutes > 0 && clickCount > 0){
            change();
        }
    });

    function change(){
            if (playerID === "first"){
                playerID = "second";

                $("#firstTimer").addClass("notCurrentPlayer");
                $("#" + playerID + "Timer").removeClass("notCurrentPlayer");
                $("#firstTicker").addClass("tickerDown");
                $("#" + playerID + "Ticker").removeClass("tickerDown");

                firstHours = parseInt($(".firstTime").text().split(":")[0]);
                firstMinutes = parseInt($(".firstTime").text().split(":")[1]);
                firstSeconds = parseInt($(".firstTime").text().split(":")[2]);
            } else {
                playerID = "first";

                $("#secondTimer").addClass("notCurrentPlayer");
                $("#" + playerID + "Timer").removeClass("notCurrentPlayer");
                $("#secondTicker").addClass("tickerDown");
                $("#" + playerID + "Ticker").removeClass("tickerDown");

                secondHours = parseInt($(".secondTime").text().split(":")[0]);
                secondMinutes = parseInt($(".secondTime").text().split(":")[1]);
                secondSeconds = parseInt($(".secondTime").text().split(":")[2]);
        };
    };

    function fixedTime(hours, minutes, seconds) {
        if (hours < 10){
            hours = "0"+ hours;
        }
        if (minutes < 10){
            minutes = "0"+ minutes;
        }
        if (seconds < 10){
            seconds = "0"+ seconds;
        }
        return hours + ":" + minutes + ":" + seconds;
    };

    function countDown (intervalId){
        let hours, minutes, seconds;
        if (playerID === "first") {
            hours = firstHours;
            minutes = firstMinutes;
            seconds = firstSeconds;
        } else {
            hours = secondHours;
            minutes = secondMinutes;
            seconds = secondSeconds;
        }
        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
        } else {
            if (seconds === 0) {
                seconds = 59;
                if (minutes === 0) {
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
            } else {
                seconds--;
            }
            if (playerID === "first") {
                firstHours = hours;
                firstMinutes = minutes;
                firstSeconds = seconds;
            } else {
                secondHours = hours;
                secondMinutes = minutes;
                secondSeconds = seconds;
            }
            tic.play();
            $("." + playerID + "Time").text(fixedTime(hours, minutes, seconds));
        }
    }   
});