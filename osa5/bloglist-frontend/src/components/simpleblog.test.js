import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './simpleblog'

describe('<SimpleBlog />', () => {

  it('renders content', () => {

    const blog = {
      title: 'Some title',
      author: 'Some Author'
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={null} />)

    const titleDiv = blogComponent.find('.title')
    expect(titleDiv.html()).toContain(blog.title)
    expect(titleDiv.html()).toContain(blog.author)

    const likeDiv = blogComponent.find('.like')
    expect(likeDiv.html()).toContain('likes')
  })

  it('clicking the button calls event handler once', () => {
    const blog = {
      title: 'Some title',
      author: 'Some Author'
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(1)
  })
})