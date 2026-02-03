import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

describe('Delete functionality', () => {
  test('should call DELETE API when delete button is clicked', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await screen.findByText('Test Todo');

    // Find and click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    // Mock the DELETE request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 204,
      })
    );

    fireEvent.click(deleteButton);

    // Verify DELETE was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/todos/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});

describe('Stats calculation', () => {
  test('should display correct count of incomplete todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Incomplete 1', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Incomplete 2', completed: false, createdAt: new Date().toISOString() },
      { id: 3, title: 'Completed', completed: true, createdAt: new Date().toISOString() },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to appear
    const itemsLeftChip = await screen.findByText(/2 items left/i);
    expect(itemsLeftChip).toBeInTheDocument();
  });

  test('should display correct count of completed todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Incomplete', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Completed 1', completed: true, createdAt: new Date().toISOString() },
      { id: 3, title: 'Completed 2', completed: true, createdAt: new Date().toISOString() },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to appear
    const completedChip = await screen.findByText(/2 completed/i);
    expect(completedChip).toBeInTheDocument();
  });
});

describe('Empty state', () => {
  test('should display empty state message when no todos exist', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for empty state message to appear
    const emptyMessage = await screen.findByText(/no todos yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('should not display empty state when todos exist', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todo to appear
    await screen.findByText('Test Todo');

    // Empty message should not be present
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });
});

describe('Error handling', () => {
  test('should display error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    const errorMessage = await screen.findByText(/failed to load todos/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('should handle non-ok response status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      })
    );

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message (appears in both h6 and p tags)
    const errorMessages = await screen.findAllByText(/failed to load todos/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
