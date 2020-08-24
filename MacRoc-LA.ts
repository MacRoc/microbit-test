/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf1ec" block="MacRoc LA"
namespace LA {
    function serial_init():void{
        serial.redirect( SerialPin.P12, SerialPin.P8, BaudRate.BaudRate115200 );
    }
    
    //% block="速度 %value"
    export function speed(value: number = 0): void{ 
        do{
            serial.writeString( 's' + value + '#' );
        }while( serial.readUntil( '#' ) != 'success' );
    }

    //% block="转向 %value"
    export function turn(value: number = 0): void{ 
        do{
            serial.writeString( 't' + value + '#' );
        }while( serial.readUntil( '#' ) != 'success' );
    }
}
