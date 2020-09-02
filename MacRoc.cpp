
#include "pxt.h"
namespace MacRoc{
    void rgb( unsigned char ** value ){
        unsigned char temp[48];
        int index_i, index_j, index;
        if( !rgb_initialized ){
            rgb_init()
        }
        for( index_i = 0; index_i < 2; index_i ++ ){
            for( index_j = 0; index_j < 24; index_j ++ ){
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
}
