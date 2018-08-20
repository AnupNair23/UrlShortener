var app = angular.module('URLApp', ['config', ]);



function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output);
}

var url = "";

app.factory('UrlFactory', function ($http, $window) {

    return {

        addUrl: function (currenturl) {

            baseAddress = "http://localhost:4000/"
            url = baseAddress + "item/";
            return $http.post(url, currenturl);
        },
        getcountofurls: function () {

            baseAddress = "http://localhost:4000/"
            url = baseAddress + "GetCount/";
            return $http.get(url);
        }

    }
})


app.controller('URLController', function PostController($scope, $compile, UrlFactory, $window, $location) {


    // ADDING THE URL TO SHORTEN IT

    $scope.addUrl = function () {
        var currenturl = this.url;
        console.log("currenturl", currenturl);
        if (currenturl.orginal != null) {

            UrlFactory.addUrl(currenturl).success(function (data) {

                if (data) {
                    $scope.post = null;
                    console.log("Successfully shortened");
                    $scope.urldata = data;
                    console.log(" $scope.urldata ===== ", $scope.urldata);

                }
                //       $window.location.reload();

            })
        }
    }


    UrlFactory.getcountofurls().success(function (data) {

        $scope.urlswithdetails = [];
        $scope.urls = data;

        $scope.zerototwo = null;
        $scope.twotofour = null;
        $scope.fourtosix = null;
        $scope.sixtoeight = null;
        $scope.eighttoten = null;
        $scope.tentotwelve = null;
        $scope.twelvetofourteen = null;
        $scope.fourteentosixteen = null;
        $scope.sixteentoeighteen = null;
        $scope.eighteentotwenty = null;
        $scope.twentytotwo = null;
        $scope.twotofour = null;

        var len = $scope.urls.length;
        console.log("$scope.urls ===== ", $scope.urls)
        for (var i = 0; i < len; i++) {

            var date = $scope.urls[i].createdAt;
            

            var time = date.substring(16, 24);
            console.log("time === ", time);

            var formbody = {

                id: $scope.urls[i]._id,
                createdAttime: time,
                originalUrl: $scope.urls[i].originalUrl,
                shortUrl: $scope.urls[i].shortUrl,
                urlCode: $scope.urls[i].urlCode
            }

            if (time.startsWith('00') || time.startsWith('01') == true) {

                $scope.zerototwo++;
            }
            if (time.startsWith('02') || time.startsWith('03') == true) {

                $scope.twotofour++;
            }
            if (time.startsWith('04') || time.startsWith('05') == true) {

                $scope.fourtosix++;
            }
            if (time.startsWith('06') || time.startsWith('07') == true) {

                $scope.sixtoeight++;
            }
            if (time.startsWith('08') || time.startsWith('09') == true) {

                $scope.eighttoten++;
            }
            if (time.startsWith('10') || time.startsWith('11') == true) {

                $scope.tentotwelve++;
            }
            if (time.startsWith('12') || time.startsWith('13') == true) {

                $scope.twelvetofourteen++;
            }
            if (time.startsWith('14') || time.startsWith('15') == true) {

                $scope.fourteentosixteen++;
            }
            if (time.startsWith('16') || time.startsWith('17') == true) {

                $scope.sixteentoeighteen++;
            }
            if (time.startsWith('18') || time.startsWith('19') == true) {

                $scope.eighteentotwenty++;
            }
            if (time.startsWith('20') || time.startsWith('21') == true) {

                $scope.twentytotwo++;
            }
            if (time.startsWith('22') || time.startsWith('23') == true) {

                $scope.twotozero++;
            }

            $scope.urlswithdetails.push(formbody);

        }

        console.log("$scope.urlswithdetails ====", $scope.urlswithdetails);

        //   console.log("$scope.urlswithdetails ===== ", $scope.urlswithdetails);
        console.log("len ==== ", len);


        // ------------------------------------------------------- //
        // 
        // ------------------------------------------------------ //
        var BARCHARTHOME1 = $('#lineChartExample1');
        var lineChartExample1 = new Chart(BARCHARTHOME1, {

            type: 'bar',
            options: {
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            stepSize: 1
                        }
                    }],
                },
                legend: {
                    display: false
                }
            },
            data: {
                labels: ["00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00", "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-00:00"],
                datasets: [{
                    label: "",
                    backgroundColor: [
                        'rgb(57, 242, 170)',
                        'rgb(44, 218, 150)',
                        'rgb(46,189,133)',
                        'rgb(43,159,114)',
                        'rgb(38,149,106)',
                        'rgb(14,132,98)',
                        'rgb(9,119,87)',
                        'rgb(13,107,80)',
                        'rgb(9,93,69)',
                        'rgb(7,77,57)',
                        'rgb(10,66,50)',
                        'rgb(4,44,35)'
                    ],

                    data: [$scope.zerototwo, $scope.twotofour, $scope.fourtosix, $scope.sixtoeight, $scope.eighttoten, $scope.tentotwelve, $scope.twelvetofourteen, $scope.fourteentosixteen, $scope.sixteentoeighteen, $scope.eighteentotwenty, $scope.twentytotwo, $scope.twotozero]
                }]
            }
        });



    })

})