import * as React from 'react';

const initialState = { hasError: false };

type State = Readonly<typeof initialState>;
 
class ErrorBoundary extends React.Component<object, State> {
    constructor(props: any) {
      super(props);
      this.state = initialState;
    }
  
    public componentDidCatch(error: any, info: any) {
      this.setState({ hasError: true });
      console.log(`Error caught: ${error}, Error info: ${info}`);
    }
  
    public render() {
      if (this.state.hasError) {
        return <p className='error-boundary'>Something went wrong.</p>;
      }
      return this.props.children;
    }
}

export default ErrorBoundary;