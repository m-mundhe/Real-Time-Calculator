(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maheshwarmundhe/Documents/Project/calApp/src/main.ts */"zUnb");


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
        // baseURL: string = "http://localhost:8000/";
        this.baseURL = window.location.hostname;
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
        //Do Not Allow . more than once
        // if (num==".") {
        //   if (this.input !="" ) {
        //     const lastNum=this.getLastNumber()
        //     console.log(lastNum.lastIndexOf("."))
        //     if (lastNum.lastIndexOf(".") >= 0) return;
        //   }
        // }
        //Do Not Allow 0 at beginning. 
        //Javascript will throw Octal literals are not allowed in strict mode.
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
        //console.log(this.input)
        pos = this.input.toString().lastIndexOf("+");
        if (this.input.toString().lastIndexOf("-") > pos)
            pos = this.input.lastIndexOf("-");
        if (this.input.toString().lastIndexOf("*") > pos)
            pos = this.input.lastIndexOf("*");
        if (this.input.toString().lastIndexOf("/") > pos)
            pos = this.input.lastIndexOf("/");
        //console.log('Last ' + this.input.substr(pos + 1))
        return this.input.substr(pos + 1);
    }
    pressOperator(op) {
        //Do not allow operators more than once
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
        //console.log("Formula " + formula);
        this.formulaTemp = formula;
        this.result = eval(formula);
        //console.log('result',this.result);
    }
    getAnswer() {
        this.calcAnswer();
        this.input = this.result;
        let expression = this.formulaTemp + " = " + this.input;
        //console.log(expression);
        //this.history.push(expression);//add
        this.addCalculation(expression);
        if (this.input == "0")
            this.input = "";
    }
    getCalculations() {
        console.log(window.location.hostname);
        const GET_CALCULATIONS_URL = this.baseURL + "/getCalculations";
        console.log(GET_CALCULATIONS_URL);
        this.http.get(GET_CALCULATIONS_URL).subscribe({
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
        this.http.post(ADD_CALCULATION_URL, body).subscribe({
            next: data => {
                this.socket.emit("newData");
                //this.getCalculations();
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Previous Calculations");
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
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".calculator[_ngcontent-%COMP%] {\n    border: 1px solid #ccc;\n    border-radius: 5px;\n    \n    \n    \n    transform: translate(20%, 10%);\n    width: 400px;\n    float: left;\n  }\n\n  .calculator-screen[_ngcontent-%COMP%] {\n    width: 100%;\n    font-size: 5rem;\n    height: 80px;\n    border: none;\n    background-color: #252525;\n    color: #fff;\n    text-align: right;\n    padding-right: 20px;\n    padding-left: 10px;\n  }\n\n  button[_ngcontent-%COMP%] {\n    height: 60px;\n    background-color: #fff;\n    border-radius: 3px;\n    border: 1px solid #c4c4c4;\n    background-color: transparent;\n    font-size: 2rem;\n    color: #333;\n    background-image: linear-gradient(to bottom,transparent,transparent 50%,rgba(0,0,0,.04));\n    box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 0 rgba(255,255,255,.45), inset 0 -1px 0 0 rgba(255,255,255,.15), 0 1px 0 0 rgba(255,255,255,.15);\n    text-shadow: 0 1px rgba(255,255,255,.4);\n  }\n\n  button[_ngcontent-%COMP%]:hover {\n    background-color: #eaeaea;\n  }\n\n  .operator[_ngcontent-%COMP%] {\n      background-color: #e69e40;\n    \n  }\n\n  .all-clear[_ngcontent-%COMP%] {\n    background-color: #f0595f;\n    border-color: #b0353a;\n    color: #fff;\n  }\n\n  .all-clear[_ngcontent-%COMP%]:hover {\n    background-color: #f17377;\n  }\n\n  .equal-sign[_ngcontent-%COMP%] {\n    background-color: #2e86c0;\n    border-color: #337cac;\n    color: #fff;\n    \n    grid-area: 2 / 4 / 6 / 5;\n  }\n\n  .equal-sign[_ngcontent-%COMP%]:hover {\n    background-color: #4e9ed4;\n  }\n\n  .calculator-keys[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-gap: 20px;\n    padding: 20px;\n  }\n\n  .clear[_ngcontent-%COMP%] {\n      background-color: #aca8af;\n      border-color: #8a8787;\n      color: #fff;\n  }\n\n  .text[_ngcontent-%COMP%]{\n      margin: 10px;\n    font-size: 2.5rem;\n  }\n\n  .history[_ngcontent-%COMP%]{\n      width: 30%;\n      height: 100%;\n      font-size: 2.5rem;\n      float: right;\n      padding-top: 5%;\n      padding-right: 5%;\n  }\n\n  ul.no-bullets[_ngcontent-%COMP%] {\n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n  }\n\n  .li-box[_ngcontent-%COMP%]{\n      padding: 5px;\n      border: 1px solid #c4c4c4;\n      border-radius: 5px;\n      margin: 5px;\n      text-align: center;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsOEJBQThCO0lBQzlCLFlBQVk7SUFDWixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZUFBZTtJQUNmLFlBQVk7SUFDWixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0IsZUFBZTtJQUNmLFdBQVc7SUFDWCx3RkFBd0Y7SUFDeEYsaUtBQWlLO0lBQ2pLLHVDQUF1QztFQUN6Qzs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7RUFFQTtNQUNJLHlCQUF5QjtJQUMzQixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIscUJBQXFCO0lBQ3JCLFdBQVc7RUFDYjs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsV0FBVztJQUNYLGtCQUFrQjtJQUNsQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSx5QkFBeUI7RUFDM0I7O0VBRUE7SUFDRSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLGNBQWM7SUFDZCxhQUFhO0VBQ2Y7O0VBRUE7TUFDSSx5QkFBeUI7TUFDekIscUJBQXFCO01BQ3JCLFdBQVc7RUFDZjs7RUFFQTtNQUNJLFlBQVk7SUFDZCxpQkFBaUI7RUFDbkI7O0VBRUE7TUFDSSxVQUFVO01BQ1YsWUFBWTtNQUNaLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osZUFBZTtNQUNmLGlCQUFpQjtFQUNyQjs7RUFFQTtJQUNFLHFCQUFxQixFQUFFLG1CQUFtQjtJQUMxQyxVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLFNBQVMsRUFBRSxtQkFBbUI7RUFDaEM7O0VBQ0E7TUFDSSxZQUFZO01BQ1oseUJBQXlCO01BQ3pCLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsa0JBQWtCO0VBQ3RCIiwiZmlsZSI6ImNhbGN1bGF0b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYWxjdWxhdG9yIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXG4gICAgLyogdG9wOiAzNSU7ICovXG4gICAgLyogbGVmdDogNTAlOyAqL1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDIwJSwgMTAlKTtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gIH1cblxuICAuY2FsY3VsYXRvci1zY3JlZW4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtc2l6ZTogNXJlbTtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI1MjU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIH1cblxuICBidXR0b24ge1xuICAgIGhlaWdodDogNjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzRjNGM0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBjb2xvcjogIzMzMztcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHRyYW5zcGFyZW50LHRyYW5zcGFyZW50IDUwJSxyZ2JhKDAsMCwwLC4wNCkpO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDI1NSwyNTUsMjU1LC4wNSksIGluc2V0IDAgMXB4IDAgMCByZ2JhKDI1NSwyNTUsMjU1LC40NSksIGluc2V0IDAgLTFweCAwIDAgcmdiYSgyNTUsMjU1LDI1NSwuMTUpLCAwIDFweCAwIDAgcmdiYSgyNTUsMjU1LDI1NSwuMTUpO1xuICAgIHRleHQtc2hhZG93OiAwIDFweCByZ2JhKDI1NSwyNTUsMjU1LC40KTtcbiAgfVxuXG4gIGJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VhZWFlYTtcbiAgfVxuXG4gIC5vcGVyYXRvciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTY5ZTQwO1xuICAgIC8qIGNvbG9yOiAjMzM3Y2FjOyAqL1xuICB9XG5cbiAgLmFsbC1jbGVhciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwNTk1ZjtcbiAgICBib3JkZXItY29sb3I6ICNiMDM1M2E7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cblxuICAuYWxsLWNsZWFyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjE3Mzc3O1xuICB9XG5cbiAgLmVxdWFsLXNpZ24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyZTg2YzA7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzM3Y2FjO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC8qIGhlaWdodDogMTAwJTsgKi9cbiAgICBncmlkLWFyZWE6IDIgLyA0IC8gNiAvIDU7XG4gIH1cblxuICAuZXF1YWwtc2lnbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRlOWVkNDtcbiAgfVxuXG4gIC5jYWxjdWxhdG9yLWtleXMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcbiAgICBncmlkLWdhcDogMjBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICB9XG5cbiAgLmNsZWFyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhY2E4YWY7XG4gICAgICBib3JkZXItY29sb3I6ICM4YTg3ODc7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgfVxuXG4gIC50ZXh0e1xuICAgICAgbWFyZ2luOiAxMHB4O1xuICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICB9XG5cbiAgLmhpc3Rvcnl7XG4gICAgICB3aWR0aDogMzAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgZm9udC1zaXplOiAyLjVyZW07XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICBwYWRkaW5nLXRvcDogNSU7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiA1JTtcbiAgfVxuXG4gIHVsLm5vLWJ1bGxldHMge1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgLyogUmVtb3ZlIGJ1bGxldHMgKi9cbiAgICBwYWRkaW5nOiAwOyAvKiBSZW1vdmUgcGFkZGluZyAqL1xuICAgIG1hcmdpbjogMDsgLyogUmVtb3ZlIG1hcmdpbnMgKi9cbiAgfVxuICAubGktYm94e1xuICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2M0YzRjNDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgIG1hcmdpbjogNXB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9Il19 */"] });
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
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./history/history.component */ "osJj");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-socket-io */ "7JkF");










const config = { url: 'http://localhost:8000', options: {} };
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__["SocketIoModule"].forRoot(config)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_5__["CalculatorComponent"],
        _history_history_component__WEBPACK_IMPORTED_MODULE_6__["HistoryComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__["SocketIoModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_5__["CalculatorComponent"],
                    _history_history_component__WEBPACK_IMPORTED_MODULE_6__["HistoryComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                    ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__["SocketIoModule"].forRoot(config)
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "osJj":
/*!**********************************************!*\
  !*** ./src/app/history/history.component.ts ***!
  \**********************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class HistoryComponent {
    constructor() { }
    ngOnInit() {
    }
}
HistoryComponent.ɵfac = function HistoryComponent_Factory(t) { return new (t || HistoryComponent)(); };
HistoryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HistoryComponent, selectors: [["app-history"]], decls: 5, vars: 0, template: function HistoryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "History");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Hello");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["*[_ngcontent-%COMP%] { font-family: Lato}\nul[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  grid-auto-rows: 30px;\n  list-style: none;\n  grid-gap: 10px;\n}\nli[_ngcontent-%COMP%]{\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-auto-rows: 24px;\n}\nli[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 5px;\n  border-radius: 12px;\n  color: white;\n  box-sizing: border-box;\n  font-size: 12px;\n  font-family: 'Lato';\n  cursor: pointer;\n}\nli[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover {\n  background: #f44!important;\n  box-shadow: 0 0 6px 1px rgba(44,44,44,0.5)\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpc3RvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLGlCQUFpQjtBQUNyQjtFQUNFLGFBQWE7RUFDYiw0REFBNEQ7RUFDNUQsb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsMEJBQTBCO0VBQzFCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjtBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCO0FBQ0YiLCJmaWxlIjoiaGlzdG9yeS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7IGZvbnQtZmFtaWx5OiBMYXRvfVxudWwge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgxNDBweCwgMWZyKSk7XG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBncmlkLWdhcDogMTBweDtcbn1cbmxpe1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgZ3JpZC1hdXRvLXJvd3M6IDI0cHg7XG59XG5saSBzcGFuIHtcbiAgcGFkZGluZzogNXB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC1mYW1pbHk6ICdMYXRvJztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5saSBzcGFuOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y0NCFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IDAgMCA2cHggMXB4IHJnYmEoNDQsNDQsNDQsMC41KVxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HistoryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-history',
                templateUrl: './history.component.html',
                styleUrls: ['./history.component.css']
            }]
    }], function () { return []; }, null); })();


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