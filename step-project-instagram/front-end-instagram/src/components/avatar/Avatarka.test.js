
import React from 'react'
import Avatarka from './Avatarka';



describe('Avatarka testing url',()=>{
    let avatarUrl
    beforeEach(()=>{
        avatarUrl ={
            avatarUrl:''
        } 
    })
    test('component with avatar url',()=>{
            const avatarUrl ={
                avatarUrl:'instagram/avatars/user_6_avatar_jbtint'
            } 
            const component = <Avatarka avatarUrl={avatarUrl}/>
            expect(component).toMatchSnapshot()
            expect(avatarUrl).toBeDefined()
    })
})
