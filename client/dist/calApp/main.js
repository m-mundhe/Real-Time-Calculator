(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maheshwarmundhe/Documents/Project/calApp/client/src/main.ts */"zUnb");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "LkI3":
/*!****************************************************!*\
  !*** ./src/app/calculator/calculator.component.ts ***!
  \****************************************************/
/*! exports provided: CalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatorComponent", function() { return CalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ "7JkF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");






function CalculatorComponent_li_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.calculation, "");
} }
class CalculatorComponent {
    constructor(http, socket) {
        this.http = http;
        this.socket = socket;
        // baseURL: string = "http://localhost:8000"; //For Developemnt
        this.baseURL = window.location.origin; //For Production
        this.input = '';
        this.result = '';
        this.formulaTemp = '';
        this.history = [];
    }
    ngOnInit() {
        this.socket.on("render", () => {
            this.getCalculations();
        });
        this.getCalculations();
    }
    pressNum(num) {
        if (num == "0") {
            if (this.input == "") {
                return;
            }
            const PrevKey = this.input[this.input.length - 1];
            if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
                return;
            }
        }
        this.input = this.input + num;
        this.calcAnswer();
    }
    getLastOperand() {
        let pos;
        pos = this.input.toString().lastIndexOf("+");
        if (this.input.toString().lastIndexOf("-") > pos)
            pos = this.input.lastIndexOf("-");
        if (this.input.toString().lastIndexOf("*") > pos)
            pos = this.input.lastIndexOf("*");
        if (this.input.toString().lastIndexOf("/") > pos)
            pos = this.input.lastIndexOf("/");
        return this.input.substr(pos + 1);
    }
    pressOperator(op) {
        const lastKey = this.input[this.input.length - 1];
        if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
            return;
        }
        this.input = this.input + op;
        this.calcAnswer();
    }
    clear() {
        if (this.input != "") {
            this.input += "";
            this.input = this.input.substr(0, this.input.length - 1);
        }
    }
    allClear() {
        this.result = '';
        this.input = '';
    }
    calcAnswer() {
        let formula = this.input;
        let lastKey = formula[formula.length - 1];
        if (lastKey === '.') {
            formula = formula.substr(0, formula.length - 1);
        }
        lastKey = formula[formula.length - 1];
        if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
            formula = formula.substr(0, formula.length - 1);
        }
        this.formulaTemp = formula;
        this.result = eval(formula);
    }
    getAnswer() {
        this.calcAnswer();
        this.input = this.result;
        let expression = this.formulaTemp + " = " + this.input;
        this.addCalculation(expression);
        if (this.input == "0")
            this.input = "";
    }
    getCalculations() {
        const GET_CALCULATIONS_URL = this.baseURL + "/getCalculations";
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        this.http.get(GET_CALCULATIONS_URL, options).subscribe({
            next: data => {
                this.history = data;
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }
    addCalculation(calculation) {
        const ADD_CALCULATION_URL = this.baseURL + "/addCalculation";
        let body = {
            "calculation": calculation
        };
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        this.http.post(ADD_CALCULATION_URL, body, options).subscribe({
            next: data => {
                this.socket.emit("newData");
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }
}
CalculatorComponent.ɵfac = function CalculatorComponent_Factory(t) { return new (t || CalculatorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"])); };
CalculatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CalculatorComponent, selectors: [["app-calculator"]], decls: 57, vars: 3, consts: [[1, "calculator"], [1, "text"], [1, "input-group", "input-group-sm", "col-sm-12", "m-0", "p-0"], ["type", "text", 1, "col-sm-12", "form-control", "text-lg-right", "calculator-screen"], ["type", "text", 1, "form-control", "text-sm-right", "calculator-screen"], [1, "col-sm-12", "p-1", "m-0"], ["type", "button", 1, "btn", "btn-info", "col-sm-6", "all-clear", 3, "click"], ["type", "button", 1, "btn", "btn-warning", "col-sm-3", "clear", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", "col-sm-3", "operator", 3, "click"], ["type", "button", 1, "btn", "btn-lg", "btn-outline-secondary", "col-sm-3", "p-1", 3, "click"], ["type", "button", 1, "btn", "btn-lg", "btn-secondary", "col-sm-3", "p-1", "operator", 3, "click"], ["type", "button", 1, "btn", "btn-lg", "btn-success", "col-sm-6", "p-1", "equal-sign", 3, "click"], [1, "history"], [1, "text-center"], [1, "list-group", "no-bullets"], ["class", "li-box", 4, "ngFor", "ngForOf"], [1, "li-box"]], template: function CalculatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Input");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Result");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_12_listener() { return ctx.allClear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "AC");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_14_listener() { return ctx.clear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "C");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_16_listener() { return ctx.pressOperator("/"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\u00F7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_19_listener() { return ctx.pressNum("7"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_21_listener() { return ctx.pressNum("8"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "8");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_23_listener() { return ctx.pressNum("9"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "9");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_25_listener() { return ctx.pressOperator("*"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_28_listener() { return ctx.pressNum("4"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_30_listener() { return ctx.pressNum("5"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_32_listener() { return ctx.pressNum("6"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "6");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_34_listener() { return ctx.pressOperator("-"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_37_listener() { return ctx.pressNum("1"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_39_listener() { return ctx.pressNum("2"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_41_listener() { return ctx.pressNum("3"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_43_listener() { return ctx.pressOperator("+"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_46_listener() { return ctx.pressNum("."); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_48_listener() { return ctx.pressNum("0"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculatorComponent_Template_button_click_50_listener() { return ctx.getAnswer(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "=");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "h1", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Latest 10 Calculations");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "ul", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](56, CalculatorComponent_li_56_Template, 2, 1, "li", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.input);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.result);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.history);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".calculator[_ngcontent-%COMP%] {\n    border: 1px solid #ccc;\n    border-radius: 5px;\n    transform: translate(20%, 10%);\n    width: 400px;\n    float: left;\n  }\n\n  .calculator-screen[_ngcontent-%COMP%] {\n    width: 100%;\n    font-size: 5rem;\n    height: 80px;\n    border: none;\n    background-color: #252525;\n    color: #fff;\n    text-align: right;\n    padding-right: 20px;\n    padding-left: 10px;\n  }\n\n  button[_ngcontent-%COMP%] {\n    height: 60px;\n    background-color: #fff;\n    border-radius: 3px;\n    border: 1px solid #c4c4c4;\n    background-color: transparent;\n    font-size: 2rem;\n    color: #333;\n    background-image: linear-gradient(to bottom,transparent,transparent 50%,rgba(0,0,0,.04));\n    box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 0 rgba(255,255,255,.45), inset 0 -1px 0 0 rgba(255,255,255,.15), 0 1px 0 0 rgba(255,255,255,.15);\n    text-shadow: 0 1px rgba(255,255,255,.4);\n  }\n\n  button[_ngcontent-%COMP%]:hover {\n    background-color: #eaeaea;\n  }\n\n  .operator[_ngcontent-%COMP%] {\n      background-color: #e69e40;\n    \n  }\n\n  .all-clear[_ngcontent-%COMP%] {\n    background-color: #f0595f;\n    border-color: #b0353a;\n    color: #fff;\n  }\n\n  .all-clear[_ngcontent-%COMP%]:hover {\n    background-color: #f17377;\n  }\n\n  .equal-sign[_ngcontent-%COMP%] {\n    background-color: #2e86c0;\n    border-color: #337cac;\n    color: #fff;\n    grid-area: 2 / 4 / 6 / 5;\n  }\n\n  .equal-sign[_ngcontent-%COMP%]:hover {\n    background-color: #4e9ed4;\n  }\n\n  .clear[_ngcontent-%COMP%] {\n      background-color: #aca8af;\n      border-color: #8a8787;\n      color: #fff;\n  }\n\n  .text[_ngcontent-%COMP%]{\n      margin: 10px;\n    font-size: 2.5rem;\n  }\n\n  .history[_ngcontent-%COMP%]{\n      width: 30%;\n      height: 100%;\n      font-size: 2.5rem;\n      float: right;\n      padding-top: 5%;\n      padding-right: 5%;\n  }\n\n  ul.no-bullets[_ngcontent-%COMP%] {\n    list-style-type: none; \n    padding: 0; \n    margin: 0;\n  }\n\n  .li-box[_ngcontent-%COMP%]{\n      padding: 5px;\n      border: 1px solid #c4c4c4;\n      border-radius: 5px;\n      margin: 5px;\n      text-align: center;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsOEJBQThCO0lBQzlCLFlBQVk7SUFDWixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZUFBZTtJQUNmLFlBQVk7SUFDWixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0IsZUFBZTtJQUNmLFdBQVc7SUFDWCx3RkFBd0Y7SUFDeEYsaUtBQWlLO0lBQ2pLLHVDQUF1QztFQUN6Qzs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7RUFFQTtNQUNJLHlCQUF5QjtJQUMzQixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIscUJBQXFCO0lBQ3JCLFdBQVc7RUFDYjs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsV0FBVztJQUNYLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7RUFFQTtNQUNJLHlCQUF5QjtNQUN6QixxQkFBcUI7TUFDckIsV0FBVztFQUNmOztFQUVBO01BQ0ksWUFBWTtJQUNkLGlCQUFpQjtFQUNuQjs7RUFFQTtNQUNJLFVBQVU7TUFDVixZQUFZO01BQ1osaUJBQWlCO01BQ2pCLFlBQVk7TUFDWixlQUFlO01BQ2YsaUJBQWlCO0VBQ3JCOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLFVBQVU7SUFDVixTQUFTO0VBQ1g7O0VBRUE7TUFDSSxZQUFZO01BQ1oseUJBQXlCO01BQ3pCLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsa0JBQWtCO0VBQ3RCIiwiZmlsZSI6ImNhbGN1bGF0b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYWxjdWxhdG9yIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyMCUsIDEwJSk7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG5cbiAgLmNhbGN1bGF0b3Itc2NyZWVuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXNpemU6IDVyZW07XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNTI1O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICB9XG5cbiAgYnV0dG9uIHtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2M0YzRjNDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6ICMzMzM7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSx0cmFuc3BhcmVudCx0cmFuc3BhcmVudCA1MCUscmdiYSgwLDAsMCwuMDQpKTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggcmdiYSgyNTUsMjU1LDI1NSwuMDUpLCBpbnNldCAwIDFweCAwIDAgcmdiYSgyNTUsMjU1LDI1NSwuNDUpLCBpbnNldCAwIC0xcHggMCAwIHJnYmEoMjU1LDI1NSwyNTUsLjE1KSwgMCAxcHggMCAwIHJnYmEoMjU1LDI1NSwyNTUsLjE1KTtcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggcmdiYSgyNTUsMjU1LDI1NSwuNCk7XG4gIH1cblxuICBidXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYWVhZWE7XG4gIH1cblxuICAub3BlcmF0b3Ige1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U2OWU0MDtcbiAgICAvKiBjb2xvcjogIzMzN2NhYzsgKi9cbiAgfVxuXG4gIC5hbGwtY2xlYXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMDU5NWY7XG4gICAgYm9yZGVyLWNvbG9yOiAjYjAzNTNhO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cbiAgLmFsbC1jbGVhcjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YxNzM3NztcbiAgfVxuXG4gIC5lcXVhbC1zaWduIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4NmMwO1xuICAgIGJvcmRlci1jb2xvcjogIzMzN2NhYztcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBncmlkLWFyZWE6IDIgLyA0IC8gNiAvIDU7XG4gIH1cblxuICAuZXF1YWwtc2lnbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRlOWVkNDtcbiAgfVxuXG4gIC5jbGVhciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWNhOGFmO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjOGE4Nzg3O1xuICAgICAgY29sb3I6ICNmZmY7XG4gIH1cblxuICAudGV4dHtcbiAgICAgIG1hcmdpbjogMTBweDtcbiAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgfVxuXG4gIC5oaXN0b3J5e1xuICAgICAgd2lkdGg6IDMwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgcGFkZGluZy10b3A6IDUlO1xuICAgICAgcGFkZGluZy1yaWdodDogNSU7XG4gIH1cblxuICB1bC5uby1idWxsZXRzIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IFxuICAgIHBhZGRpbmc6IDA7IFxuICAgIG1hcmdpbjogMDtcbiAgfVxuICBcbiAgLmxpLWJveHtcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjNGM0YzQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICBtYXJnaW46IDVweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CalculatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-calculator',
                templateUrl: './calculator.component.html',
                styleUrls: ['./calculator.component.css']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculator/calculator.component */ "LkI3");



class AppComponent {
    constructor() {
        this.title = 'calApp';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-calculator");
    } }, directives: [_calculator_calculator_component__WEBPACK_IMPORTED_MODULE_1__["CalculatorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calculator/calculator.component */ "LkI3");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-socket-io */ "7JkF");









// const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} }; //For Developemnt
const config = { url: window.location.origin, options: {} }; //For Production
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_6__["SocketIoModule"].forRoot(config)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_5__["CalculatorComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], ngx_socket_io__WEBPACK_IMPORTED_MODULE_6__["SocketIoModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_5__["CalculatorComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                    ngx_socket_io__WEBPACK_IMPORTED_MODULE_6__["SocketIoModule"].forRoot(config)
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map