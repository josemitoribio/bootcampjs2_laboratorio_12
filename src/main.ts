import { Reserva } from "./model";

const reservas: Reserva[] = [
    {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 3,
    },
    {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 4,
    },
    {
      tipoHabitacion: "suite",
      desayuno: true,
      pax: 2,
      noches: 1,
    },
  ];

class CalculadoraReservas {
    precios: { [key: string]: number };
    cargoPersonaAdicional: number;
    cargoDesayuno: number;
    iva: number;
    reservas: Reserva[];
  
    constructor(precios: { [key: string]: number }, reservas: Reserva[]) {
      this.precios = precios;
      this.cargoPersonaAdicional = 40;
      this.cargoDesayuno = 15;
      this.iva = 0.21;
      this.reservas = reservas;
    }
  
    calcularSubtotal(): number {
      let subtotal = 0;
  
      for (const reserva of this.reservas) {
        const precioPorNoche = this.precios[reserva.tipoHabitacion];
        const cargoPorPersonasAdicionales = (reserva.pax - 1) * this.cargoPersonaAdicional;
        const cargoDesayuno = reserva.desayuno ? reserva.pax * this.cargoDesayuno * reserva.noches : 0;
        subtotal += (precioPorNoche + cargoPorPersonasAdicionales + cargoDesayuno) * reserva.noches;
      }
  
      return subtotal;
    }
  
    calcularTotal(): number {
      const subtotal = this.calcularSubtotal();
      const total = subtotal * (1 + this.iva);
      return total;
    }
  }
  
  class CalculadoraClienteParticular extends CalculadoraReservas {
    constructor(reservas: Reserva[]) {
      const preciosClienteParticular = {
        standard: 100,
        suite: 150
      };
      super(preciosClienteParticular, reservas);
    }
  }
  
  class CalculadoraTourOperador extends CalculadoraReservas {
    constructor(reservas: Reserva[]) {
      const precioHabitacion = 100; 
      const preciosTourOperador = {
        standard: precioHabitacion,
        suite: precioHabitacion
      };
      super(preciosTourOperador, reservas);
    }
  }
  
  const calculadoraClienteParticular = new CalculadoraClienteParticular(reservas);
  const subtotalClienteParticular = calculadoraClienteParticular.calcularSubtotal();
  const totalClienteParticular = calculadoraClienteParticular.calcularTotal();
  
  console.log("Subtotal para cliente particular:", subtotalClienteParticular);
  console.log("Total para cliente particular:", totalClienteParticular);
  
  const calculadoraTourOperador = new CalculadoraTourOperador(reservas);
  const subtotalTourOperador = calculadoraTourOperador.calcularSubtotal();
  const totalTourOperador = calculadoraTourOperador.calcularTotal();
  
  console.log("Subtotal para tour operador:", subtotalTourOperador);
  console.log("Total para tour operador:", totalTourOperador);