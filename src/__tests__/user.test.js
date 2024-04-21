import React from 'react';
import { render, fireEvent, act } from 'react-dom/test-utils';
import UserList from './UserList';
import axios from 'axios';

jest.mock('axios');

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: { name: 'Engineering' } },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: { name: 'Marketing' } },
];

test('renders user list with pagination', async () => {
  axios.get.mockResolvedValue({ data: users });

  let container;
  await act(async () => {
    container = render(<UserList users={users} />);
  });

  expect(container.getByText('UserList')).toBeInTheDocument();

  users.forEach((user) => {
    expect(container.getByText(user.name)).toBeInTheDocument();
    expect(container.getByText(user.email)).toBeInTheDocument();
    expect(container.getByText(user.company.name)).toBeInTheDocument();
  });
});

test('deletes user on button click', async () => {
  axios.get.mockResolvedValue({ data: users });
  axios.delete.mockResolvedValueOnce();

  let container;
  await act(async () => {
    container = render(<UserList users={users} />);
  });

  const deleteButton = container.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(container.queryByText('John Doe')).not.toBeInTheDocument();
});

test('paginates user list', async () => {
  const largeUsersList = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    company: { name: 'Test' },
  }));

  axios.get.mockResolvedValue({ data: largeUsersList });

  let container;
  await act(async () => {
    container = render(<UserList users={largeUsersList} />);
  });

  expect(container.getByText('User 1')).toBeInTheDocument();
  expect(container.getByText('User 2')).toBeInTheDocument();
  expect(container.getByText('User 3')).toBeInTheDocument();
  expect(container.getByText('User 4')).toBeInTheDocument();
  expect(container.getByText('User 5')).toBeInTheDocument();

  const nextPageButton = container.getByText('2');
  fireEvent.click(nextPageButton);

  expect(container.getByText('User 6')).toBeInTheDocument();
  expect(container.getByText('User 7')).toBeInTheDocument();
  expect(container.getByText('User 8')).toBeInTheDocument();
  expect(container.getByText('User 9')).toBeInTheDocument();
  expect(container.getByText('User 10')).toBeInTheDocument();
});
