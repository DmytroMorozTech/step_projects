import React from 'react'
import Comments from './Comments';

describe('Testing comments component',()=>{

    let allUsers 
    let postcomment 
    beforeEach(()=>{
            allUsers = []
            postcomment = {}
    })

    test('comments props',()=>{


        const postcomment = {
            a:'1',
            b:'2'
        }
        const allUsers = [
            {a:'1'},
            {b:'2'}
        ]
        const component = <Comments comment={postcomment} allUsers={allUsers}/>
        expect(component).toMatchSnapshot()
        expect(allUsers).toEqual(expect.any(Array))
        expect(postcomment).toEqual(expect.any(Object))
    })
})
