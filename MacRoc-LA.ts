/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf1ec" block="MacRoc LA"
namespace LA {
    let rgb_initialized = false;
    let serial_initialized = false;

    function serial_init():void{
        serial.redirect( SerialPin.P12, SerialPin.P8, BaudRate.BaudRate9600 );
        serial_initialized = true;
    }

    function rgb_init():void{
        pins.spiPins( DigitalPin.P15, DigitalPin.P14, DigitalPin.P13 );
        pins.spiFrequency( 2500000 );
        pins.spiFormat( 8, 1 );
        rgb_initialized = true;
    }
    
    //% block="速度 %speed %turn"
    //% value.min = -100 value.max = 100
    export function speed(value: number = 0): void{ 
        if( !serial_initialized ){
            serial_init();
        }
        serial.writeString( 's' + value + '#' );
    }

    //% block="转向 %value"
    //% value.min = -100 value.max = 100
    export function turn(value: number = 0): void{ 
        if( !serial_initialized ){
            serial_init();
        }
        serial.writeString( 't' + value + '#' );
    }

    //% block="彩灯 %value"
    //
    /*export function rgb( value: number[][] = [ Array( 0, 0, 0 ), Array( 0, 0, 0 ) ] ): void{
        let temp:number[] = [0,0];
        if( !initialized ){
            rgb_init()
        }
        for( let index_i = 0; index_i < value.length; index_i ++ ){
            for( let index_j = 0; index_j < 24; index_j ++ ){
                if( value[index_i][ index_j / 8 ] && 1 << ( index_j % 8 ) ){
                    temp[ index_i ] |= 6 << index_j * 3;
                }
                else{
                    temp[ index_i ] |= 4 << index_j * 3;
                }
            }
        }
        for( let index_i = 0; index_i < value.length; index_i ++ ){
            for( let index_j = 0; index_j < 9; index_j ++ ){
                pins.spiWrite( temp[index_i] >> ( index_j * 8 ) )
            }
        }
    }*/
    export function rgb( value: number[][] = [ Array( 0, 0, 0 ), Array( 0, 0, 0 ) ] ): void{
        let turn:number = 6;
        let temp:number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        if( !rgb_initialized ){
            rgb_init()            
        }
        for( let index_i = 0; index_i < value.length; index_i ++ ){
            for( let index = 0, len = 24; index < len; index ++ ){
                if( value[index_i][ index / 8 ] && 1 << ( index % 8 ) ){
                    turn = 6;
                }
                else{
                    turn = 4;
                }
                if( index % 8 == 0   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3  ] |= turn << 0;
                }
                else if( index % 8 == 1   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3  ] |= turn << 3;
                }
                else if( index % 8 == 2   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3  ] |= ( turn << 6 & 3  );
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 1   ] |= turn >> 2;
                }
                else if( index % 8 == 3   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 1  ] |= turn << 1;
                }
                else if( index % 8 == 4   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 1  ] |= turn << 4;
                }
                else if( index % 8 == 5   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 1  ] |= ( turn << 7 & 1  );
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 2  ] |= turn >> 1;
                }
                else if( index % 8 == 6   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 2  ] |= turn << 2;
                }
                else if( index % 8 == 7   ){
                    temp[ index_i * 9 + ( index / 8  ) * 3 + 2  ] |= turn << 5;
                }
            }
        }
        pins.spiWrite( 0 );
        for( let index = 0; index < temp.length; index ++ ){
            pins.spiWrite( temp[index] )
        }
    }
}
