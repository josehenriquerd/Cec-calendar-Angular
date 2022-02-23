import { Turmas } from './../models/Turma';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
})
export class TurmasComponent implements OnInit {
  turmaSelecionada!: Turmas;

  modalRef?: BsModalRef;

  titulo!: 'Turmas';

  turmas = [
    {
      nome: 'Turma 1',
      dataInicio: '20/10/2020',
      datafim: '30/11/2021',
      NumeroAlunos: '20',
    },
    {
      nome: 'Turma 1',
      dataInicio: '20/10/2020',
      datafim: '30/11/2021',
      NumeroAlunos: '20',
    },
  ];

  turmaSelect(turma: Turmas) {
    this.turmaSelecionada = turma;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ModalService.show(template);
  }

  constructor(private ModalService: BsModalService) {}

  ngOnInit(): void {}
}
