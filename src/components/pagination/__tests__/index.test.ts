import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Pagination from '../index.vue'

describe('should render pagination correctly', () => {
  test('with less than maxVisibleButton', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 4,
        currentPage: 1
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('with more than maxVisibleButton', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('computed', () => {
  test('startPage', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.vm.startPage).toEqual(1)
    wrapper.setProps({ currentPage: 5})
    await nextTick()
    expect(wrapper.vm.startPage).toEqual(3)
  })
  test('endPage', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.vm.endPage).toEqual(5)
    wrapper.setProps({ currentPage: 3})
    await nextTick()
    expect(wrapper.vm.endPage).toEqual(5)
  })
  test('pages', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.vm.pages).toEqual([1, 2, 3, 4, 5])
    wrapper.setProps({ currentPage: 8})
    await nextTick()
    expect(wrapper.vm.pages).toEqual([6, 7, 8, 9, 10])
  })
  test('isFirstPage', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.vm.isFirstPage).toBeTruthy()
    wrapper.setProps({ currentPage: 2})
    await nextTick()
    expect(wrapper.vm.isFirstPage).toBeFalsy()
  })
  test('isLastPage', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    expect(wrapper.vm.isLastPage).toBeFalsy()
    wrapper.setProps({ currentPage: 10})
    await nextTick()
    expect(wrapper.vm.isLastPage).toBeTruthy()
  })
})

describe('emit', () => {
  test('should emit "next"', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    wrapper.find('.next').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('next')
  })
  test('should emit "prev"', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 3
      }
    })

    wrapper.find('.prev').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('prev')
  })
  test('should emit "goto"', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    wrapper.findAll('.page')[2].trigger('click')
    expect(wrapper.emitted().goto[0]).toEqual([3])

    wrapper.find('.first').trigger('click')
    expect(wrapper.emitted().goto[1]).toEqual([1])

    wrapper.find('.last').trigger('click')
    expect(wrapper.emitted().goto[2]).toEqual([10])
  })
})
