const handleCatchError = (error: unknown) => {
    // some code that handles the error
    if (typeof error === 'string') {
        // handle string error
        throw new Error(error);
    } else if (error instanceof Error) {
        // handle Error object
        throw error;
    } else {
        // handle other types of errors
        throw new Error('An error occurred');
    }
};

export default handleCatchError;
