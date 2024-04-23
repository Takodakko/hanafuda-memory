import { mount } from '@vue/test-utils'
import Card from './Card.vue'
import { test, expect } from '@jest/globals';

test('renders a todo', () => {
  const wrapper = mount(Card)

  const todo = wrapper.get('[data-test="card"]')

  expect(todo.classes()).toBe([]);
})