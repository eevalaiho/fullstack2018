import React from 'react'
import { shallow } from 'enzyme'
import Blog from './blog'

describe('<Blog />', () => {

  it('renders content', () => {
    const user = {
      username: 'someusername',
      name: 'Some Name',
      _id: 'SOMEID'
    }

    const blog = {
      title: 'Some title',
      author: 'Some Author',
      user: user,
      url: 'http://some.url.net',
      likes: 999
    }

    const blogComponent = shallow(<Blog blog={blog} user={user} />)

    const titleDivs = blogComponent.find('.wrapper').children()
    expect(titleDivs.length).toEqual(2)

    const onlyTitle = titleDivs.first()
    expect(onlyTitle.html()).toContain(blog.author)
    expect(onlyTitle.html()).toContain(blog.title)
    expect(onlyTitle.html()).not.toContain(blog.url)

    const titleAndContent = titleDivs.last()
    expect(titleAndContent.html()).toContain(blog.author)
    expect(titleAndContent.html()).toContain(blog.title)
    const titleAndContent_content = titleAndContent.find('.content')
    expect(titleAndContent_content.html()).toContain(blog.url)
    const titleAndContent_like = titleAndContent.find('.likes')
    expect(titleAndContent_like.text()).toContain(blog.likes)
  })

  it('initially only title row is visible', () => {
    const user = {
      username: 'someusername',
      name: 'Some Name',
      _id: 'SOMEID'
    }

    const blog = {
      title: 'Some title',
      author: 'Some Author',
      user: user,
      url: 'http://some.url.net',
      likes: 999
    }

    const blogComponent = shallow(<Blog blog={blog} user={user} />)
    //console.log(blogComponent.debug())

    const titleDivs = blogComponent.find('.wrapper').children()
    expect(titleDivs.length).toEqual(2)

    const onlyTitle = titleDivs.first()
    expect(onlyTitle.html()).not.toContain(blog.url)
    expect(onlyTitle.prop('style')).toHaveProperty('display', '');

    const titleAndContent = titleDivs.last()
    expect(titleAndContent.html()).toContain(blog.url)
    expect(titleAndContent.prop('style')).toHaveProperty('display', 'none');
  })

  it('displays content when title is clicked', () => {
    const user = {
      username: 'someusername',
      name: 'Some Name',
      _id: 'SOMEID'
    }

    const blog = {
      title: 'Some title',
      author: 'Some Author',
      user: user,
      url: 'http://some.url.net',
      likes: 998
    }

    const blogComponent = shallow(<Blog blog={blog} user={user} />)
    //console.log(blogComponent.debug())

    const onlyTitleButton = blogComponent.find('.wrapper').children().first().find('.button .title')
    //console.log(onlyTitleButton.debug())

    onlyTitleButton.simulate('click')

    const onlyTitle = blogComponent.find('.wrapper').children().first()
    expect(onlyTitle.prop('style')).toHaveProperty('display', 'none');

    const titleAndContent = blogComponent.find('.wrapper').children().last()
    expect(titleAndContent.prop('style')).toHaveProperty('display', '');
  })

  it('like button is clicked two times', () => {
    const user = {
      username: 'someusername',
      name: 'Some Name',
      _id: 'SOMEID'
    }

    const blog = {
      title: 'Some title',
      author: 'Some Author',
      user: user,
      url: 'http://some.url.net',
      likes: 998
    }

    const mockHandler = jest.fn()
    const mockFn = () => {
      mockHandler()
      return new Promise(() => {
        return {
          title: 'title value',
          author: 'author value',
          url: 'url value',
          _id: '_id value',
          likes: 999,
          user: {_id: 'id value', name: 'name value', username: 'username value'}
        }
      })
    }

    const blogComponent =
      shallow(<Blog blog={blog} user={user} onLikeClick={mockFn} onDeleteClick={null} />)

    const button = blogComponent.find('.button .like')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })

  it('delete button is clicked', () => {
    const user = {
      username: 'someusername',
      name: 'Some Name',
      _id: 'SOMEID'
    }

    const blog = {
      title: 'Some title',
      author: 'Some Author',
      user: user,
      url: 'http://some.url.net',
      likes: 998
    }

    const mockHandler = jest.fn()

    const blogComponent =
      shallow(<Blog blog={blog} user={user} onLikeClick={null} onDeleteClick={mockHandler} />)
    //console.log(blogComponent.debug())

    const button = blogComponent.find('.button .delete')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(1)
  })

})
