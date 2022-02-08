import request from 'supertest'
import {app} from '../../app'

it('returns a 201 on successful signup ', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'Петров Павел',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('returns a 400 auth with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '213123',
            password: 'password'
        })
        .expect(400)
})

it('returns a 400 auth with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400)
})

it('returns a 400 auth with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(400)
    await request(app)
        .post('/api/users/signup')
        .send({
            password: '123123',
        })
        .expect(400)
})

it('disallows duplicate emails ', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            name: 'Петров Павел',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('sets a cookies after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            name: 'Петров Павел',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
}); 

it('returns a 201 on successful create admin', async () => {
    const firstResponse = await request(app)
        .post('/api/users/signup')
        .send({
            name: 'Петров Павел',
            email: 'test@test.com',
            password: 'password',
            admin: true
        })
        .expect(201)
    expect(firstResponse.body.groups).toBeDefined()
    expect(firstResponse.body.groups.indexOf('admin')).not.toEqual(-1)
    const secondResponse = await request(app)
        .post('/api/users/signup')
        .send({
            name: 'Петров Павел',
            email: 'test1@test.com',
            password: 'password',
            admin: true
        })
        .expect(201)
    expect(secondResponse.body.admin).not.toBeDefined()
    })