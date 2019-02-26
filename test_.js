
function test(rr, cb) {
    setTimeout(function () {
        cb(rr + "nnn", "ddd");
    })
    // cb(rr + "nnn", "ddd");
}

function usetest(rrrr) {

    test(rrrr + "vvv", function(data, second) {
        console.log(data, second);
    })

    console.log("the end")
}

usetest("aaaa");



