import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private http: HttpClient, private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on(
      "render",
      () => {
        this.getCalculations();
      }
    );

    this.getCalculations();
  }

  baseURL: string = "http://localhost:8000/";
  input: string = '';
  result: string = '';
  formulaTemp: string = '';
  history: any[] = [];

  pressNum(num: string) {

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

    this.input = this.input + num
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    //console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    //console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }

  pressOperator(op: string) {

    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }


  clear() {
    if (this.input != "") {
      this.input += "";
      this.input = this.input.substr(0, this.input.length - 1)
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

    if (this.input == "0") this.input = "";
  }

  getCalculations() {
    const GET_CALCULATIONS_URL = this.baseURL + "getCalculations";

    this.http.get<any>(GET_CALCULATIONS_URL).subscribe({
      next: data => {
        this.history = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  addCalculation(calculation: string) {
    const ADD_CALCULATION_URL = this.baseURL + "addCalculation";

    let body = {
      "calculation": calculation
    };

    this.http.post<any>(ADD_CALCULATION_URL, body).subscribe({
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
