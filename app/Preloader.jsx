import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

export default function Preloader() {
    const [text, setText] = useState('BLix');

    useEffect(()=>{
        let interval = setInterval(()=>{
            if(text ===  'BLix'){
                setText('BLix.')
            }else if(text === 'BLix.'){
                setText('BLix..')
            }else if(text === 'BLix..'){
                setText('BLix...')
            }else{
                setText('BLix')
            }
        }, 500)

        return () => clearInterval(interval);
    }, [text])
    return (
      <View className='h-[100vh] w-[100%] items-center justify-center'>
        <Text className='font-bold text-[25px] text-[#FFAB10]'> {text} </Text>
      </View>
    )
}
