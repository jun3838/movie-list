import { mount } from '@vue/test-utils'
import MovieItem from '../index.vue'

describe('should render movie item correctly', () => {
  test('without favourite', () => {
    const wrapper = mount(MovieItem, {
      props: {
        title: 'Avatar',
        year: 2000,
        imdbId: 'abc123',
        favourites: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('with favourite', () => {
    const wrapper = mount(MovieItem, {
      props: {
        title: 'Avatar',
        year: 2000,
        imdbId: 'abc123',
        favourites: [{
          title: 'Avatar',
          year: 2000,
          imdbId: 'abc123'
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('methods', () => {
  describe('getIconSymbol', () => {
    test('should return #heart', () => {
      const wrapper = mount(MovieItem, {
        props: {
          title: 'Avatar',
          year: 2000,
          imdbId: 'abc123',
          favourites: []
        }
      })

      const result = wrapper.vm.getIconSymbol('abc123')
      expect(result).toEqual('#heart')
    })

    test('should return #heart-fill', () => {
      const wrapper = mount(MovieItem, {
        props: {
          title: 'Avatar',
          year: 2000,
          imdbId: 'abc123',
          favourites: [{
            title: 'Avatar',
            year: 2000,
            imdbId: 'abc123'
          }]
        }
      })

      const result = wrapper.vm.getIconSymbol('abc123')
      expect(result).toEqual('#heart-fill')
    })
  })
})
