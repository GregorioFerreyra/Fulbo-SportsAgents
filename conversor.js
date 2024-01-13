
document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('recuadro-form3').addEventListener('submit', function (event) {
        event.preventDefault(); 

        
        let monto = document.getElementById('monto').value;
        let opcion = document.getElementById('moneda').value;

        
        let tasaDolar = 0.001; 
        let tasaEuro = 0.0008; 

        
        let resultado;
        if (opcion == 'Dólar') {
            resultado = monto * tasaDolar;
        } else if (opcion == 'Euro') {
            resultado = monto * tasaEuro;
        }

        
        Swal.fire({
            title: 'Resultado de la conversión:',
            text: resultado.toFixed(2) + ' ' + opcion,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
});