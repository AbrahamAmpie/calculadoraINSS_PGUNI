function FormatearNumero(numero) {
    var NumeroFormateado = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits : 2 }).format(numero);

    return 'C$ ' + NumeroFormateado;
}

function CalcularExceso(expectativaSalarioAnual) {
    if (expectativaSalarioAnual >= 0.01 && expectativaSalarioAnual <= 100000)
        return 0;
    if (expectativaSalarioAnual >= 100000.01 && expectativaSalarioAnual <= 200000)
        return 100000;
    if (expectativaSalarioAnual >= 200000.01 && expectativaSalarioAnual <= 350000)
        return 200000;
    if (expectativaSalarioAnual >= 350000.01 && expectativaSalarioAnual <= 500000)
        return 350000;
    if (expectativaSalarioAnual >= 500000.01)
        return 500000.00;
}

function CalcularPorcentaje(expectativaSalarioAnual, AnualSinExceso) {
    if (expectativaSalarioAnual >= 0.01 && expectativaSalarioAnual <= 100000)
        return AnualSinExceso * 0;
    if (expectativaSalarioAnual >= 100000.01 && expectativaSalarioAnual <= 200000)
        return AnualSinExceso * 0.15;
    if (expectativaSalarioAnual >= 200000.01 && expectativaSalarioAnual <= 350000)
        return AnualSinExceso * 0.2;
    if (expectativaSalarioAnual >= 350000.01 && expectativaSalarioAnual <= 500000)
        return AnualSinExceso * 0.25;
    if (expectativaSalarioAnual >= 500000.01)
        return AnualSinExceso * 0.3;
}

function CalcularImpuestoBase(expectativaSalarioAnual) {
    if (expectativaSalarioAnual >= 0.01 && expectativaSalarioAnual <= 100000)
        return 0;
    if (expectativaSalarioAnual >= 100000.01 && expectativaSalarioAnual <= 200000)
        return 0;
    if (expectativaSalarioAnual >= 200000.01 && expectativaSalarioAnual <= 350000)
        return 15000;
    if (expectativaSalarioAnual >= 350000.01 && expectativaSalarioAnual <= 500000)
        return 45000;
    if (expectativaSalarioAnual >= 500000.01)
        return 82500;
}

function Calcular() {
    var salarioMensual = $('#txtSalario').val();

    //Mostrar el valor de la renta
    $('#lblRentaMensual').text(FormatearNumero(salarioMensual));

    //Se Calcula el INSS laboral
    var inssLaboral = salarioMensual * 0.07;

    $('#lblINSSLaboral').text(FormatearNumero(inssLaboral))
    $('#lblBaseImponible').text(FormatearNumero(salarioMensual - inssLaboral));

    //Calculamos la expectativa anual
    var exSalarioAnual = (salarioMensual - inssLaboral) * 12;

    $('#lblExpectativaAnual').text(FormatearNumero(exSalarioAnual));

    //Obtenemos el exceso segun la expectativa anual
    var exceso = CalcularExceso(exSalarioAnual);

    $('#lblExceso').text(FormatearNumero(exceso));

    //Mostramos el valor anual sin exceso
    $('#lblAnualSinExceso').text(FormatearNumero(exSalarioAnual - exceso));

    //Calculamos el porcentaje
    var porcentaje = CalcularPorcentaje(exSalarioAnual, exSalarioAnual - exceso);

    $('#lblPorcentaje').text(FormatearNumero(porcentaje));

    //Calculamos el impuesto base
    var impuestoBase = CalcularImpuestoBase(exSalarioAnual);

    $('#lblImpuestoBase').text(FormatearNumero(impuestoBase));

    //Calculamos el IR Anual
    var irAnual = porcentaje + impuestoBase;
    $('#lblIRAnual').text(FormatearNumero(irAnual));

    //Calculamos el IR Mensual
    var irMensual = irAnual / 12;
    $('#lblIRMensual').text(FormatearNumero(irMensual));

    //Calculamos el IR Diario
    var irDiario = irMensual / 30;
    $('#lblIRDiario').text(FormatearNumero(irDiario));

    //Calcular el salario neto
    var salarioNeto = salarioMensual - inssLaboral - irMensual;
    $('#lblSalarioNeto').text(FormatearNumero(salarioNeto));
}

function Limpiar() {
    $('#txtSalario').val('');
    $('#lblRentaMensual').text('')
    $('#lblINSSLaboral').text('')
    $('#lblBaseImponible').text('')
    $('#lblExpectativaAnual').text('');
    $('#lblExceso').text('');
    $('#lblAnualSinExceso').text('');
    $('#lblPorcentaje').text('');
    $('#lblSalarioNeto').text('');
    $('#lblImpuestoBase').text('');
    $('#lblIRAnual').text('');
    $('#lblIRMensual').text('');
    $('#lblIRDiario').text('');
    $('#lblSalarioNeto').text('');
}

$('#btnCalcular').click((e) => {
    e.preventDefault();

    if ($('#txtSalario').val() == '') {
        alert('Favor ingresar un numero');
        Limpiar();
    } else {
        Calcular();
    }
});

$('#btnLimpiar').click((e) => {
    e.preventDefault();

    Limpiar();
});