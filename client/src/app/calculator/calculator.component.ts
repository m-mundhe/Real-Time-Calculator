import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // baseURL: string = "http://localhost:8000"; //For Developemnt
  baseURL: string = window.location.origin; //For Production
  input: string = '';
  result: string = '';
  formulaTemp: string = '';
  history: any[] = [];

  pressNum(num: string) {
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
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    return this.input.substr(pos + 1)
  }

  pressOperator(op: string) {
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

    this.formulaTemp = formula;
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    let expression = this.formulaTemp + " = " + this.input;
    this.addCalculation(expression);

    if (this.input == "0") this.input = "";
  }

  getCalculations() {
    const GET_CALCULATIONS_URL = this.baseURL + "/getCalculations";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    this.http.get<any>(GET_CALCULATIONS_URL, options).subscribe({
      next: data => {
        this.history = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  addCalculation(calculation: string) {
    const ADD_CALCULATION_URL = this.baseURL + "/addCalculation";

    let body = {
      "calculation": calculation
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    this.http.post<any>(ADD_CALCULATION_URL, body, options).subscribe({
      next: data => {
        this.socket.emit("newData");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}
