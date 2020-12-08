/*
 * @Description: 单测demo
 * @Author: liwangjun
 * @Date: 2020-12-08 15:41:17
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 15:44:04
 * @FilePath: /vue-cli-template/tests/unit/App.spec.js
 */
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import App from '@/App.vue';
import Vue from 'vue'

describe('App.vue', () => {
  const localVue = createLocalVue()
  const wrapper = shallowMount(App, {
    localVue
  })

  it('判断是Vue实例', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a div', () => {
    expect(wrapper.contains('div')).toBe(true)
  })

  it('it has cycle', () => {
    expect(typeof App.name).toBe('string')
    expect(App.name).toBe('App')
  })
});
