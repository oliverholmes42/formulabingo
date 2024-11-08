export async function login(email, password) {
    try {
        const response = await fetch('https://bingo.redata.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // JSON body with email and password
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        // Parse the JSON response
        const data = await response.json();

        // Assuming the response contains an ID
        return data.id; // Return user ID
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
}
