import Mock from 'mockjs'

Mock
    // 模拟用户登录
    .mock(/mock\/user\/login/, ({ body }) => {
        const { account } = JSON.parse(body)
        if (account === 'echo.zhang@wetax.com.cn') {
            return Mock.mock({
                code: 0,
                data: {
                    user: {
                        audit_result: '审核通过',
                        email: 'echo.zhang@wetax.com.cn',
                        mobile: '15012851811',
                        nickname: '',
                        status: 1,
                        type: 7,
                        user_id: 6992,
                        username: 'client_group_453db8cd90a82c3'
                    },
                    group: {
                        group_name: '高灯'
                    },
                    token: 'blochsB_cUtAcPETplSe1Gz5NwgufAQhJv9N'
                },
                message: 'OK'
            })
        }
        return Mock.mock({
            code: 1,
            data: null,
            message: '该账号无效'
        })
    })
    // 模拟用户注册
    .mock(/mock\/user\/register/, Mock.mock({
        code: 0,
        data: {
            user: {}
        },
        message: 'OK'
    }))
    // 模拟生成图片验证码
    .mock(/mock\/user\/picture-code/, Mock.mock({
        code: 0,
        data: {
            picture: 'iVBORw0KGgoAAAANSUhEUgAAAD8AAAAZCAIAAAAJyGGjAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFA0lEQVRYhc2We1BUVRzHf3f3suzyXAF5P4RAcgSWBRwGBsaJJiRJxhCRKCmzcBigmIoYCJEcaAJ8kAtjOpCEDWNWjgUqMwhOwwYxYLBAkrxJkpfIc2F32XvpjyPL5e6yXBDL71/n/O7vnPP5nvs791xMP5oNSxJlCRLTJcBAVRn5r5xMYpL5TMWi9UVZAibD/l/0mJoLqLGC/rXQJGBs4NkpKVpXe0Jp0DHUwEZ3lNKeVdzIhyUnAOAoPLLZeJsmDNV9knlA/qhYFaUegL7mS6jxHNrAqKeWKlQ/G/MQG1B2URy9XhScxVOS80wy97ELyokE0EIPagZgyYMWA9oJMGAbcq0wDJuaf6AKsjBcj7PVwTTAgGvR0FugnTu8KeSaT+XyhFroaQb8ai/XBx7eKAHm7fDuTpuDsoVJ+cI0QSqq7qXJldMAsN1ir69TvC5udH+4orYrRzs9fVLt9Cs9tG6YYPf2NJzN/b2nQKoYBQAX8xATA2eqzxctw6z4wjt/fb4aQ9Gpo+99UkwL0r/3GoX2PuWNvJd9BT81xVxtjPq5Jfb+cIWnfQxK6By5ebk+VNyVh7O51IEzN0QAYGHkztXhV3dkIHQAeCztGZvpoGbKldNsFkfj6oUFrwKAOjpTegDIyiVbWkk7j+IvM6zQq2BCYBiaCAA7rPa3DpZR4+PSrt6xamqEIBU4S/djd0NxbTNt6fiEW6tRMaVHBInpEvQeRFmCzFQ9jQTqY6353sNTbQCgxzHj8xxYGK6ec04QibO4p9tmAgKFDJGe0Huk7EKdk4qPVsuz5ntn3/ECgBN2E8ezJz88/mdiukSUJaBezAuEDGdxaQM5bIPFRcJE3yncq+SA97fBbjlv+1e620SpEiKb+wAgtqlotcpRV3PCOdTAAaA1pxF1MjhnNGYjguTA2nDXkl7dumDLHH2OWVN/UWL6FaD8WcxN2tfdphPocUwxDAtwSf6t+/TIdBsAGHFt93qcnZjrG5xoAICrQkcAUJIy2pnRImHBBwBQZ9tDf4k1IxeDLGLXRaC6EEz0pYdfelMU8cSMKs7VMfmlJb4KK/GDPQAwLRts6C3caX0A0SMRpJy297utKn8dCtHiwX/wBXrdq6OrCKo7TiB0KgE1hyDlQyME9WwM/uiVmWLJ48m/cdX1k+1RZU7ODRjxbFeOVdCqTjs6koYDpC6p4tECIZ2VD1GD2gmQgcQIgEw4tGvqwT5HUaQxALRf+cItKm1+2v5hB4YyDcM/m7mWrSQVzCtHVauM6BcIqY2ejoGuxax8RBVkszhKYv77rrxDLskoshpB58jN7u+cUg8KI06dAQiFdBDYuXNx8RJEhdItoHEmnPcHPzM2iWfUr8fv04hR6Tse0mAKlJpkdNdW1txLfSeXhbHvDixfGQK7t7i4cUNfIepydbY4bQ0KdEl+vVMcM1syOtO+7BPjhHme99/mkXf7CADYbPFxNg8ub4mTKacQQ4z/LSUhU5IyglQolNJySdyaSOugB4B6p0u5xuTAuHhwonEDBDiLJ7CLtub7sFn40JSk5e9S9IvxlGJKz5Bg2BWzvL/IZLZ+ydFtAg2X/7q0xl2b3BEKAOSYJwAoyfm7A8Xlkrjrze839BZo3DwV+lAYvyzoa9rTT3+Qq9rnH0bBU2sde/8cSsM3Z3+3CWpcd368Wcs8ujBvdoy3WbOp9N/t/eg/buY27WvnMZbwK/6/MdpHATUajSAAAAAASUVORK5CYII=',
            unique_code: 'picture_1543903536029154390353602987'
        },
        message: 'OK'
    }))
    // 模拟发送手机短信
    .mock(/mock\/user\/mobile-code/, Mock.mock({
        code: 0,
        data: 'OK',
        message: 'OK'
    }))
