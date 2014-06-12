'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', function ($scope) {

    }])
    .controller('MyCtrl2', ['$scope', function ($scope) {

    }])
    .controller("PrototypeCtrl", ["$scope", function ($scope) {
        var ctrl = this;

        this.setTsv = function () {
            this.rowDelimiter = "\\n";
            this.cellDelimiter = "\\t";
        };

        this.setCsv = function () {
            this.rowDelimiter = "\\n";
            this.cellDelimiter = ",";
        };

        this.setTsv();

        this.input = "1\t2\t3\n11\tm12\t13";
        this.pattern = "$0=$1+$2";

        function convert(config) {
            var rows = config.input.split(config.rowDelimiter);
            var data = rows.map(function (row) {
                return row.split(config.cellDelimiter).map(function (cell) {
                    return (cell || '').trim();
                });
            });

            function createElement(cells) {
                return config.pattern.replace(/\$(\d+)/g, function (match, value) {
                    return cells[value];
                });
            }

            return {
                data: data,
                text: data.map(createElement).join("\n")
            }
        }

        function update() {
            var config = {
                input: ctrl.input,
                pattern: ctrl.pattern,
                rowDelimiter: new RegExp(ctrl.rowDelimiter),
                cellDelimiter: new RegExp(ctrl.cellDelimiter)
            };

            var result = convert(config);
            ctrl.result = result.text;
            ctrl.data = result.data;
            ctrl.longestRow = result.data.reduce(function (previous, current) {
                return current.length > previous.length ? current : previous
            }, [])
        }

        $scope.$watch("ctrl.input", function (val) {
            if (val) {
                update();
            }
        });
        $scope.$watch("ctrl.pattern", update);
        $scope.$watch("ctrl.rowDelimiter", update);
        $scope.$watch("ctrl.cellDelimiter", update);
    }]);
