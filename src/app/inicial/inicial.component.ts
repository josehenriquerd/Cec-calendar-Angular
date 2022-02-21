import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  titulo!: 'Calendario Corporativo do CEC';

  constructor() {}

  ngOnInit(): void {}
}
