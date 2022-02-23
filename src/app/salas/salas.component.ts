import { SalaService } from './sala.service';
import { Sala } from './../models/Sala';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
})
export class SalasComponent implements OnInit {
  titulo!: 'Salas';

  salaSelecionada!: Sala;

  salas!: Sala[];
  salaSelect(sala: Sala) {
    this.salaSelecionada = sala;
  }

  constructor(private salaService: SalaService) {}

  ngOnInit() {
    this.carregarSalas();
  }

  carregarSalas() {
    this.salaService.getAll().subscribe(
      (sala: Sala[]) => {
        this.salas = sala;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
}
