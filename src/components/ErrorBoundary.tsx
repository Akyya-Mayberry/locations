import * as React from 'react';
import './ErrorBoundary.css';

const initialState = { hasError: false, message: '' };

type State = Readonly<typeof initialState>;

class ErrorBoundary extends React.Component<object, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    /**
     * 
     * @param {Error} error - error from descendant component 
     * @param {ErrorInfo} info - info object on error
     */
    public componentDidCatch(error: Error, info: any) {
        let message;

        // Filter for Google Map errors 
        if (error.message.includes('google is not defined')
            || error.message.includes('google')) {
            message = 'Error loading Google Map';
        } else {
            message = 'Something went wrong';
        }

        this.setState({ hasError: true, message });
    }

    public render() {
        if (this.state.hasError) {
            return <p className='error-boundary'>{this.state.message}</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;