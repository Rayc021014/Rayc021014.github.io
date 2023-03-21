function countDown() {
    let count = 15;
    document.getElementById("redirect-text").textContent = count + " seconds will redirect to home page.";
    setInterval(function () {
        count -= 1;
        document.getElementById("redirect-text").textContent = count + " seconds will redirect to home page";
    }, 1000);
}

setTimeout("location.href = 'https://www.netflix.com/tw/'", 15000);

countDown();