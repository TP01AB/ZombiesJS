class Zombie {
    constructor(nombre, vida, potencia, desplazamiento) {
        this._nombre = nombre;
        this._potencia = potencia;
        this._desplazamiento = desplazamiento;
        this._vida = vida;
    };

    //No son métodos tradicionales, sino propiedades computadas
    get nombreZ() {
        return this._nombre;
    };

    set nombreZ(n) {
        this._nombre = n;
    };

    get potenciaZ() {
        return this._potencia;
    }

    set potenciaZ(m) {
        this._potencia = m;
    }

    get desplazamientoZ() {
        return this._desplazamiento;
    };

    set desplazamientoZ(p) {
        this._desplazamiento = p;
    };

    get vidaZ() {
        return this._vida;
    };

    set vidaZ(p) {
        this._vida = p;
    };
    caminar() {
        console.log(this._nombre + ' camina ' + this._desplazamiento + ' metros');
    };

    atacar(objetivo) {
        if (objetivo.vida <= 0) {
            console.log(this._nombre + ' ataca a ' + objetivo._nombre + ' y le causa la muerte.');
            objetivo._vida = 0;
            objetivo._faccion = 'z';
        } else {
            objetivo._vida = objetivo._vida - this._potencia;
            console.log(this._nombre + ' ataca a ' + objetivo._nombre + ' y la causa ' + this._potencia + ' puntos de daño.');
            console.log(objetivo._nombre + ' le quedan ' + objetivo._vida + ' de vida.')
        }

    };

    comer() {
        console.log(this._nombre + ' encuentra comida y se para a comer ');
    }
}
class Terrestre extends Zombie {
    constructor(nombre, vida, potencia, desplazamiento) {
        super(nombre, vida, potencia, desplazamiento);
    };
}
class Acuatico extends Zombie {
    constructor(nombre, vida, potencia, desplazamiento) {
        super(nombre, vida, potencia, desplazamiento);
    };
}
class Abominacion extends Zombie {
    constructor(nombre, vida, potencia, desplazamiento) {
        super(nombre, vida, potencia, desplazamiento);
    };
}

class Persona {
    constructor(nombre, apellido, nivel, empleo) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._nivel = nivel;
        this._empleo = empleo;
        this._faccion = 'p';
        this._arma = null;
    };
    get nombreP() {
        return this._nombre;
    };

    set nombreP(n) {
        this._nombre = n;
    };
    get apellido() {
        return this._apellido;
    };

    set apellido(n) {
        this._apellido = n;
    };
    get nivelP() {
        return this._nivel;
    };

    set nivelP(n) {
        this._nivel = n;
    };
    get empleoP() {
        return this._empleo;
    };

    set empleoP(n) {
        this._empleo = n;
    };
    get faccion() {
        return this._faccion;
    };

    set faccion(n) {
        this._faccion = n;
    };
    get armaP() {
        this._arma;
    }
    get armaE() {
        if (this._arma != null) { return true; } else { return false; };
    }

    toString() {
        console.log(this._nombre + ' ' + this._apellido + ' con nivel: ' + this._nivel + ' de profesion ' + this._empleo);
    };
    caminar() {
        console.log(this._nombre + ' camina.');
    };

    atacar(objetivo) {
        if (objetivo._vida > 0) {
            if (this._arma == null) {
                console.log(this._nombre + ' esta desarmado , no puede defenderse y muere.');
                this._faccion = 'z';
                this._vida = 0;
            } else {
                if (this._arma instanceof Distancia) {
                    if (this._arma._municion > 0) {
                        console.log(this._nombre + ' ataca con ' + this._arma._nombre + ' a ' + objetivo._nombre + ' zombie.');
                        objetivo._vida = objetivo._vida - this._arma._potencia;
                        this._arma._municion--;
                        console.log(objetivo._nombre + ' le quedan ' + objetivo._vida + ' de vida.')
                    } else {
                        console.log(this._nombre + ' intenta atacar con ' + this._arma._nombre + ' pero no tiene municion ,' + objetivo._nombre + ' le transforma en zombie.');
                        this._faccion = 'z';
                        this._vida = 0;
                    }
                } else {
                    console.log(this._nombre + ' ataca con ' + this._arma._nombre + ' a ' + objetivo._nombre + ' zombie.');
                    objetivo._vida = objetivo._vida - this._arma._potencia;
                    console.log(objetivo._nombre + ' le quedan ' + objetivo.vidaZ() + ' de vida.')
                }
            }
        }
    };

    equipar(arma) {
        console.log(this._nombre + ' se equipa  con ' + arma._nombre);
        this._arma = arma;
    }
    descansa() {
        console.log(this._nombre + ' descansa y recupera 1 de vida');
        this._vida += 1;
    }
}

//ARMERIA
class Arma {
    constructor(nombre, potencia) {
        this._nombre = nombre;
        this._potencia = potencia;
    };

    get nombreArma() {
        return this._nombre;
    };

    set nombreArma(p) {
        this._nombre = p;
    };
    get potencia() {
        return this._potencia;
    };

    set potencia(p) {
        this._potencia = p;
    };
};
class Melee extends Arma {
    constructor() {
        super('machete', parseInt((Math.random() * 5) + 1));
    };

}
class Distancia extends Arma {
    constructor(municion) {
        super('escopeta', parseInt((Math.random() * 5) + 1));
        this._municion = municion;

    };
}

function juego() {
    //FABRICA DE ZOMBIE
    var finJuego = false;
    do {
        var z;
        var tipo = parseInt(Math.random() * 3);
        switch (tipo) {
            case 0:
                z = new Terrestre('Brook', 4, 2, 1);
                break;
            case 1:
                z = new Acuatico('murlock', 1, 2, 1);
                break;
            case 2:
                z = new Abominacion('TWD', 6, 2, 1);
                break;
        }
        //FABRICA PERSONA
        var p = new Persona('Israel', 'Molina', 1, 'programador');
        var a;
        var tipo = parseInt(Math.random() * 2);
        switch (tipo) {
            case 0:
                a = new Melee();
                break;
            case 1:
                a = new Distancia(parseInt((Math.random() * 5) + 1));
                break;
        }
        var prob = parseInt((Math.random() * 100) + 1);
        if (prob < 75 && p._arma == null) { // se equipa si va desarmado en el 75 % de los casos
            p.equipar(a);
        }
        //vivir en el Apocalipsis siendo persona
        if (prob > 10) { // camina en el 90 % de los casos
            p.caminar();
            prob = parseInt((Math.random() * 100) + 1);
            if (prob < 50) { // encuentro entre persona y zombie.
                console.log(p._nombre + ' se encuentra con ' + z._nombre);
                do {
                    console.log(z.vidaZ);
                    if (z instanceof Abominacion) {
                        if (z.vidaZ > 0 && p.vidaP > 0) {
                            p.atacar(z);

                        }
                        if (z.vidaZ > 0 && p.vidaP > 0) {
                            z.atacar(p);
                        }
                    } else {
                        if (z.vidaZ > 0 && p.vidaP > 0) {
                            p.atacar(z);

                        }
                        if (z.vidaZ > 0 && p.vidaP > 0) {
                            z.atacar(p);
                        }
                    }
                } while (z.vidaZ > 0 && p.faccion == 'p')
                finJuego = true;

            }
        } else if (prob < 10) {
            p.descansa();
        }
        if (!finJuego) {
            //vivir en el Apocalipsis como zombie
            prob = parseInt((Math.random() * 100) + 1);
            if (prob < 50) { // camina
                z.caminar();
                prob = parseInt((Math.random() * 100) + 1);
                if (prob < 50) { // encuentro entre zombie y persona.
                    console.log(z._nombre + ' se encuentra con ' + p._nombre);
                    do {
                        console.log(z.vidaZ);
                        if (z instanceof Abominacion) {
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                z.atacar(p);

                            }
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                p.atacar(z);
                            }
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                z.atacar(p);

                            }
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                p.atacar(z);
                            }
                        } else {
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                z.atacar(p);

                            }
                            if (z.vidaZ > 0 && p.vidaP > 0) {
                                p.atacar(z);
                            }
                        }
                    } while (z.vidaZ > 0 && p.faccion == 'p')
                    finJuego = true;
                }
            } else if (prob < 50) { // encuentra comida
                z.comer();
            }
        }
    }
    while (finJuego == false);
    console.log('-------------------------GAME OVER-----------------------')
}