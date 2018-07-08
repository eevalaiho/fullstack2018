import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import loginService from "./services/login";

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders login form if user has not logged in', () => {
      app.update()
      expect(app.find(LoginForm)).toHaveLength(1)
      expect(app.find(Blog)).toHaveLength(0)
    })
  })


  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'teppo',
        password: 'testaaja',
      }
      localStorage.setItem('current_user', JSON.stringify(user))
      app = mount(<App/>)
    })

    it('renders all blogs when user has logged in', () => {
      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
