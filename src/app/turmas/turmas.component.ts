import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
})
export class TurmasComponent implements OnInit {
  turmaSelecionada!: string;

  modalRef?: BsModalRef;

  titulo!: 'Turmas';

  turmas = [
    { nome: String, dataInicio: Date, datafim: Date, NumeroAlunos: Number },

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

  turmaSelect(turma: any) {
    this.turmaSelecionada = turma.nome;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ModalService.show(template);
  }

  constructor(private ModalService: BsModalService) {}

  ngOnInit(): void {}
}
