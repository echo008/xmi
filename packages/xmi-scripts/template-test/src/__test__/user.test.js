import store from '../stores/user'

test('test user login api', async () => {
    const user = await store.postLogin({
        account: 'echo.zhang@wetax.com.cn',
        password: '123123',
        picture_code: '1234',
        unique_code: '123'
    })

    // expect(user).toHaveProperty('code', 0)
    // expect(user).toEqual(
    //     expect.objectContaining({
    //         code: expect.any(Number),
    //         data: expect.objectContaining({
    //             token: expect.any(String)
    //         }),
    //         message: expect.any(String)
    //     })
    // )
    expect(user).toMatchObject({
        code: 0,
        data: {
            user: expect.any(Object),
            group: expect.any(Object),
            token: expect.any(String)
        },
        message: 'OK'
    })
})
