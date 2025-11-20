import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900">
          <div className="text-center text-white p-8">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">The component encountered an error.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white text-purple-900 rounded-lg hover:bg-gray-100"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
