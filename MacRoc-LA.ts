/**
 * Provides access to basic micro:bit functionality.
 */
const COLOR_ARRAY:number[][]=[[0,255,0],[255,0,0],[0,0,255],[255,255,0],[20,220,60],[128,255,64],[0,128,128],[255,255,255],[0,0,0]];
enum COLOR {
    红色 = 0,
    绿色 = 1,
    蓝色 = 2,
    黄色 = 3,
    粉色 = 4,
    橙色 = 5,
    紫色 = 6,
    白色 = 7,
    黑色 = 8,
}
//% color=#FD7013 weight=20 icon="\uf1b9" block="MacRoc LA"
namespace LA {
    let serial_initialized = false;
    let rgb_initialized = false;

    function serial_init( ):void{
        serial.redirect( SerialPin.P12, SerialPin.P8, BaudRate.BaudRate9600 );
        serial_initialized = true;
    }

    function rgb_init():void{
        pins.spiPins( DigitalPin.P15, DigitalPin.P14, DigitalPin.P13 );
        pins.spiFrequency( 9000000 );
        pins.spiFormat( 8, 1 );
        rgb_initialized = true;
    }
    
    //% block="平衡车 速度 %speed|转向 %turn"
    //% speed.min = -100 speed.max = 100 turn.min = -200 turn.max = 200
    export function car( speed:number, turn:number ):void{ 
        if( !serial_initialized ){
            serial_init();
        }
        serial.writeString( 'y:' + speed + ' x:' + turn + '#' );
    }

    //% block="氛围灯 左侧 %left_color|右侧 %right_color"
    export function rgb_enum( left_color:COLOR, right_color:COLOR ):void{
        let value:number[][] = [ [0,0,0],[0,0,0] ];
        value[0] = COLOR_ARRAY[left_color];
        value[1] = COLOR_ARRAY[right_color];
        rgb( value );
    }

    //% block="彩灯 %value"
    export function rgb( value: number[][] = [ Array( 0, 0, 0 ), Array( 0, 0, 0 ) ] ): void{
        let temp:number[] = [0];
        let index_i, index_j, index;
        if( !rgb_initialized ){
            rgb_init()
        }
        for( index_i = 0; index_i < 2; index_i ++ ){
            for( index_j = 0; index_j < 24; index_j ++ ){
                //serial.writeString( ( 1 << ( index_j % 8 ) ).toString() );
                if( value[index_i][ index_j / 8 ] && 1 << ( index_j % 8 ) ){
                    temp[ index_i * 24 + index_j ] = 248;
                }
                else{
                    temp[ index_i *24 + index_j ] = 224;
                }
            }
        }
        for( index = 0; index < 100; index ++ ){
            pins.spiWrite( 0 );
        }
        for( index = 0; index < temp.length; index ++ ){
            pins.spiWrite( temp[index] );
        }
    }
    /*export function rgb( value: number[][] = [ Array( 0, 0, 0 ), Array( 0, 0, 0 ) ] ): void{
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
        for( let index = 0; index < 10; index ++ ){
            pins.spiWrite( 0 );
        }
        for( let index = 0; index < temp.length; index ++ ){
            pins.spiWrite( temp[index] )
        }
    }*/
}
